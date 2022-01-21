package de.smbonline.mdssync.exec.parser;

import de.smbonline.mdssync.dto.AttributeDTO;
import de.smbonline.mdssync.dto.MdsObject;
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
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReference;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import static de.smbonline.mdssync.exec.parser.ParserUtils.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

public abstract class ModuleItemParser<T extends MdsObject> {

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

    protected abstract T newDto(final Long id);

    public T parseModuleItem(final ModuleItem moduleItem) {
        T obj = newDto(moduleItem.getId());
        String itemFqKey = String.format("[%d]", moduleItem.getId());

        List<AttributeDTO> attributes = new ArrayList<>();

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

    private List<AttributeDTO> applyIndexingRules(final List<AttributeDTO> allAttributes) {
        List<AttributeDTO> allowedAttributes = new ArrayList<>(allAttributes);
        allowedAttributes.removeIf(attr -> checkForbidden(attr, allAttributes));
        return allowedAttributes;
    }

    private boolean checkForbidden(final AttributeDTO attr, final List<AttributeDTO> all) {
        // lightweight checks first, rule-set check only if necessary
        if (isBlacklisted(attr) || isPointless(attr) || isIgnored(attr)) {
            return true;
        }
        // FIXME rule-set check
        return false;
    }

    private boolean isBlacklisted(final AttributeDTO attr) {
        String value = attr.getValue();
        if (value == null && this.blacklistValues.contains(null)) {
            return true;
        }
        return value != null && this.blacklistValues.stream().anyMatch(value::equalsIgnoreCase);
    }

    private boolean isIgnored(final AttributeDTO attr) {
        return this.ignorableKeys.stream().anyMatch(ik -> {
            if (ik.charAt(ik.length() - 1) == '*') {
                // hierarchical
                String key = ik.substring(0, ik.length() - 1);
                return attr.getKey().startsWith(key);
            }
            return attr.getKey().equals(ik);
        });
    }

    private boolean isPointless(final AttributeDTO attr) {
        return this.skipEmptyValues && StringUtils.isBlank(attr.getValue());
    }

    private Collection<AttributeDTO> parseDataFields(
            final Supplier<List<? extends DataField>> supplier,
            final @Nullable String parentFqKey) {
        return supplier.get()
                .stream()
                .map(f -> parseDataField(f, parentFqKey))
                .collect(Collectors.toList());
    }

    AttributeDTO parseDataField(final DataField field, final @Nullable String parentFqKey) {
        FormattedValue fValue = field.getFormattedValue();
        String fqKey = joinFqKey(parentFqKey, field.getName(), null);
        DataType dataType = field.getDataType() != null ? field.getDataType() : DataType.VARCHAR;

        AttributeDTO attr = new AttributeDTO();
        attr.setDatatype(dataType.value());
        attr.setLanguage(fValue != null ? fValue.getLanguage() : this.language);
        attr.setValue(normalizedValue(dataType, extractValue(field)));
        attr.setFqKey(fqKey);
        attr.setKey(toKey(fqKey));
        return attr;
    }

    private Collection<AttributeDTO> parseVirtualFields(
            final Supplier<List<? extends VirtualField>> supplier,
            final @Nullable String parentFqKey) {
        return supplier.get()
                .stream()
                .map(f -> parseVirtualField(f, parentFqKey))
                .collect(Collectors.toList());
    }

    AttributeDTO parseVirtualField(final VirtualField field, final @Nullable String parentFqKey) {
        String fqKey = joinFqKey(parentFqKey, field.getName(), null);

        AttributeDTO attr = new AttributeDTO();
        attr.setDatatype(DataType.VARCHAR.value());
        attr.setLanguage(this.language);
        attr.setValue(normalizedValue(DataType.VARCHAR, extractValue(field)));
        attr.setFqKey(fqKey);
        attr.setKey(toKey(fqKey));
        return attr;
    }

    private Collection<AttributeDTO> parseVocabularyReferences(
            final Supplier<List<? extends VocabularyReference>> supplier,
            final @Nullable String parentFqKey) {
        return supplier.get()
                .stream()
                .map(voc -> parseVocabularyReference(voc, parentFqKey))
                .collect(Collectors.toList());
    }

    AttributeDTO parseVocabularyReference(final VocabularyReference voc, final @Nullable String parentFqKey) {
        VocabularyReferenceItem item = voc.getVocabularyReferenceItem();
        FormattedValue fValue = item.getFormattedValue();

        String refFqKey = joinFqKey(parentFqKey, voc.getName(), voc.getId());
        String itemFqKey = joinFqKey(refFqKey, "vocabularyReferenceItem", item.getId());

        AttributeDTO attr = new AttributeDTO();
        attr.setDatatype(DataType.VARCHAR.value());
        attr.setLanguage(fValue != null ? fValue.getLanguage() : this.language);
        attr.setValue(normalizedValue(DataType.VARCHAR, extractValue(item)));
        attr.setFqKey(itemFqKey);
        attr.setKey(toKey(itemFqKey));
        return attr;
    }

    private Collection<AttributeDTO> parseModuleReferences(
            final Supplier<List<? extends ModuleReference>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeDTO> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(module -> parseModuleReference(module, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    List<AttributeDTO> parseModuleReference(final ModuleReference mod, final @Nullable String parentFqKey) {
        List<AttributeDTO> attributes = new ArrayList<>();
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

    private Collection<AttributeDTO> parseRepeatableGroups(
            final Supplier<List<? extends RepeatableGroup>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeDTO> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(group -> parseRepeatableGroup(group, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    List<AttributeDTO> parseRepeatableGroup(
            final RepeatableGroup group,
            final @Nullable String parentFqKey) {

        List<AttributeDTO> attributes = new ArrayList<>();
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

    private Collection<AttributeDTO> parseRepeatableGroupReferences(
            final Supplier<List<? extends RepeatableGroupReference>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeDTO> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(group -> parseRepeatableGroupReference(group, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    List<AttributeDTO> parseRepeatableGroupReference(final RepeatableGroupReference group, final @Nullable String parentFqKey) {
        List<AttributeDTO> attributes = new ArrayList<>();
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

    private Collection<AttributeDTO> parseComposites(
            final Supplier<List<? extends Composite>> supplier,
            final @Nullable String parentFqKey) {

        List<AttributeDTO> attributes = new ArrayList<>();
        supplier.get()
                .stream()
                .map(comp -> parseComposite(comp, parentFqKey))
                .forEach(attributes::addAll);
        return attributes;
    }

    Collection<AttributeDTO> parseComposite(final Composite composite, final @Nullable String parentFqKey) {
        List<AttributeDTO> attributes = new ArrayList<>();
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

    public static AttributeDTO fromFormattedValue(final FormattedValue fValue, final String fqKey) {
        AttributeDTO attr = new AttributeDTO();
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
