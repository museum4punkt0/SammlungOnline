package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public abstract class FirstHitSortedNormalizer<T> extends NormalizerBase<T> {

    protected final String repeatableGroup;

    protected FirstHitSortedNormalizer(final String attributeKey, final String repeatableGroup) {
        super(attributeKey);
        this.repeatableGroup = repeatableGroup;
    }

    @Override
    public T resolveAttributeValue(final ObjectData source) {
        Data data = findFirstGroupItem(source);
        return data == null ? null : pickValue(data);
    }

    private @Nullable Data findFirstGroupItem(final ObjectData source) {

        // first find all attributes that are related to items in the group
        List<ObjectData.Attribute> group = source.getAttributes()
                .stream()
                .filter(attr -> relatesTo(attr, this.repeatableGroup))
                .filter(attr -> StringUtils.isNotBlank(attr.getValue()))
                .collect(Collectors.toList());
        // in the group, there is at least one item so this can actually only be null if the
        // string given in the constructor is not a repeatable group - or all attributes have no value
        if (group.isEmpty()) {
            return null;
        }

        // now find the minimum SortLnu, or just pick the first attribute if there is no sorting info
        String itemAttributeFqKey = group
                .stream()
                .filter(a -> a.getKey().endsWith("." + SORTING_FIELDNAME))
                .min(Comparator.comparingInt(attr -> {
                    Optional<String> sort = Optional.ofNullable(StringUtils.defaultIfBlank(attr.getValue(), null));
                    return sort.map(Integer::parseInt).orElse(Integer.MAX_VALUE);
                }))
                .orElseGet(() -> group.get(0))
                .getFqKey();
        // from the found attribute, extract the prefix that is the common prefix for all attributes of the respective item
        String itemFqKey = toItemFqKey(itemAttributeFqKey);

        // now we can reverse-engineer the item
        Data item = new Data();
        group.stream().filter(a -> a.getFqKey().startsWith(itemFqKey)).forEach(a -> {
            // strip-off the repeatable group with dot, we only want the actual item's attribute key
            String itemAttribute = a.getKey().substring(this.repeatableGroup.length() + 1);
            applyAttributeValue(item, itemAttribute, a.getValue());
        });
        return item;
    }

    protected abstract T pickValue(final Data repeatableGroupItem);
}
