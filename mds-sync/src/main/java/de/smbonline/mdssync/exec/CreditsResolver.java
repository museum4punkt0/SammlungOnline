package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.dto.CreditsDTO;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import de.smbonline.mdssync.ruleset.CollectionsNameRule;
import de.smbonline.mdssync.util.Credits;
import de.smbonline.mdssync.util.ValueExtractor;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

/**
 * Transformation rule that builds the picture credits line for an image.
 */
@Component
public class CreditsResolver {

    private static final Logger LOGGER = LoggerFactory.getLogger(CreditsResolver.class);

    public static final String PHOTOGRAPHER_MODULEREF_NAME = "MulPhotographerPerRef";
    public static final String INVOLVED_PARTIES_MODULEREF_NAME = "ObjPerAssociationRef";

    public static final String RIGHTS_GROUP_NAME = "MulRightsGrp";
    public static final String TITLES_GROUP_NAME = "ObjObjectTitleGrp";
    public static final String DATES_GROUP_NAME = "ObjDateGrp";

    public static final String RIGHTSHOLDER_VOC_NAME = "HolderVoc";

    public static final String TITLE_ATTRIBUTE_NAME = "TitleTxt";
    public static final String PERSON_ATTRIBUTE_NAME = "PerNennformTxt";
    public static final String CREDITLINE_ATTRIBUTE_NAME = "MulPhotocreditTxt";
    public static final String DATE_ATTRIBUTE_NAME = "PreviewVrt";

    private static final Pair<String, String> RIGHTSHOLDER_DISTINGUISHER = Pair.of("NotesClb", "Urheberrecht");
    private static final Pair<String, String> IMAGE_RIGHTS_DISTINGUISHER = Pair.of("TypeVoc", "Bildrechte");

    private final MdsApiClientFactory clientFactory;

    @Autowired
    public CreditsResolver(final MdsApiClientFactory clientFactory) {
        this.clientFactory = clientFactory;
    }

    /**
     * Fetch photographer and license info from given ModuleItem and return full credits.
     *
     * @param objectItem Object (parent) item
     * @param mediaItem  Multimedia (image) item
     * @return credits
     */
    public CreditsDTO apply(final ModuleItem objectItem, final ModuleItem mediaItem) throws MdsApiConnectionException {

        String owner = "Staatliche Museen zu Berlin";
        String collection = extractCollection(mediaItem);
        String photographers = extractPhotographers(mediaItem);
        String licenseKey = extractLicenseKey(mediaItem);
        boolean isRightsHolder = Credits.isRightsHolder(licenseKey);

        String title = isRightsHolder ? extractObjectTitle(objectItem) : null;
        String date = isRightsHolder ? extractOriginDate(objectItem) : null;
        String[] artists = isRightsHolder ? extractArtists(objectItem) : null;
        String additionalCredits = isRightsHolder ? extractAdditionalCredits(mediaItem) : null;

        CreditsDTO credits = new CreditsDTO();
        credits.setOwner(owner);
        credits.setCollection(collection);
        credits.setPhotographer(photographers);
        credits.setLicenseKey(licenseKey);
        credits.setTitle(title);
        credits.setOriginDate(date);
        credits.setArtist(artists == null ? null : String.join(", ", artists));
        credits.setAdditionalCredits(additionalCredits);
        return credits;
    }

    private static @Nullable String extractObjectTitle(final ModuleItem objectItem) {
        RepeatableGroup titlesGroup = findGroup(objectItem.getRepeatableGroup(), TITLES_GROUP_NAME);
        if (titlesGroup != null) {
            List<RepeatableGroupItem> titles = titlesGroup.getRepeatableGroupItem().stream()
                    .sorted(Comparator.comparingInt(ValueExtractor::extractSortInfo))
                    .collect(Collectors.toList());
            for (RepeatableGroupItem title : titles) {
                DataField titleField = findDataField(title.getDataField(), TITLE_ATTRIBUTE_NAME);
                String value = extractValue(titleField);
                if (value != null) {
                    // use first hit
                    return value;
                }
            }
        }
        return null;
    }

