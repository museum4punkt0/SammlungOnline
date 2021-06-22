package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.Normalizer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.Map;
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
    // e.g. "R 04" or "Raum 038" or "R2"
    private static final Pattern ROOM_PATTERN = Pattern.compile("^.*?(?:R|Raum) *(?<room>\\d+).*$");

    private final String separator;

    public ExhibitionSpaceNormalizer(final String separator) {
        this.separator = separator;
    }

    @Override
    public String getAttributeKey() {
        return EXHIBITION_SPACE_ATTRIBUTE;
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source) {
        String exhibitionSpace = source.getExhibitionSpace();
        if (!StringUtils.contains(exhibitionSpace, this.separator)) {
            return null;
        }
        return createAttributeValue(exhibitionSpace);
    }

    protected @Nullable String createAttributeValue(final String sourceValue) {

        String[] parts = StringUtils.splitByWholeSeparatorPreserveAllTokens(sourceValue, this.separator, 6);
        //String collection = parts.length > 0 ? StringUtils.defaultIfEmpty(parts[0].trim(), null) : null;
        String building = parts.length > 1 ? StringUtils.defaultIfEmpty(parts[1].trim(), null) : null;
        String sector = parts.length > 2 ? StringUtils.defaultIfEmpty(parts[2].trim(), null) : null;
        String level = parts.length > 3 ? StringUtils.defaultIfEmpty(parts[3].trim(), null) : null;
        String room = parts.length > 4 ? StringUtils.defaultIfEmpty(parts[4].trim(), null) : null;
        //String appendix = parts.length > 5 ? StringUtils.defaultIfEmpty(parts[5].trim(), null) : null;
        LOGGER.debug("Extracted building:'{}', sector:'{}', level:'{}', room:'{}' from '{}'", building, sector, level, room, sourceValue);

        building = normalizeBuilding(building);
        sector = normalizeSector(sector);
        level = normalizeLevel(building, level, room);
        room = normalizeRoom(level, room);
        LOGGER.debug("Normalized building:'{}', sector:'{}', level:'{}', room:'{}'", building, sector, level, room);

        return Stream.of(building, sector, level, room)
                .filter(StringUtils::isNotBlank)
                .collect(Collectors.joining(", "));
    }

    private static String normalizeBuilding(final @Nullable String building) {
        return building == null ? "" : toBuildingValue(building);
    }

    private static String normalizeSector(final @Nullable String sector) {
        // TODO unknown normalization logic
        return sector == null ? "" : sector;
    }

    private static String normalizeLevel(final String building, final @Nullable String level, final String room) {
        if (level != null) {
            String buildingKey = toBuildingKey(building);
            // remove potential building key, e.g. "AM Hauptgeschoss" -> "Hauptgeschoss"
            return level.startsWith(buildingKey)
                    ? StringUtils.stripStart(level.substring(buildingKey.length()), " -")
                    : level;
        }
        Matcher levelRoomMatcher = LEVEL_ROOM_PATTERN.matcher(room);
        if (levelRoomMatcher.matches()) {
            return "Ebene " + levelRoomMatcher.group("level");
        }
        // Uhm... this is a bad guess but we assume, there are only 99 rooms on one level.
        // So if the room number is 100+, we expect the first digit represents the level.
        String rawRoom = extractNumber(room);
        if (rawRoom.length() > 2) {
            return "Ebene " + rawRoom.substring(0, rawRoom.length() - 2);
        }
        LOGGER.warn("Unable to normalize level info from extracted room '{}'", room);
        return "";
    }

    private static String normalizeRoom(final String level, final String room) {
        Matcher levelRoomMatcher = LEVEL_ROOM_PATTERN.matcher(room);
        if (levelRoomMatcher.matches()) {
            String rawLevel = levelRoomMatcher.group("level");
            String rawRoom = levelRoomMatcher.group("room");
            return "Raum " + rawLevel + rawRoom;
        }
        Matcher roomMatcher = ROOM_PATTERN.matcher(room);
        if (roomMatcher.matches()) {
            String rawRoom = roomMatcher.group("room");
            String rawLevel = extractNumber(level);
            // Uhm... this is a bad guess but we assume, there are only 99 rooms on one level.
            // So if the room number has 3 digits, we expect the first digit represents the level.
            if (rawRoom.length() > 2) {
                // check if rawRoom contains the level
                if (rawRoom.indexOf(rawLevel) == 0) {
                    return "Raum " + rawRoom;
                }
            }
            // prepend the level to the rawRoom info
            return "Raum " + rawLevel + rawRoom;
        }
        LOGGER.warn("Unable to normalize room info from extracted value '{}'", room);
        return room;
    }

    private static String extractNumber(final String level) {
        // reverse the string to check the digits at the end
        char[] reverse = StringUtils.reverse(level).toCharArray();
        StringBuilder digits = new StringBuilder();
        for (int i = 0; i < reverse.length && Character.isDigit(reverse[i]); i++) {
            // re-reverse the digits to end up with correct order
            digits.insert(0, reverse[i]);
        }
        return digits.toString();
    }

    private static String toBuildingKey(final String building) {
        return buildingMapping().entrySet()
                .stream()
                .filter(e-> building.equals(e.getValue()))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(building);
    }

    private static String toBuildingValue(final String building) {
        return buildingMapping().getOrDefault(building, building);
    }
}
