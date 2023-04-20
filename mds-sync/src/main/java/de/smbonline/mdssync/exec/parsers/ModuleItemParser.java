package de.smbonline.mdssync.exec.parsers;

import de.smbonline.mdssync.dto.AttributeValue;
import de.smbonline.mdssync.dto.MdsItem;
import de.smbonline.mdssync.jaxb.search.response.Composite;
import de.smbonline.mdssync.jaxb.search.response.CompositeItem;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.DataType;
import de.smbonline.mdssync.jaxb.search.response.FormattedValue;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupReference;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReference;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;

import static de.smbonline.mdssync.exec.parsers.ParserUtils.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

public abstract class ModuleItemParser<T extends MdsItem> {

    private static final Logger LOGGER = LoggerFactory.getLogger(ModuleItemParser.class);

    protected final String language;
    protected final List<String> blacklistValues = new ArrayList<>();
    protected final List<String> ignorableKeys = new ArrayList<>();
    protected boolean skipEmptyValues = false;

    public ModuleItemParser(final String language) {
        this.language = language;
    }

    public String getLanguage() {
        return this.language;
    }

    public void setSkipEmptyValues(final boolean skip) {
        this.skipEmptyValues = skip;
    }

    public void addBlacklistValues(final String... values) {
        this.blacklistValues.addAll(Arrays.asList(values));
    }

    public void addIgnorableKeys(final String... keys) {
        this.ignorableKeys.addAll(Arrays.asList(keys));
    }

    public abstract T newDto(final Long id);

    public T parseModuleItem(final ModuleItem moduleItem) {
        T obj = newDto(moduleItem.getId());
        String itemFqKey = String.format("[%d]", moduleItem.getId());

        List<AttributeValue> attributes = new ArrayList<>();

        FormattedValue fValue = moduleItem.getFormattedValue();
        if (fValue != null) {
            // don't know if this ever happens but XSD claims this is a real case...
            attributes.add(fromFormattedValue(fValue, itemFqKey));
        }
        // fields
        attributes.addAll(parseDataFields(moduleItem::getDataField, itemFqKey));
        attributes.addAll(parseDataFields(moduleItem::getSystemField, itemFqKey));
        attributes.addAll(parseVirtualFields(moduleItem::getVirtualField, itemFqKey));
        // refs
        attributes.addAll(parseVocabularyReferences(moduleItem::getVocabularyReference, itemFqKey));
        attributes.addAll(parseModuleReferences(moduleItem::getModuleReference, itemFqKey));
        attributes.addAll(parseRepeatableGroupReferences(moduleItem::getRepeatableGroupReference, itemFqKey));
        // repeatable groups
        attributes.addAll(parseRepeatableGroups(moduleItem::getRepeatableGroup, itemFqKey));
        // composite
        attributes.addAll(parseComposites(moduleItem::getComposite, itemFqKey));

        // now that we know everything about the object, apply indexing rules
        attributes = applyIndexingRules(attributes);
        obj.setAttributes(attributes);

        // done
        return obj;
    }

    private List<AttributeValue> applyIndexingRules(final List<AttributeValue> allAttributes) {
        List<AttributeValue> allowedAttributes = new ArrayList<>(allAttributes);
        allowedAttributes.removeIf(attr -> checkForbidden(attr, allAttributes));
        return allowedAttributes;
    }

    private boolean checkForbidden(final AttributeValue attr, final List<AttributeValue> all) {
        // lightweight checks first, rule-set check only if necessary
        if (isBlacklisted(attr) || isPointless(attr) || isIgnored(attr)) {
            return true;
        }
//        // FIXME extract and perform full rule-set check
//        if (attr.getKey().startsWith("ObjGeograficGrp.") || attr.getKey().startsWith("ObjPerAssociationRef.")) {
//            // TODO itemFqKey extraction is more complex
//            String itemFqKey = StringUtils.substringBefore(attr.getFqKey(), "." + StringUtils.substringAfter(attr.getKey(), "."));
//            LOGGER.info("TODO: Check forbidden item {}", itemFqKey);
//            if (attr.getKey().startsWith("ObjGeograficGrp.")) {
//                // TODO check blacklisted TypeVoc
//            }
//            if (attr.getKey().startsWith("ObjPerAssociationRef.")) {
//                // TODO check blacklisted RoleVoc
//            }
//        }
        return false;
    }

