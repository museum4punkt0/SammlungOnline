package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public abstract class NormalizerBase<T> implements Normalizer<T> {

    protected final String attributeKey;

    protected NormalizerBase(final String key) {
        this.attributeKey = key;
    }

    @Override
    public String getAttributeKey() {
        return this.attributeKey;
    }

    protected static Optional<Data[]> primaryItem(final Data[] repeatableGroupItems) {
        // if there is an item with SortLnu=0, this is the one-and-only we should use
        Optional<Data> mainItem = Arrays.stream(repeatableGroupItems)
                .filter(item -> "0".equals(item.getAttribute(SORTING_FIELDNAME)))
                .findFirst();
        return mainItem.map(data -> new Data[]{data});
    }

    protected static @Nullable String getAttributeValue(final ObjectData source, final String attributeKey) {
        ObjectData.Attribute attribute = findAttribute(source, attributeKey);
        return attribute == null ? null : attribute.getValue();
    }

    protected static @Nullable ObjectData.Attribute findAttribute(final ObjectData source, final String attributeKey) {
        return source.getAttributes()
                .stream()
                .filter(attr -> attributeKey.equals(attr.getKey()))
                .findFirst()
                .orElse(null);
    }

    protected static Data[] findGroupItems(final ObjectData source, final String groupName) {

        // first find all attributes that are related to items in the group
        List<ObjectData.Attribute> group = source.getAttributes()
                .stream()
                .filter(attr -> relatesTo(attr, groupName))
                .collect(Collectors.toList());
        // in the group, there is at least one item so this can actually only be empty if the
        // given string given is not a repeatable group
        if (group.isEmpty()) {
            return new Data[0];
        }

        // now reverse-engineer all the items
        Map<String, Data> items = new LinkedHashMap<>();
        group.forEach(attr -> {
            String itemFqKey = toItemFqKey(attr.getFqKey());
            String itemAttrKey = toItemAttrKey(attr.getKey(), groupName);
            Data item = items.getOrDefault(itemFqKey, new Data());
            applyAttributeValue(item, itemAttrKey, attr.getValue());
            items.put(itemFqKey, item);
        });
        return sortedItems(items);
    }

    protected static Data[] sortedItems(final Map<String, Data> items) {

        // if items are sortable, do it
        boolean isSortable = items.values().stream().anyMatch(d -> d.hasAttribute(SORTING_FIELDNAME));
        boolean isSequence = items.keySet().stream().anyMatch(a -> a.contains("#"));
        if (isSortable) {
            return items.values().stream().sorted((a, b) -> {
                int sortA = a.hasAttribute(SORTING_FIELDNAME)
                        ? Integer.parseInt(Objects.requireNonNull(a.getTypedAttribute(SORTING_FIELDNAME)))
                        : Integer.MAX_VALUE;
                int sortB = b.hasAttribute(SORTING_FIELDNAME)
                        ? Integer.parseInt(Objects.requireNonNull(b.getTypedAttribute(SORTING_FIELDNAME)))
                        : Integer.MAX_VALUE;
                return sortA - sortB;
            }).toArray(Data[]::new);
        } else if (isSequence) {
            return items.entrySet().stream().sorted((a, b) -> {
                String keyA = a.getKey();
                String keyB = b.getKey();
                int sortA = Integer.parseInt(StringUtils.substringBetween(keyA, "#", "]"));
                int sortB = Integer.parseInt(StringUtils.substringBetween(keyB, "#", "]"));
                return sortA - sortB;
            }).map(Map.Entry::getValue).toArray(Data[]::new);
        }
        return items.values().toArray(new Data[0]);
    }

    protected static String toItemFqKey(final String attrFqKey) {
        int ordinalDot = attrFqKey.contains(".compositeItem[")
                // fqKey format: obj . composite . item . group . item . attribute [whatever including dots]
                // hence we are looking for the 5th dot in the fq-key
                ? 5
                // fqKey format: obj . group . item . attribute [whatever including dots]
                // hence we are looking for the 3rd dot in the fq-key
                : 3;
        int idx = StringUtils.ordinalIndexOf(attrFqKey, ".", ordinalDot);
        // if we can't find the correct amount of dots, the attr itself represents an item
        return idx == -1 ? attrFqKey : attrFqKey.substring(0, idx);
    }

    protected static String toItemAttrKey(final String attrKey, final String groupName) {
        return attrKey.startsWith(groupName + ".") ? attrKey.substring(groupName.length() + 1) : attrKey;
    }

    protected static boolean relatesTo(final ObjectData.Attribute attr, final String key) {
        return attr.getKey().equals(key) || attr.getKey().startsWith(key + ".");
    }

    @SuppressWarnings("unchecked")
    protected static boolean hasTypeVoc(final Data item, final String value) {
        Object typeVoc = item.getAttribute("TypeVoc");
        if (typeVoc instanceof Collection) {
            return ((Collection<String>) typeVoc).contains(value);
        }
        if (typeVoc instanceof String[]) {
            return ArrayUtils.contains((String[]) typeVoc, value);
        }
        if (typeVoc instanceof String) {
            return value.equals(typeVoc);
        }
        return false;
    }

    protected static boolean hasAttributeValue(final Data item, final String key) {
        Object value = item.getAttribute(key);
        return value != null && !"".equals(value);
    }

    @SuppressWarnings("unchecked")
    protected static <T> void applyAttributeValue(final Data target, final String key, final @Nullable T value) {
        if (value == null) {
            return;
        }

        // set or add value
        if (target.hasAttribute(key)) {
            // we have added at least one value for the key already,
            // so we have to make it a multi-valued attribute by converting values
            // into a list
            Object oldValue = target.getAttribute(key);
            if (oldValue instanceof List) {
                ((List<T>) oldValue).add(value);
            } else {
                List<T> list = new ArrayList<>();
                list.add((T) oldValue);
                list.add(value);
                target.setAttribute(key, list);
            }
        } else {
            // set the atomic value
            target.setAttribute(key, value);
        }
    }
}