    private @Nullable String[] extractArtists(final ModuleItem objectItem) throws MdsApiConnectionException {

        // fetch "Beteiligte"
        ModuleReference involvedParties = findModuleRef(objectItem.getModuleReference(), INVOLVED_PARTIES_MODULEREF_NAME);
        if (involvedParties == null) {
            return null;
        }

        // filter "Beteiligte" by "Urheberrecht"
        List<ModuleReferenceItem> artists = involvedParties.getModuleReferenceItem().stream()
                .sorted(Comparator.comparingInt(ValueExtractor::extractSortInfo))
                .filter(i -> {
                    String key = RIGHTSHOLDER_DISTINGUISHER.getKey();
                    String value = RIGHTSHOLDER_DISTINGUISHER.getValue();
                    return findFirst(i.getDataField(), f -> key.equals(f.getName()) && value.equals(extractValue(f))) != null;
                })
                .collect(Collectors.toList());
        if (artists.isEmpty()) {
            return null;
        }

        // map "Beteiligte" to their call names
        List<String> artistNames = new ArrayList<>();
        MdsApiClient personAPI = this.clientFactory.getApiClient(MODULE_PERSON);
        for (ModuleReferenceItem artist : artists) {
            // resolve person name from Person module
            ModuleItem artistItem = personAPI.get(artist.getModuleItemId(), null);
            if (artistItem != null) {
                String personName = extractValue(findDataField(artistItem.getDataField(), PERSON_ATTRIBUTE_NAME));
                if (personName != null) {
                    artistNames.add(personName);
                }
            }
        }
        return artistNames.isEmpty() ? null : artistNames.toArray(String[]::new);
    }

    private static String extractLicenseKey(final ModuleItem mediaItem) {
        String rightsHolder = extractRightsHolderKey(mediaItem);
        return rightsHolder == null ? Credits.STANDARD_LICENSE : rightsHolder;
    }

    private static @Nullable String extractRightsHolderKey(final ModuleItem mediaItem) {
        RepeatableGroup rightsGroup = findGroup(mediaItem.getRepeatableGroup(), RIGHTS_GROUP_NAME);
        if (rightsGroup == null) {
            return null;
        }

        List<String> rightsHolders = rightsGroup.getRepeatableGroupItem()
                .stream()
                .sorted(Comparator.comparingInt(ValueExtractor::extractSortInfo))
                .map(right -> {
                    // filter for image rights
                    VocabularyReferenceItem typeVoc = findVocRefItem(
                            right.getVocabularyReference(), IMAGE_RIGHTS_DISTINGUISHER.getKey(), IMAGE_RIGHTS_DISTINGUISHER.getValue());
                    if (typeVoc == null) {
                        return null;
                    }
                    // filter for rights holder info
                    VocabularyReferenceItem holderVoc = findVocRefItem(right.getVocabularyReference(), RIGHTSHOLDER_VOC_NAME);
                    return holderVoc == null ? null : holderVoc.getName();
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        if (rightsHolders.size() > 1) {
            LOGGER.warn("Found {} rights holders for media {}. Using {}", rightsHolders.size(), mediaItem.getId(), rightsHolders.get(0));
        }
        return rightsHolders.isEmpty() ? null : rightsHolders.get(0);
    }

    private static @Nullable String extractAdditionalCredits(final ModuleItem mediaItem) {
        return extractValue(findDataField(mediaItem.getDataField(), CREDITLINE_ATTRIBUTE_NAME));
    }

    private static @Nullable String extractOriginDate(final ModuleItem objectItem) {
        RepeatableGroup dateGroup = findGroup(objectItem.getRepeatableGroup(), DATES_GROUP_NAME);
        if (dateGroup == null) {
            return null;
        }
        return dateGroup.getRepeatableGroupItem().stream()
                .sorted(Comparator.comparingInt(ValueExtractor::extractSortInfo))
                .map(i -> extractValue(findVrtField(i.getVirtualField(), DATE_ATTRIBUTE_NAME)))
                .filter(StringUtils::isNotBlank)
                .findFirst()
                .orElse(null);
    }

    private static @Nullable String extractCollection(final ModuleItem mediaItem) {
        return new CollectionsNameRule().apply(mediaItem);
    }

    private static @Nullable String extractPhotographers(final ModuleItem mediaItem) {
        ModuleReference photographerRef = findModuleRef(mediaItem.getModuleReference(), PHOTOGRAPHER_MODULEREF_NAME);
        if (photographerRef != null) {
            return photographerRef.getModuleReferenceItem().stream()
                    .map(p -> p.getFormattedValue().getValue())
                    .filter(StringUtils::isNotBlank)
                    .collect(Collectors.joining(", "));
        }
        return null;
    }
}