    private boolean isBlacklisted(final AttributeValue attr) {
        String value = attr.getValue();
        if (value == null && this.blacklistValues.contains(null)) {
            return true;
        }
        return value != null && this.blacklistValues.stream().anyMatch(value::equalsIgnoreCase);
    }

    private boolean isIgnored(final AttributeValue attr) {
        return this.ignorableKeys.stream().anyMatch(ik -> {
            if (ik.charAt(ik.length() - 1) == '*') {
                // hierarchical
                String key = ik.substring(0, ik.length() - 1);
                return attr.getKey().startsWith(key);
            }
            return attr.getKey().equals(ik);
        });
    }

    private boolean isPointless(final AttributeValue attr) {
        return this.skipEmptyValues && StringUtils.isBlank(attr.getValue());
    }

    private Collection<AttributeValue> parseDataFields(
            final Supplier<List<? extends DataField>> supplier,
            final @Nullable String parentFqKey) {
        return supplier.get()
                .stream()
                .map(f -> parseDataField(f, parentFqKey))
                .toList();
    }

    AttributeValue parseDataField(final DataField field, final @Nullable String parentFqKey) {
        FormattedValue fValue = field.getFormattedValue();
        String fqKey = joinFqKey(parentFqKey, field.getName(), null);
        String key = toKey(fqKey);
        DataType dataType = field.getDataType() != null ? field.getDataType() : DataType.VARCHAR;

        if (field instanceof SystemField && !field.getName().startsWith("__")) {
            LOGGER.error("INVALID SYSTEM FIELD NAMING IN ATTRIBUTE {} - expecting __* but is {}", key, field.getName());
        }

        AttributeValue attr = new AttributeValue();
        attr.setDatatype(dataType.value());
        attr.setLanguage(fValue != null ? fValue.getLanguage() : this.language);
        attr.setValue(normalizedValue(dataType, extractValue(field)));
        attr.setFqKey(fqKey);
        attr.setKey(key);
        return attr;
    }

    private Collection<AttributeValue> parseVirtualFields(
            final Supplier<List<? extends VirtualField>> supplier,
            final @Nullable String parentFqKey) {
        return supplier.get()
                .stream()
                .map(f -> parseVirtualField(f, parentFqKey))
                .toList();
    }

    AttributeValue parseVirtualField(final VirtualField field, final @Nullable String parentFqKey) {
        String fqKey = joinFqKey(parentFqKey, field.getName(), null);
        String key = toKey(fqKey);

        if (!field.getName().endsWith("Vrt")) {
            LOGGER.error("INVALID VIRTUAL FIELD NAMING IN ATTRIBUTE {} - expecting *Vrt but is {}", key, field.getName());
        }

        AttributeValue attr = new AttributeValue();
        attr.setDatatype(DataType.VARCHAR.value());
        attr.setLanguage(this.language);
        attr.setValue(normalizedValue(DataType.VARCHAR, extractValue(field)));
        attr.setFqKey(fqKey);
        attr.setKey(key);
        return attr;
    }

    private Collection<AttributeValue> parseVocabularyReferences(
            final Supplier<List<? extends VocabularyReference>> supplier,
            final @Nullable String parentFqKey) {
        return supplier.get()
                .stream()
                .map(voc -> parseVocabularyReference(voc, parentFqKey))
                .flatMap(Collection::stream)
                .toList();
    }

