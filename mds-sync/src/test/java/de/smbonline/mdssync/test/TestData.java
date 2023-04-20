package de.smbonline.mdssync.test;

import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.DataType;
import de.smbonline.mdssync.jaxb.search.response.Field;
import de.smbonline.mdssync.jaxb.search.response.FormattedValue;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReference;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.lang.Nullable;

import java.util.Arrays;

public final class TestData {

    @SafeVarargs
    public static ModuleItem createModuleItem(final Long id, final Pair<String, String>... fields) {
        ModuleItem item = new ModuleItem();
        item.setId(id);
        item.getSystemField().add(createSystemField("__id", id.toString()));
        for (Pair<String, String> field : fields) {
            if (field.getKey().endsWith("Vrt")) {
                item.getVirtualField().add(createVirtualField(field.getKey(), field.getValue()));
            } else if (field.getKey().startsWith("__")) {
                item.getSystemField().add(createSystemField(field.getKey(), field.getValue()));
            } else if (field.getKey().endsWith("Voc")) {
                item.getVocabularyReference().add(createVocabularyReference(field.getKey(), field.getValue()));
            } else {
                item.getDataField().add(createDataField(field.getKey(), field.getValue()));
            }
        }
        return item;
    }

    public static ModuleReference createModuleReference(final String name, final String module, final ModuleReferenceItem... items) {
        ModuleReference ref = new ModuleReference();
        ref.setName(name);
        ref.setTargetModule(module);
        ref.getModuleReferenceItem().addAll(Arrays.asList(items));
        ref.setSize((long) items.length);
        return ref;
    }

    @SafeVarargs
    public static ModuleReferenceItem createModuleReferenceItem(
            final Long id, final String value, final Pair<String, String>... fields) {

        ModuleReferenceItem item = new ModuleReferenceItem();
        item.setModuleItemId(id);
        item.setUuid("" + id);
        item.setSeqNo(id);
        item.getDataField().add(createDataField("SortLnu", id.toString()));
        item.setFormattedValue(createFormattedValue(value));
        for (Pair<String, String> field : fields) {
            if (field.getKey().endsWith("Vrt")) {
                item.getVirtualField().add(createVirtualField(field.getKey(), field.getValue()));
            } else if (field.getKey().endsWith("Voc")) {
                item.getVocabularyReference().add(createVocabularyReference(field.getKey(), field.getValue()));
            } else {
                item.getDataField().add(createDataField(field.getKey(), field.getValue()));
            }
        }
        return item;
    }

    public static RepeatableGroup createRepeatableGroup(final String name, final RepeatableGroupItem... items) {
        RepeatableGroup group = new RepeatableGroup();
        group.setName(name);
        group.getRepeatableGroupItem().addAll(Arrays.asList(items));
        group.setSize((long) items.length);
        return group;
    }

    @SafeVarargs
    public static RepeatableGroupItem createRepeatableGroupItem(final Long id, final Pair<String, String>... fields) {
        RepeatableGroupItem item = new RepeatableGroupItem();
        item.setId(id);
        item.setSeqNo(id);
        item.getDataField().add(createDataField("__id", id.toString()));
        for (Pair<String, String> field : fields) {
            if (field.getKey().endsWith("Vrt")) {
                item.getVirtualField().add(createVirtualField(field.getKey(), field.getValue()));
            } else if (field.getKey().endsWith("Voc")) {
                item.getVocabularyReference().add(createVocabularyReference(field.getKey(), field.getValue()));
            } else {
                item.getDataField().add(createDataField(field.getKey(), field.getValue()));
            }
        }
        return item;
    }

    public static VocabularyReference createVocabularyReference(final String key, final String value) {
        VocabularyReference ref = new VocabularyReference();
        ref.setId((long) key.hashCode());
        ref.setName(key);
        ref.setInstanceName(key + "Vgr");
        ref.setVocabularyReferenceItem(createVocabularyReferenceItem(value));
        return ref;
    }

    public static VocabularyReferenceItem createVocabularyReferenceItem(final String value) {
        VocabularyReferenceItem item = new VocabularyReferenceItem();
        item.setId(StringUtils.isNumeric(value) ? value : "" + value.hashCode());
        item.setName(value);
        item.setFormattedValue(createFormattedValue(value));
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

    public static FormattedValue createFormattedValue(final @Nullable String value) {
        FormattedValue fValue = new FormattedValue();
        fValue.setLanguage("de");
        fValue.setValue(value);
        return fValue;
    }

    private static void applyNameAndValue(final Field field, final String name, final String value) {
        field.setName(name);
        field.setValue(value);
        if (field instanceof DataField) {
            ((DataField) field).setDataType(DataType.VARCHAR);
            ((DataField) field).setFormattedValue(createFormattedValue(value));
        }
    }
}
