package de.smbonline.mdssync.util;

import de.smbonline.mdssync.dto.Credits;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

public final class Licenses {

    public static final String COPYRIGHT_SIGN = "\u00A9";
    public static final String STANDARD_LICENSE = "CC_BY_SA_40"; // must exist in licenses table

    public static boolean isRightsHolder(final @Nullable String licenseKey) {
        // by default, everything that is not creative-commons or public domain is considered a rights holder
        return licenseKey != null
                && !STANDARD_LICENSE.equals(licenseKey)
                && !licenseKey.startsWith("CC")
                && !licenseKey.startsWith("Public");
    }

    public static String toCreditLine(final Credits credits) {

        boolean hasOwner = StringUtils.isNotBlank(credits.getOwner());
        boolean hasCollection = StringUtils.isNotBlank(credits.getCollection());
        boolean hasLicense = StringUtils.isNotBlank(credits.getLicenseKey());
        boolean hasPhotographer = StringUtils.isNotBlank(credits.getPhotographer());

        // Option (A) "${owner}, ${collection} / ${photographer}"
        // Option (B) "${owner}, ${collection} / ${photographer} // ${artist} ${title} ${year} (c) ${additionalCredits}"
        // Note: Actual license is not appended here - this is done in frontend after resolving license id

        StringBuilder builder = new StringBuilder();

        if (hasOwner) {
            builder.append(credits.getOwner().trim());
        }
        if (hasCollection) {
            if (builder.length() > 0) {
                builder.append(", ");
            }
            builder.append(credits.getCollection().trim());
        }
        if (hasPhotographer) {
            if (builder.length() > 0) {
                builder.append(" / ");
            }
            builder.append(credits.getPhotographer().trim());
        }
        if (hasLicense) {
            boolean isRightsHolder = isRightsHolder(credits.getLicenseKey());
            if (!isRightsHolder && !hasPhotographer && builder.length() > 0) {
                builder.append(" /"); // license will be appended in frontend
            } else if (isRightsHolder) {
                if (builder.length() > 0) {
                    builder.append(StringUtils.SPACE);
                }
                String rightsHolderPart = buildRightsHolderCreditsPart(credits);
                builder.append(rightsHolderPart);
                if (!hasCopyright(rightsHolderPart)) {
                    builder.append(StringUtils.SPACE).append(COPYRIGHT_SIGN);
                }
            }
        }
        return builder.toString();
    }

    private static String buildRightsHolderCreditsPart(final Credits credits) {

        boolean hasArtist = StringUtils.isNotBlank(credits.getArtist());
        boolean hasTitle = StringUtils.isNotBlank(credits.getTitle());
        boolean hasDate = StringUtils.isNotBlank(credits.getOriginDate());
        boolean hasAdditionalCredits = StringUtils.isNotBlank(credits.getAdditionalCredits());

        StringBuilder builder = new StringBuilder("//");
        if (hasArtist) {
            builder.append(StringUtils.SPACE).append(credits.getArtist().trim()).append(',');
        }
        if (hasTitle) {
            builder.append(StringUtils.SPACE).append(credits.getTitle().trim()).append(',');
        }
        if (hasDate) {
            builder.append(StringUtils.SPACE).append(credits.getOriginDate().trim());
        }
        if (builder.charAt(builder.length() - 1) == ',') {
            builder.setLength(builder.length() - 1);
        }
        if (hasAdditionalCredits) {
            builder.append(StringUtils.SPACE).append(COPYRIGHT_SIGN).append(StringUtils.SPACE)
                    .append(credits.getAdditionalCredits().trim());
        }
        return builder.toString();
    }

    private static boolean hasCopyright(final String string) {
        return string.contains(COPYRIGHT_SIGN) || string.contains("(c)") || string.contains("©");
    }

    private Licenses() {
        // no instances
    }
}