    Collection<AttributeValue> parseVocabularyReference(final VocabularyReference voc, final @Nullable String parentFqKey) {
        VocabularyReferenceItem item = voc.getVocabularyReferenceItem();
        FormattedValue fValue = item.getFormattedValue();

        // Bug in MDS - "ObjGeneralCre.*Grp._UserOalTextSTxt" has incorrect name
        String vocName = "_UserOalTextSTxt".equals(voc.getName()) ? "_UserOalTextSVoc" : voc.getName();
        String refFqKey = joinFqKey(parentFqKey, vocName, voc.getId());
        String itemFqKey = joinFqKey(refFqKey, "vocabularyReferenceItem", item.getId());
        String itemKey = toKey(itemFqKey);

        if (!vocName.endsWith("Voc")) {
            // just in case there are more issues like the known
            LOGGER.error("INVALID VOC FIELD NAMING IN ATTRIBUTE {} - expecting *Voc but is {}", itemKey, vocName);
        }

        AttributeValue self = new AttributeValue();
        self.setDatatype(DataType.VARCHAR.value());
        self.setLanguage(fValue != null ? fValue.getLanguage() : this.language);
        self.setValue(normalizedValue(DataType.VARCHAR, extractValue(item)));
        self.setFqKey(itemFqKey);
        self.setKey(itemKey);

        AttributeValue id = new AttributeValue();
        id.setDatatype(DataType.LONG.value());
        id.setLanguage(this.language);
        id.setValue(normalizedValue(DataType.LONG, item.getId()));
        id.setFqKey(joinFqKey(itemFqKey, "id", null));
        id.setKey(StringUtils.join(itemKey, ".", "id"));

        AttributeValue name = new AttributeValue();
        name.setDatatype(DataType.VARCHAR.value());
        name.setLanguage(this.language);
        name.setValue(normalizedValue(DataType.VARCHAR, item.getName()));
        name.setFqKey(joinFqKey(itemFqKey, "name", null));
        name.setKey(StringUtils.join(itemKey, ".", "name"));

        return Arrays.asList(self, id, name);
    }

