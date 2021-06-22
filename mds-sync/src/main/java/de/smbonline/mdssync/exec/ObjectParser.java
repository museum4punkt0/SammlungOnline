package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dto.AttributeDTO;
import de.smbonline.mdssync.dto.ObjectDTO;
import de.smbonline.mdssync.search.response.Composite;
import de.smbonline.mdssync.search.response.CompositeItem;
import de.smbonline.mdssync.search.response.DataField;
import de.smbonline.mdssync.search.response.DataType;
import de.smbonline.mdssync.search.response.FormattedValue;
import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.ModuleReference;
import de.smbonline.mdssync.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.search.response.RepeatableGroup;
import de.smbonline.mdssync.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.search.response.RepeatableGroupReference;
import de.smbonline.mdssync.search.response.RepeatableGroupReferenceItem;
import de.smbonline.mdssync.search.response.VirtualField;
import de.smbonline.mdssync.search.response.VocabularyReference;
import de.smbonline.mdssync.search.response.VocabularyReferenceItem;
import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class ObjectParser {

    private final String language;
    private boolean skipEmptyValues = false;
    private final List<String> blacklistValues = new ArrayList<>();
    private final List<String> ignorableKeys = new ArrayList<>();

    public ObjectParser(final String language) {
        this.language = language;
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

    private ObjectDTO newObjectDto(final Long id) {
        ObjectDTO dto = new ObjectDTO(id);
        dto.setLanguage(this.language);
        return dto;
    }

    public ObjectDTO parseModuleItem(final ModuleItem moduleItem) {
        ObjectDTO obj = newObjectDto(moduleItem.getId());
        String itemFqKey = String.format("[%d]", moduleItem.getId());

        ArrayList<AttributeDTO> attributes = new ArrayList<>();

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

        if (this.skipEmptyValues) {
            attributes.removeIf(a -> !StringUtils.hasText(a.getValue()));
        }
        if (!this.blacklistValues.isEmpty()) {
            attributes.removeIf(this::isBlacklisted);
        }
        if (!this.ignorableKeys.isEmpty()) {
            attributes.removeIf(this::isIgnored);
        }

        obj.setAttributes(attributes);

        return obj;
    }

    private boolean isBlacklisted(final AttributeDTO attr) {
        String value = attr.getValue();
        if (value == null && this.blacklistValues.contains(null)) {
            return true;
        }
        return value !=null && this.blacklistValues.stream().anyMatch(value::equalsIgnoreCase);
    }

    private boolean isIgnored(final AttributeDTO attr) {
        return this.ignorableKeys.stream().anyMatch(ik -> {
            if (ik.charAt(ik.length() - 1) == '*') {
                // hierarchical
                String key = ik.substring(ik.length() - 2);
                return attr.getKey().startsWith(key);
            }
            return attr.getKey().equals(ik);
        });
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

        AttributeDTO attr = new AttributeDTO();
        attr.setDatatype(field.getDataType() != null ? field.getDataType().value() : DataType.VARCHAR.value());
        attr.setLanguage(fValue != null ? fValue.getLanguage() : this.language);
        attr.setValue(fValue != null ? fValue.getValue() : field.getValue());
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
        attr.setValue(field.getValue());
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
        attr.setValue(fValue != null ? fValue.getValue() : item.getName());
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
            Object itemId = toItemId(ref.getModuleItemId(), ref.getSeqNo());
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
            Object itemId = toItemId(item.getId(), item.getSeqNo());
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
            Object itemId = toItemId(item.getRepeatableGroupItemId(), item.getSeqNo());
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
            String itemFqKey = joinFqKey(compFqKey, "compositeItem", toItemId(null, item.getSeqNo()));
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
        attr.setValue(fValue.getValue());
        attr.setFqKey(fqKey);
        attr.setKey(toKey(fqKey));
        return attr;
    }

    public static String joinFqKey(
            final @Nullable String parentFqKey,
            final @Nullable String childName,
            final @Nullable Object childId) {

        boolean hasParentKey = !StringUtils.isEmpty(parentFqKey);
        boolean hasChildName = !StringUtils.isEmpty(childName);
        boolean hasChildId = !StringUtils.isEmpty(childId);

        StringBuilder sb = new StringBuilder();
        if (hasParentKey) {
            sb.append(parentFqKey);
            if (hasChildName || hasChildId) {
                sb.append('.');
            }
        }
        if (hasChildName) {
            sb.append(childName);
        }
        if (hasChildId) {
            sb.append('[').append(childId).append(']');
        }
        return sb.toString();
    }

    public static String toKey(final String fqKey) {
        String withoutTypes = fqKey.replaceAll("\\.(compositeItem|moduleItem|repeatableGroupItem|repeatableGroupReferenceItem|vocabularyReferenceItem|moduleReferenceItem)\\[", ".[");
        String withoutIds = withoutTypes.replaceAll("\\.?\\[.*?\\]", "");
        return withoutIds.length() > 0 && withoutIds.charAt(0) == '.'
                ? withoutIds.substring(1) : withoutIds;
    }

    public static String toItemId(final @Nullable Long id, final @Nullable Long index) {
        StringBuilder sb = new StringBuilder();
        if (id != null) {
            sb.append(id);
        }
        if (index != null) {
            sb.append('#').append(index);
        }
        return sb.toString();
    }
}
