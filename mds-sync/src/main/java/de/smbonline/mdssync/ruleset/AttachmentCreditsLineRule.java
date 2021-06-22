package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.ModuleReference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.stream.Collectors;

import static de.smbonline.mdssync.util.Lookup.*;

/**
 * Transformation rule that builds the picture credits line for an image.
 */
public class AttachmentCreditsLineRule implements TransformationRule {

    public static final String PHOTOGRAPHER_MODULE_NAME = "MulPhotographerPerRef";

    /**
     * Fetch photographer info from given ModuleItem and return full credits.
     * @param mediaItem Multimedia (image) item
     * @return credits
     */
    @Override
    public @Nullable String apply(final ModuleItem mediaItem) {
        String owner = "Staatliche Museen zu Berlin";
        String license = "CC BY-NC-SA 4.0";
        String collection = extractCollection(mediaItem);
        String photographer = extractPhotographers(mediaItem);

        boolean hasOwner = StringUtils.isNotBlank(owner);
        boolean hasCollection = StringUtils.isNotBlank(collection);
        boolean hasLicense = StringUtils.isNotBlank(license);
        boolean hasPhotographer = StringUtils.isNotBlank(photographer);

        // "${owner}, ${collection} / ${photographer} ${license}"
        StringBuilder builder = new StringBuilder();
        if (hasOwner) {
            builder.append(owner.trim());
            if (hasCollection) {
                builder.append(", ");
            }
        }
        if (hasCollection) {
            builder.append(collection.trim());
        }
        if (hasPhotographer || hasLicense && builder.length() > 0) {
            builder.append(" / ");
        }
        if (hasPhotographer) {
            builder.append(photographer.trim());
            if (hasLicense) {
                builder.append(" ");
            }
        }
        if (hasLicense) {
            builder.append(license.trim());
        }
        return builder.toString();
    }

    private @Nullable String extractCollection(final ModuleItem mediaItem) {
        return new CollectionsNameRule().apply(mediaItem);
    }

    private static @Nullable String extractPhotographers(final ModuleItem mediaItem) {
        ModuleReference photographerRef = findFirst(mediaItem.getModuleReference(), ref -> PHOTOGRAPHER_MODULE_NAME.equals(ref.getName()));
        if (photographerRef != null) {
            return photographerRef.getModuleReferenceItem()
                    .stream()
                    .map(p -> p.getFormattedValue().getValue())
                    .filter(StringUtils::isNotBlank)
                    .collect(Collectors.joining(", "));
        }
        return null;
    }
}