    private Collection<AttributeValue> parseModuleReferences(
            final Supplier<List<? extends ModuleReference>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeValue> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(module -> parseModuleReference(module, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    List<AttributeValue> parseModuleReference(final ModuleReference mod, final @Nullable String parentFqKey) {
        List<AttributeValue> attributes = new ArrayList<>();
        String modFqKey = joinFqKey(parentFqKey, mod.getName(), null);
        for (ModuleReferenceItem ref : mod.getModuleReferenceItem()) {
            String itemId = toItemId(ref.getModuleItemId(), extractSortInfo(ref));
            String itemFqKey = joinFqKey(modFqKey, "moduleReferenceItem", itemId);
            FormattedValue fValue = ref.getFormattedValue();
            if (fValue != null) {
                attributes.add(fromFormattedValue(fValue, itemFqKey));
            }
            // in seldom cases there are additional attributes available
            attributes.addAll(parseDataFields(ref::getDataField, itemFqKey));
            attributes.addAll(parseVirtualFields(ref::getVirtualField, itemFqKey));
            attributes.addAll(parseVocabularyReferences(ref::getVocabularyReference, itemFqKey));
        }
        return attributes;
    }

    private Collection<AttributeValue> parseRepeatableGroups(
            final Supplier<List<? extends RepeatableGroup>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeValue> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(group -> parseRepeatableGroup(group, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    List<AttributeValue> parseRepeatableGroup(
            final RepeatableGroup group,
            final @Nullable String parentFqKey) {

        List<AttributeValue> attributes = new ArrayList<>();
        String groupFqKey = joinFqKey(parentFqKey, group.getName(), null);
        for (RepeatableGroupItem item : group.getRepeatableGroupItem()) {
            String itemId = toItemId(item.getId(), extractSortInfo(item));
            String itemFqKey = joinFqKey(groupFqKey, "repeatableGroupItem", itemId);
            FormattedValue fValue = item.getFormattedValue();
            if (fValue != null) {
                // don't know if this ever happens but XSD claims this is a real case...
                attributes.add(fromFormattedValue(fValue, itemFqKey));
            }
            attributes.addAll(parseDataFields(item::getDataField, itemFqKey));
            attributes.addAll(parseVirtualFields(item::getVirtualField, itemFqKey));
            attributes.addAll(parseVocabularyReferences(item::getVocabularyReference, itemFqKey));
            attributes.addAll(parseModuleReferences(item::getModuleReference, itemFqKey));
            attributes.addAll(parseRepeatableGroupReferences(item::getRepeatableGroupReference, itemFqKey));
        }
        return attributes;
    }

    private Collection<AttributeValue> parseRepeatableGroupReferences(
            final Supplier<List<? extends RepeatableGroupReference>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeValue> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(group -> parseRepeatableGroupReference(group, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    List<AttributeValue> parseRepeatableGroupReference(final RepeatableGroupReference group, final @Nullable String parentFqKey) {
        List<AttributeValue> attributes = new ArrayList<>();
        String groupFqKey = joinFqKey(parentFqKey, group.getName(), null);
        for (RepeatableGroupReferenceItem item : group.getReferenceItem()) {
            String itemId = toItemId(item.getRepeatableGroupItemId(), extractSortInfo(item));
            String itemFqKey = joinFqKey(groupFqKey, "repeatableGroupReferenceItem", itemId);
            FormattedValue fValue = item.getFormattedValue();
            if (fValue != null) {
                // don't know if this ever happens but XSD claims this is a real case...
                attributes.add(fromFormattedValue(fValue, itemFqKey));
            }
            attributes.addAll(parseDataFields(item::getDataField, itemFqKey));
            attributes.addAll(parseVirtualFields(item::getVirtualField, itemFqKey));
            attributes.addAll(parseVocabularyReferences(item::getVocabularyReference, itemFqKey));
        }
        return attributes;
    }

    private Collection<AttributeValue> parseComposites(
            final Supplier<List<? extends Composite>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeValue> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(comp -> parseComposite(comp, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    Collection<AttributeValue> parseComposite(final Composite composite, final @Nullable String parentFqKey) {
        List<AttributeValue> attributes = new ArrayList<>();
        String compFqKey = joinFqKey(parentFqKey, composite.getName(), null);
        for (CompositeItem item : composite.getCompositeItem()) {
            String itemFqKey = joinFqKey(compFqKey, "compositeItem", toItemId(null, extractSortInfo(item)));
            if (item.getModuleReference() != null) {
                attributes.addAll(parseModuleReference(item.getModuleReference(), itemFqKey));
            }
            if (item.getRepeatableGroup() != null) {
                attributes.addAll(parseRepeatableGroup(item.getRepeatableGroup(), itemFqKey));
            }
            if (item.getRepeatableGroupReference() != null) {
                attributes.addAll(parseRepeatableGroupReference(item.getRepeatableGroupReference(), itemFqKey));
            }
        }
        return attributes;
    }

    public static AttributeValue fromFormattedValue(final FormattedValue fValue, final String fqKey) {
        AttributeValue attr = new AttributeValue();
        attr.setDatatype(DataType.VARCHAR.value());
        attr.setLanguage(fValue.getLanguage());
        attr.setValue(normalizedValue(DataType.VARCHAR, fValue.getValue()));
        attr.setFqKey(fqKey);
        attr.setKey(toKey(fqKey));
        return attr;
    }

    private static @Nullable String normalizedValue(final DataType dataType, final @Nullable String value) {
        if (StringUtils.isBlank(value)) {
            return null;
        }
        if (dataType == DataType.LONG) {
            // we often have separators in the value like 9.565 instead of plain 9565
            return value.replace(".", "");
        }
        // no conversions known yet
        return value;
    }
}
