package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.BuildingData;
import de.smbonline.searchindexer.graphql.queries.fragment.CollectionData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;

public class ExhibitionSpaceNormalizer implements Normalizer<String> {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExhibitionSpaceNormalizer.class);

    // e.g. "R 2.04" or "Raum 2/38" or "R2-01.1"
    private static final Pattern LEVEL_ROOM_PATTERN = Pattern.compile("^.*?(?:R|Raum) *(?<level>\\d+)[.-/ ](?<room>\\d+).*$");
    // e.g. "1.OG" or "2. AG" or "EG"
    private static final Pattern LEVEL_ABBREVIATION_PATTERN = Pattern.compile("^(?:(?<level>\\d+)[. ]*)?(?<abbrev>[A-Z]+G)$");
    // e.g. "Treppe-AG_1-2", "Treppe-AG_3"
    private static final Pattern STAIRS_PATTERN = Pattern.compile("^.*Treppe-(?<abbrev>[A-Z]+G)_(?<levels>\\d+(?:-\\d+)?)$");
    // e.g. "R 04" or "Raum 038" or "R2"
    private static final Pattern ROOM_PATTERN = Pattern.compile("^.*?(?:R|Raum) *(?<room>\\d+).*$");
    // e.g. "AG_2.04" or "OG_327" or "GG_Bodemuseum_225"
    private static final Pattern ROOM_LEVEL_PATTERN = Pattern.compile("^[A-Z]+[ _\\-](?:[A-Za-z]+_)?(?:(?<level>\\d+)\\.)?(?<room>\\d+)$");

    private final String separator;
    private final ObjectProvider<? extends MappingSupplier> graphQl;

    public ExhibitionSpaceNormalizer(final ObjectProvider<? extends MappingSupplier> graphQl, final String separator) {
        this.graphQl = graphQl;
        this.separator = separator;
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjCurrentLocationVrt",
                "ObjCurrentLocationVoc",
                "ObjCurrentLocationGrpVrt",
                "ObjNormalLocationVrt",
                "ObjNormalLocationVoc"
        };
    }

    @Override
    public String getAttributeKey() {
        return EXHIBITION_SPACE_ATTRIBUTE;
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source, final String language) {
        // TODO replace with hierarchical source.location
        String exhibitionSpace = source.getExhibitionSpace();
        if (!StringUtils.contains(exhibitionSpace, this.separator)) {
            return null;
        }
        return createAttributeValue(exhibitionSpace, language);
    }

    protected @Nullable String createAttributeValue(final String sourceValue, final String language) {
        // TODO use language

        String[] parts = StringUtils.splitByWholeSeparatorPreserveAllTokens(sourceValue, this.separator, 6);

        String collectionKey = parts.length > 0 ? StringUtils.defaultIfEmpty(toCollectionKey(parts[0].trim()), null) : null;
        String buildingKey = parts.length > 1 ? StringUtils.defaultIfEmpty(toBuildingKey(parts[1].trim()), null) : null;
        String sector = parts.length > 2 ? StringUtils.defaultIfEmpty(parts[2].trim(), null) : null;
        String level = parts.length > 3 ? StringUtils.defaultIfEmpty(parts[3].trim(), null) : null;
        String room = parts.length > 4 ? StringUtils.defaultIfEmpty(parts[4].trim(), null) : null;
        String appendix = parts.length > 5 ? StringUtils.defaultIfEmpty(parts[5].trim(), null) : null;

        // FIXME hacked-in for prod
        if("EM".equals(collectionKey) && "HUF".equals(buildingKey) && StringUtils.startsWith(room, "E")) {
            if (!roomMapping().containsKey(room)) {
                return null;
            }
        }

        LOGGER.debug("Extracted building:'{}', sector:'{}', level:'{}', room:'{}', appendix:'{}' from '{}'", buildingKey, sector, level, room, appendix, sourceValue);

        String building = normalizeBuilding(buildingKey);
        sector = normalizeSector(collectionKey, sector);

        // Special case: "Treppenhaus" becomes the room and the level info is determined from the "Treppe" room
        if ("Treppenhaus".equals(level) && room != null && room.startsWith("Treppe")) {
            level = stairsToLevel(room);
            room = roomMapping().getOrDefault("Treppenhaus", "Treppenhaus");
        } else {
            level = normalizeLevel(collectionKey, buildingKey, level, room);
            room = normalizeRoom(buildingKey, level, room);
        }

        LOGGER.debug("Normalized building:'{}', sector:'{}', level:'{}', room:'{}'", building, sector, level, room);

        return Stream.of(building, sector, level, room)
                .filter(StringUtils::isNotBlank)
                .collect(Collectors.joining(", "));
    }

    private String normalizeBuilding(final @Nullable String buildingKey) {
        if (buildingKey == null) {
            return StringUtils.EMPTY;
        }
        // special case for "NNG" - no need to show the building...it's obvious
        if ("NNG".equals(buildingKey)) {
            return StringUtils.EMPTY;
        }
        return buildingMapping().getOrDefault(buildingKey, buildingKey);
    }

    private String normalizeSector(final @Nullable String collectionKey, final @Nullable String sector) {
        if (sector == null) {
            return StringUtils.EMPTY;
        }
        if ("Ausstellung".equals(sector)) {
            return StringUtils.EMPTY;
        }
        if ("NG".equals(collectionKey)) {
            if (sector.startsWith("FWK")) {
                return buildingMapping().getOrDefault(sector, "Friedrichswerdersche Kirche") + ", Dauerausstellung";
            }
            if (sector.startsWith("NNG")) {
                return "in der Ausstellung";
            }
        }
        return sectorMapping().getOrDefault(sector, sector);
    }

    private String normalizeLevel(final String collectionKey, final String buildingKey, final @Nullable String level, final @Nullable String room) {

        // check our two default cases first
        if (levelMapping().containsKey(level)) {
            return levelMapping().get(level);
        } else if (level != null) {
            return normalizeLevel(buildingKey, level);
        }

        // try to extract from collection
        String levelGuess = tryGuessLevelFromCollectionInBuilding(buildingKey, collectionKey);
        if (levelGuess != null) {
            return levelGuess;
        }

        // try to extract info from room
        if (room != null) {
            levelGuess = tryGuessLevelFromRoomInBuilding(buildingKey, room);
            if (levelGuess != null) {
                return levelGuess;
            }
        }

        // no clue, just leave it
        LOGGER.warn("Unable to normalize level info from extracted room '{}'", room);
        return StringUtils.EMPTY;
    }

    private String normalizeLevel(final String buildingKey, final String level) {

        // remove potential building key, e.g. "AM Hauptgeschoss" -> "Hauptgeschoss"
        String result = level.startsWith(buildingKey)
                ? StringUtils.stripStart(level.substring(buildingKey.length()), " -_") : level;

        // check if we have a common abbreviation
        Matcher abbrevMatcher = LEVEL_ABBREVIATION_PATTERN.matcher(result);
        if (abbrevMatcher.matches()) {
            String number = abbrevMatcher.group("level"); // optional, maybe null for EG
            String abbrev = abbrevMatcher.group("abbrev");
            String prefix = (number == null || "MIM".equals(buildingKey)) ? "" : number + ". ";
            result = prefix + levelMapping().getOrDefault(abbrev, abbrev);
        }

        // check if we have a numeric value
        if (StringUtils.isNumeric(result)) {
            if ("0".equals(result)) {
                result = levelMapping().getOrDefault("EG", "Erdgeschoss");
            } else {
                result = result + ". " + levelMapping().getOrDefault("OG", "Obergeschoss");
            }
        }
        return result;
    }

    private static String stairsToLevel(final String stairsInfo) {
        Matcher stairsMatcher = STAIRS_PATTERN.matcher(stairsInfo);
        if (stairsMatcher.matches()) {
            String abbrev = stairsMatcher.group("abbrev");
            String levels = stairsMatcher.group("levels");
            String level = levelMapping().getOrDefault(abbrev, abbrev);
            Integer[] numbers = Arrays.stream(levels.split("-")).map(Integer::parseInt).toArray(Integer[]::new);
            if (numbers.length == 1) {
                level = numbers[0] + ". " + level;
            } else if (numbers[1] == numbers[0] + 1) {
                level = numbers[0] + ". und " + numbers[1] + ". " + level;
            } else {
                level = numbers[0] + ". bis " + numbers[1] + ". " + level;
            }
            return level;
        }
        return StringUtils.EMPTY;
    }

    private @Nullable String tryGuessLevelFromCollectionInBuilding(final String buildingKey, final String collectionKey) {
        // special case, we don't have level info for MEK - everything is located on ground floor
        if ("MEK".equals(buildingKey)) {
            return levelMapping().getOrDefault("EG", "Erdgeschoss");
        }
        // special cases for HUF
        if ("HUF".equals(buildingKey)) {
            // special case for EM: it's located on second floor in HUF
            if ("EM".equals(collectionKey)) {
                return "2. " + levelMapping().getOrDefault("OG", "Obergeschoss");
            }
            // special case for AKu: it's located on third floor in HUF
            if ("AKu".equals(collectionKey)) {
                return "3. " + levelMapping().getOrDefault("OG", "Obergeschoss");
            }
        }
        // special cases for PMU
        if ("PMU".equals(buildingKey)) {
            // special cases for ANT and VAM: these are located on first floor in PMU
            if ("ANT".equals(collectionKey) || "VAM".equals(collectionKey)) {
                return "Ebene 1, " + toCollectionTitle(collectionKey);
            }
            // special case for ISL: it's located on second floor in PMU
            if ("ISL".equals(collectionKey)) {
                return "Ebene 2, " + toCollectionTitle(collectionKey);
            }
        }
        // no clue
        return null;
    }

    private @Nullable String tryGuessLevelFromRoomInBuilding(final String buildingKey, final String room) {
        // special case: room "O1.189.01.K1" in HUF should be displayed as 2.OG
        if ("HUF".equals(buildingKey) && "O1.189.01.K1".equals(room)) {
            return "2. " + levelMapping().getOrDefault("OG", "Obergeschoss");
        }
        // special case, we don't have level info for KGM
        if ("KGM".equals(buildingKey)) {
            if (room.indexOf(' ') < 0) {
                return levelMapping().getOrDefault("ZG", "Zentralgeschoss");
            }
            String romanRoomNumber = room.split(" ")[1];
            switch (romanRoomNumber) {
                case "I", "II", "III", "VIII" -> {
                    return levelMapping().getOrDefault("EG", "Erdgeschoss");
                }
                case "IV", "V", "VI", "VII" -> {
                    return levelMapping().getOrDefault("OG", "Obergeschoss");
                }
                case "IX", "X", "XI" -> {
                    return levelMapping().getOrDefault("UG", "Untergeschoss");
                }
            }
        }
        // regular case: extract level from room
        Matcher levelRoomMatcher = LEVEL_ROOM_PATTERN.matcher(room);
        if (levelRoomMatcher.matches()) {
            return "Ebene " + levelRoomMatcher.group("level");
        }
        // Uhm... this is a bad guess, but we assume there are only 99 rooms on one level.
        // So if the room number is 100+, we expect the first digit(s) represent the level.
        String rawRoom = extractNumberFromEnd(room);
        if (rawRoom.length() > 2) {
            return "Ebene " + rawRoom.substring(0, rawRoom.length() - 2);
        }
        // no clue
        return null;
    }

    private String normalizeRoom(final @Nullable String buildingKey, @Nullable String level, final @Nullable String room) {
        if (room == null) {
            return StringUtils.EMPTY;
        } else if (roomMapping().containsKey(room)) {
            return roomMapping().get(room);
        }

        Matcher levelRoomMatcher = LEVEL_ROOM_PATTERN.matcher(room);
        if (levelRoomMatcher.matches()) {
            String rawLevel = levelRoomMatcher.group("level");
            String rawRoom = levelRoomMatcher.group("room");
            return formatRoom(rawLevel, rawRoom);
        }
        Matcher roomLevelMatcher = ROOM_LEVEL_PATTERN.matcher(room);
        if (roomLevelMatcher.matches()) {
            // use plain room numbers without leading level or zeros in PMU and AM
            String prependLevel = "PMU".equals(buildingKey) || "AM".equals(buildingKey)
                    ? StringUtils.EMPTY : extractNumberFromStart(StringUtils.defaultString(roomLevelMatcher.group("level"), level));
            String rawRoom = roomLevelMatcher.group("room");
            return formatRoom(prependLevel, rawRoom);
        }
        Matcher roomMatcher = ROOM_PATTERN.matcher(room);
        if (roomMatcher.matches()) {
            // use plain room numbers without leading level or zeros in PMU and AM
            String prependLevel = "PMU".equals(buildingKey) || "AM".equals(buildingKey) ? StringUtils.EMPTY : extractNumberFromStart(level);
            String roomNumber = roomMatcher.group("room");
            return formatRoom(prependLevel, roomNumber);
        }
        LOGGER.warn("Unable to normalize room info from extracted value '{}'", room);
        return room;
    }

    private static String formatRoom(final String levelNo, final String roomNo) {
        String prependLevel = levelNo;
        String roomNumber = roomNo;
        // Uhm... this is a bad guess, but we assume there are only 99 rooms on one level.
        // So if the room number has 3 digits, we expect the first digit representing the level.
        if (roomNo.length() > 2 && !levelNo.isEmpty() && roomNo.indexOf(levelNo) == 0) {
            // roomNumber contains the level already - we don't want to prepend it again
            prependLevel = StringUtils.EMPTY;
        } else if (roomNo.length() == 1 && !levelNo.isEmpty()) {
            // edge case: level is set and room has only one digit - we want to end up with "Raum 201" rather than "Raum 21"
            roomNumber = "0" + roomNo;
        } else if (levelNo.isEmpty()) {
            // edge case: if we don't have level info - we want to show "Raum 3" rather than "Raum 003"
            // *but* we have to make sure, if the room number is actually "0", we need to keep it
            roomNumber = StringUtils.defaultIfEmpty(StringUtils.stripStart(roomNo, "0"), "0");
        }
        // prepend the level to the roomNumber info
        return "Raum " + prependLevel + roomNumber;
    }

    private static String extractNumberFromEnd(final String string) {
        // reverse the string to check the digits at the end
        char[] reverse = StringUtils.reverse(string).toCharArray();
        StringBuilder digits = new StringBuilder();
        for (int i = 0; i < reverse.length && Character.isDigit(reverse[i]); i++) {
            // re-reverse the digits to end up with correct order
            digits.insert(0, reverse[i]);
        }
        return digits.toString();
    }

    private static String extractNumberFromStart(final String string) {
        int indexOfFirstDigit = indexOfFirstDigit(string);
        if (indexOfFirstDigit == -1) {
            return StringUtils.EMPTY;
        }
        char[] rest = StringUtils.substring(string, indexOfFirstDigit).toCharArray();
        StringBuilder digits = new StringBuilder();
        for (int i = 0; i < rest.length && Character.isDigit(rest[i]); i++) {
            digits.append(rest[i]);
        }
        return digits.toString();
    }

    private static int indexOfFirstDigit(final String string) {
        char[] chars = string.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            if (Character.isDigit(chars[i])) {
                return i;
            }
        }
        return -1;
    }

    private Map<String, String> buildingMapping() {
        return this.graphQl.getObject().buildingMapping();
    }

    private String toBuildingKey(final String keyOrLabel) {
        BuildingData building = this.graphQl.getObject().fetchBuilding(keyOrLabel);
        return building == null ? keyOrLabel : building.getKey();
    }

    private String toCollectionKey(final String keyOrTitle) {
        return getCollectionAttribute(keyOrTitle, CollectionData::getKey);
    }

    private String toCollectionTitle(final String keyOrTitle) {
        return getCollectionAttribute(keyOrTitle, CollectionData::getTitle);
    }

    private String getCollectionAttribute(final String keyOrTitle, final Function<CollectionData, String> extractor) {
        List<CollectionData> collections = this.graphQl.getObject().fetchCollections();
        return collections.stream()
                .sorted(Comparator.comparing(CollectionData::getKey)) // natural order, e.g. prefer "MSB" over "SBM"
                .filter(c -> keyOrTitle.equals(c.getKey()) || keyOrTitle.equals(c.getTitle()))
                .findFirst()
                .map(extractor)
                .orElse(keyOrTitle);
    }
}
