package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public abstract class NormalizerBase<T> implements Normalizer<T> {

    public static final String ITEM_ID = "id";

    protected final String attributeKey;

    protected NormalizerBase(final String key) {
        this.attributeKey = key;
    }

    @Override
    public String getAttributeKey() {
        return this.attributeKey;
    }

    public static Optional<Data[]> primaryItems(final Data[] repeatableGroupItems) {
        // if there is one (or more) items with SortLnu=0, these are the only items we should use
        Data[] mainItems = Arrays.stream(repeatableGroupItems)
                .filter(item -> hasAttributeValue(item, SORTING_FIELDNAME, "0"))
                .toArray(Data[]::new);
        return mainItems.length == 0 ? Optional.empty() : Optional.of(mainItems);
    }

    public static @Nullable String getAttributeValue(final ObjectData source, final String attributeKey) {
        ObjectData.Attribute attribute = findAttribute(source, attributeKey);
        return attribute == null ? null : attribute.getValue();
    }

    public static @Nullable ObjectData.Attribute findAttribute(final ObjectData source, final String attributeKey) {
        return source.getAttributes()
                .stream()
                .filter(attr -> attributeKey.equals(attr.getKey()))
                .findFirst()
                .orElse(null);
    }

    public static Data[] findGroupItems(final ObjectData source, final String groupName) {
        return findGroupItems(source, groupName, NormalizerBase::defaultSorting);
    }

    public static Data[] findGroupItems(
            final ObjectData source,
            final String groupName,
            final ItemSort sorting) {
        return findGroupItems(source.getAttributes(), groupName, sorting);
    }

    public static Data[] findGroupItems(
            final List<ObjectData.Attribute> attributes,
            final String groupName,
            final ItemSort sorting) {

        // first find all attributes that are related to items in the group
        List<ObjectData.Attribute> group = attributes
                .stream()
                .filter(attr -> relatesTo(attr, groupName))
                .toList();
        // in the group, there is at least one item so this can actually only be empty if the
        // given string is not a repeatable group
        if (group.isEmpty()) {
            return new Data[0];
        }

        // now reverse-engineer all the items
        // sort by fq-key to make sure, parent keys are always used before child keys
        Map<String, Data> items = new LinkedHashMap<>();
        group.stream().sorted(Comparator.comparing(ObjectData.Attribute::getFqKey)).forEach(attr -> {
            String itemFqKey = toItemFqKey(attr.getFqKey());
            String itemAttrKey = toItemAttrKey(attr.getFqKey(), itemFqKey);
            Data item = items.computeIfAbsent(itemFqKey, key -> new Data().setNonNullAttribute(ITEM_ID, extractId(key)));
            applyAttributeValue(item, itemAttrKey, attr.getValue());
        });

        // now apply default filters if applicable
        boolean defaultFilterRuleApplies = items.values().stream().anyMatch(d -> d.hasAttribute(SORTING_FIELDNAME));
        if (defaultFilterRuleApplies) {
            // Rule is: If SortLnu applies to the group, all items that don't have SortLnu should be hidden
            for (Iterator<Map.Entry<String, Data>> it = items.entrySet().iterator(); it.hasNext(); ) {
                Data item = it.next().getValue();
                if (!hasAttributeValue(item, SORTING_FIELDNAME)) {
                    it.remove();
                }
            }
        }

        // return sorted
        return sorting.apply(items);
    }

    protected static Data[] defaultSorting(final Map<String, Data> items) {

        // sort by sorting attribute
        boolean isSortable = items.values().stream().anyMatch(d -> d.hasAttribute(SORTING_FIELDNAME));
        if (isSortable) {
            return sortByAttribute(items.values().toArray(Data[]::new), SORTING_FIELDNAME);
        }

        // sort by sequence number
        boolean isSequence = items.keySet().stream().anyMatch(a -> a.contains("#"));
        if (isSequence) {
            return items.entrySet().stream().sorted((a, b) -> {
                String keyA = a.getKey();
                String keyB = b.getKey();
                int sortA = Integer.parseInt(StringUtils.substringBetween(keyA, "#", "]"));
                int sortB = Integer.parseInt(StringUtils.substringBetween(keyB, "#", "]"));
                return sortA - sortB;
            }).map(Map.Entry::getValue).toArray(Data[]::new);
        }

        // no sorting
        return items.values().toArray(new Data[0]);
    }

    public static Data[] sortByAttribute(final Data[] items, final String attribute) {
        return Arrays.stream(items).sorted((a, b) -> {
            String strA = StringUtils.defaultIfBlank(a.getTypedAttribute(attribute), null);
            int sortA = Optional.ofNullable(strA).map(Integer::parseInt).orElse(Integer.MAX_VALUE);
            String strB = StringUtils.defaultIfBlank(b.getTypedAttribute(attribute), null);
            int sortB = Optional.ofNullable(strB).map(Integer::parseInt).orElse(Integer.MAX_VALUE);
            return sortA - sortB;
        }).toArray(Data[]::new);
    }

    protected static String toItemFqKey(final String attrFqKey) {
        int ordinalDot = attrFqKey.contains(".compositeItem[")
                // fqKey format: [id] . composite . item[id] . group . item[id] . attribute (+whatever including dots)
                // hence we are looking for the 5th dot in the fq-key
                ? 5
                // fqKey format: [id] . group . item[id] . attribute (+whatever including dots)
                // hence we are looking for the 3rd dot in the fq-key
                : 3;
        int idx = StringUtils.ordinalIndexOf(attrFqKey, ".", ordinalDot);
        // if we can't find the correct amount of dots, the attr itself represents an item
        return idx == -1 ? attrFqKey : attrFqKey.substring(0, idx);
    }

    protected static String toItemAttrKey(final String attrFqKey, final String itemFqKey) {
        return attrFqKey.startsWith(itemFqKey + ".") ? attrFqKey.substring(itemFqKey.length() + 1) : VIRTUAL_ATTRIBUTE_NAME;
    }

    protected static @Nullable Long extractId(final String itemFqKey) {
        Matcher matcher = Pattern.compile(".*[Ii]tem\\[(?<idAndSeq>.+)\\]$").matcher(itemFqKey);
        if (matcher.matches()) {
            String[] idAndSeq = matcher.group("idAndSeq").split("#");
            String id = idAndSeq[0];
            // for composite items, we don't have actual ids - hence we use the sequence
            if (StringUtils.isEmpty(id) && idAndSeq.length > 1) {
                id = idAndSeq[1];
            }
            return "".equals(id) ? null : Long.valueOf(id);
        }
        return null;
    }

    protected static boolean relatesTo(final ObjectData.Attribute attr, final String key) {
        return attr.getKey().equals(key) || attr.getKey().startsWith(key + ".");
    }

    public static boolean hasTypeVoc(final Data item, final String value) {
        return hasAttributeValue(item, "TypeVoc", value);
    }

    public static boolean hasAttributeValue(final Data item, final String key, final Object value) {
        Object attrValue = key.endsWith("Voc") ? ValueExtractor.extractVoc(item, key) : item.getAttribute(key);
        if (attrValue instanceof List) {
            return ((List<?>) attrValue).contains(value);
        }
        if (attrValue instanceof Object[]) {
            return ArrayUtils.contains((Object[]) attrValue, value);
        }
        if (value.getClass().isInstance(attrValue)) {
            return value.equals(attrValue);
        }
        return false;
    }

    public static boolean hasAttributeValue(final Data item, final String key) {
        Object value = item.getAttribute(key);
        if (value == null) {
            return false;
        }
        String string = value.toString();
        return switch (string.toUpperCase().trim()) {
            // blank string, empty object, empty list/array, 'null' string
            case "", "{}", "[]", "NULL" -> false;
            default -> true;
        };
    }

    protected static void applyAttributeValue(final Data target, final String key, final @Nullable String value) {
        if (value == null) {
            return;
        }

        Data parent = target;
        String nextKey = key;

        // build nested structure - TODO refactor this weird algorithm
        for (int dot = key.indexOf('.'), i = 0; dot > -1; dot = key.indexOf('.', i)) {
            nextKey = key.substring(i, dot);

            // flatten vocabulary-reference
            if (nextKey.matches("(.+Voc)\\[\\d+\\]$")) {
                nextKey = nextKey.substring(0, nextKey.indexOf('['));
                if (key.matches(".+voc.*Ref.*Item\\[\\d+\\]\\..+")) {
                    Object voc = parent.getAttribute(nextKey);
                    if (!(voc instanceof Data)) {
                        voc = new Data().setNonNullAttribute(VIRTUAL_ATTRIBUTE_NAME, voc);
                        parent.setAttribute(nextKey, voc);
                    }
                    parent = (Data) voc;
                    nextKey = StringUtils.substringAfterLast(key, '.');
                }
                break;
            }

            // items are aggregated into a list
            else if (nextKey.matches(".*[Ii]tem\\[\\d+(#\\d+)?\\]$")) {
                String id = StringUtils.substringBetween(nextKey, "[", "]");
                nextKey = NESTED_ITEMS_ATTRIBUTE_NAME;
                Data data = findNestedDataById(parent, nextKey, id);
                if (data == null) {
                    data = new Data().setNonNullAttribute(ITEM_ID, id);
                    upsertAttributeValue(parent, nextKey, data);
                }
                parent = data;
            }

            // just get-or-add the child node
            else {
                Object existing = parent.getAttribute(nextKey);
                if (existing == null) {
                    Data data = new Data();
                    upsertAttributeValue(parent, nextKey, data);
                    parent = data;
                } else {
                    parent = (Data) existing;
                }
            }
            i = dot + 1;
            nextKey = key.substring(i);
        }
        // TODO fix this special case (used for TypeDimRef by DimensionsAndWeightNormalizer)
        // apply actual attribute value
        if (nextKey.matches(".*[Ii]tem\\[\\d+(#\\d+)?\\]$")) {
            nextKey = "item";
        }

        upsertAttributeValue(parent, nextKey, value);
    }

    @SuppressWarnings("unchecked")
    private static <T> void upsertAttributeValue(final Data target, final String key, final T value) {
        // add or set value
        if (target.hasAttribute(key)) {
            // we have added at least one value for the key already,
            // so we have to make it a multivalued attribute by converting values into a list
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
            // set the new value, as child or list item
            boolean isList = NESTED_ITEMS_ATTRIBUTE_NAME.equals(key);
            Object attrValue = isList ? new ArrayList<>(Collections.singletonList(value)) : value;
            target.setAttribute(key, attrValue);
        }
    }

    @SuppressWarnings("unchecked")
    private static @Nullable Data findNestedDataById(final Data parent, final String key, final String itemId) {
        Object child = parent.getAttribute(key);
        if (child == null) {
            return null;
        }
        if (child instanceof List) {
            return ((List<Data>) child).stream()
                    .filter(item -> itemId.equals(item.getAttribute(ITEM_ID)))
                    .findFirst()
                    .orElse(null);
        }
        if (child instanceof Data item) {
            return itemId.equals(item.getAttribute(ITEM_ID)) ? item : null;
        }
        return null;
    }
}
