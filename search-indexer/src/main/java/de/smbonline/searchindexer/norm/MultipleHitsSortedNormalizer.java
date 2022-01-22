package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.springframework.lang.Nullable;

public abstract class MultipleHitsSortedNormalizer<T> extends NormalizerBase<T[]> {

    protected final String repeatableGroup;
    protected final ItemSort sorting;

    /**
     * Creates a new instance.
     * @param attributeKey target attribute name
     * @param repeatableGroup MDS repeatableGroup or moduleRef name
     */
    protected MultipleHitsSortedNormalizer(final String attributeKey, final String repeatableGroup) {
        this(attributeKey, repeatableGroup, NormalizerBase::defaultSorting);
    }

    /**
     * Creates a new instance.
     * @param attributeKey target attribute name
     * @param repeatableGroup MDS repeatableGroup or moduleRef name
     * @param sorting sorting function
     */
    protected MultipleHitsSortedNormalizer(final String attributeKey, final String repeatableGroup, final ItemSort sorting) {
        super(attributeKey);
        this.repeatableGroup = repeatableGroup;
        this.sorting = sorting;
    }

    @Override
    public @Nullable T[] resolveAttributeValue(final ObjectData source) {
        Data[] data = findGroupItems(source, this.repeatableGroup, this.sorting);
        data = applyFilter(data);
        return data.length == 0 ? null : pickValues(data);
    }

    /**
     * Method can be overridden to filter reverse-engineered repeatableGroup items. The result is passed to {@link #pickValues(Data[])}
     * Note: Usage of <i>primaryItem(repeatableGroupItems).orElse(...)</i> could be a common implementation.
     *
     * @param repeatableGroupItems reverse-engineered repeatableGroup items
     * @return filtered items
     */
    protected Data[] applyFilter(final Data[] repeatableGroupItems) {
        return repeatableGroupItems;
    }

    /**
     * Method to pick relevant values for the items.
     *
     * @param repeatableGroupItems reverse-engineered repeatableGroup items
     * @return relevant values
     */
    protected abstract T[] pickValues(final Data[] repeatableGroupItems);
}
