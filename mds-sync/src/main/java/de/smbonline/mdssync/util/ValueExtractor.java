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
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

import static de.smbonline.mdssync.util.Conversions.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;

public final class ValueExtractor {


    public static boolean isNotBlacklisted(final @Nullable String value) {
        return StringUtils.isNotBlank(value) && !ArrayUtils.contains(DEFAULT_BLACKLISTED_VALUES, value);
    }

    public static @Nullable String extractValue(final @Nullable DataField field) {
        if (field != null) {
            DataType dataType = Optional.ofNullable(field.getDataType()).orElse(DataType.VARCHAR);
            if (dataType == DataType.CLOB || dataType == DataType.VARCHAR) {
                FormattedValue fValue = field.getFormattedValue();
                if (fValue != null && isNotBlacklisted(fValue.getValue())) {
                    return fValue.getValue().trim();
                }
            }
            if (isNotBlacklisted(field.getValue())) {
                return field.getValue().trim();
            }
        }
        return null;
    }

    public static @Nullable String extractValue(final @Nullable VirtualField field) {
        if (field != null && isNotBlacklisted(field.getValue())) {
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
        if (fValue != null && isNotBlacklisted(fValue.getValue())) {
            return fValue.getValue().trim();
        }
        return item.getName();
    }

    public static int extractSortInfo(final ModuleReferenceItem item) {
        int sequence = extractSortLnu(item.getDataField());
        return sequence == -1 ? toInteger(item.getSeqNo()) : sequence;
    }

    public static int extractSortInfo(final RepeatableGroupItem item) {
        int sequence = extractSortLnu(item.getDataField());
        return sequence == -1 ? toInteger(item.getSeqNo()) : sequence;
    }

    public static int extractSortInfo(final RepeatableGroupReferenceItem item) {
        int sequence = extractSortLnu(item.getDataField());
        return sequence == -1 ? toInteger(item.getSeqNo()) : sequence;
    }

    public static int extractSortInfo(final CompositeItem item) {
        return toInteger(item.getSeqNo());
    }

    private static int extractSortLnu(final List<DataField> fields) {
        String value = extractValue(findDataField(fields, "SortLnu"));
        if (value == null) {
            // some modules use a slightly differently named field - wtf
            value = extractValue(findDataField(fields, "Sort001Lnu"));
        }
        if (value == null) {
            // we found even more variants of the field - wtf²
            value = extractValue(findDataField(fields, "SortingLnu"));
        }
        // sometimes, if the field is incorrectly marked with datatype VARCHAR instead of NUMBER,
        // we have separators in the value like 9.565 instead of plain 9565
        return toInteger(value == null ? null : value.replace(".", ""));
    }

    private ValueExtractor() {
        // no instances
    }
}
