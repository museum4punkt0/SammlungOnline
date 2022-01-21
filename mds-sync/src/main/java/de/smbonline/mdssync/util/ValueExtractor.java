package de.smbonline.mdssync.util;

import de.smbonline.mdssync.jaxb.search.response.CompositeItem;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.DataType;
import de.smbonline.mdssync.jaxb.search.response.FormattedValue;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReference;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

import static de.smbonline.mdssync.util.Conversions.*;
import static de.smbonline.mdssync.util.Lookup.*;

public final class ValueExtractor {

    public static @Nullable String extractValue(final @Nullable DataField field) {
        if (field != null) {
            DataType dataType = Optional.ofNullable(field.getDataType()).orElse(DataType.VARCHAR);
            switch (dataType) {
                case CLOB:
                case VARCHAR:
                    FormattedValue fValue = field.getFormattedValue();
                    if (fValue != null && StringUtils.isNotBlank(fValue.getValue())) {
                        return fValue.getValue().trim();
                    }
                    // else: fallthrough
                default:
                    if (StringUtils.isNotBlank(field.getValue())) {
                        return field.getValue().trim();
                    }
            }
        }
        return null;
    }

    public static @Nullable String extractValue(final @Nullable VirtualField field) {
        if (field != null && StringUtils.isNotBlank(field.getValue())) {
            return field.getValue().trim();
        }
        return null;
    }

    public static @Nullable String extractValue(final @Nullable VocabularyReference voc) {
        return voc == null ? null : extractValue(voc.getVocabularyReferenceItem());
    }

    public static @Nullable String extractValue(final @Nullable VocabularyReferenceItem item) {
        if (item == null) {
            return null;
        }
        FormattedValue fValue = item.getFormattedValue();
        if (fValue != null && StringUtils.isNotBlank(fValue.getValue())) {
            return fValue.getValue().trim();
        }
        return item.getName();
    }

    public static int extractSortInfo(final ModuleReferenceItem item) {
        if (item.getSeqNo() != null) {
            return toInteger(item.getSeqNo());
        }
        return extractSortLnu(item.getDataField());
    }

    public static int extractSortInfo(final RepeatableGroupItem item) {
        if (item.getSeqNo() != null) {
            return toInteger(item.getSeqNo());
        }
        return extractSortLnu(item.getDataField());
    }

    public static int extractSortInfo(final RepeatableGroupReferenceItem item) {
        if (item.getSeqNo() != null) {
            return toInteger(item.getSeqNo());
        }
        return extractSortLnu(item.getDataField());
    }

    public static int extractSortInfo(final CompositeItem item) {
        return toInteger(item.getSeqNo());
    }

    private static int extractSortLnu(final List<DataField> fields) {
        String value = extractValue(findDataField(fields, "SortLnu"));
        // we sometimes have separators in the value like 9.565 instead of plain 9565
        return toInteger(value == null ? null : value.replace(".", ""));
    }

    private ValueExtractor() {
        // no instances
    }
}
