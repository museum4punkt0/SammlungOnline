package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.NormalizerBase;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.ARCHIVE_CONTENT;

public class ArchiveContentNormalizer extends NormalizerBase<String> {

    // TODO use this?
//    private static final String[] VOC_WHITELIST = {
//            "Archivalie - Akte",
//            "Archivalie - Einzelblatt",
//            "Archivalie - Slg.-Verzeichnis(Dokumente)",
//            "Archivalie - Sonstiges",
//            "Archivalie - Vorgang (Akten EM)"
//    };

    public ArchiveContentNormalizer() {
        super(ARCHIVE_CONTENT);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjCategoryVoc",
                "ObjObjectArchiveContentVrt",
        };
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source, final String language) {
        boolean isArchival = source.getAttributes()
                .stream()
                .anyMatch(a -> "ObjCategoryVoc".equals(a.getKey())
                        && StringUtils.startsWith(a.getValue(), "Archivalie"));
        return isArchival ? getAttributeValue(source, "ObjObjectArchiveContentVrt") : null;
    }
}
