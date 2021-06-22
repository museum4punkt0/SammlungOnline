package de.smbonline.mdssync.test;

import de.smbonline.mdssync.search.response.DataField;
import de.smbonline.mdssync.search.response.DataType;
import de.smbonline.mdssync.search.response.Field;
import de.smbonline.mdssync.search.response.FormattedValue;
import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.SystemField;
import de.smbonline.mdssync.search.response.VirtualField;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.lang.Nullable;

public final class TestData {

    @SafeVarargs
    public static ModuleItem createModuleItem(final Long id, final Pair<String, String>... fields) {
        ModuleItem item = new ModuleItem();
        item.setId(id);
        for (Pair<String, String> field : fields) {
            if (field.getKey().endsWith("Vrt")) {
                item.getVirtualField().add(createVirtualField(field.getKey(), field.getValue()));
            } else if (field.getKey().startsWith("__")) {
                item.getSystemField().add(createSystemField(field.getKey(), field.getValue()));
            } else {
                item.getDataField().add(createDataField(field.getKey(), field.getValue()));
            }
        }
        return item;
    }

    public static VirtualField createVirtualField(final String name, final @Nullable String value) {
        VirtualField field = new VirtualField();
        applyNameAndValue(field, name, value);
        return field;
    }

    public static DataField createDataField(final String name, final @Nullable String value) {
        DataField field = new DataField();
        applyNameAndValue(field, name, value);
        return field;
    }

    public static SystemField createSystemField(final String name, final @Nullable String value) {
        SystemField field = new SystemField();
        applyNameAndValue(field, name, value);
        return field;
    }

    private static void applyNameAndValue(final Field field, final String name, final String value) {
        field.setName(name);
        field.setValue(value);
        if (field instanceof DataField) {
            ((DataField) field).setDataType(DataType.VARCHAR);
            ((DataField) field).setFormattedValue(createFormattedValue(value));
        }
    }

    public static FormattedValue createFormattedValue(final @Nullable String value) {
        FormattedValue fValue = new FormattedValue();
        fValue.setLanguage("de");
        fValue.setValue(value);
        return fValue;
    }
}
