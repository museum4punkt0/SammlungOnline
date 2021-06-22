package de.smbonline.mdssync.util;

import org.springframework.lang.Nullable;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

// Initial version copied from com.xailabs.common.Find 2020-10-09

/**
 * Utility methods for finding and filtering elements from collections. Note that the implementation
 * requires streamable collections (Java 8) to function properly.
 *
 * @author remo.zellmer
 */
public final class Lookup {

    /**
     * Filter the given array and returns first element matching the given predicate. Returns
     * <code>null</code> if no such element exists or the given array is <code>null</code>.
     *
     * @param array  array to filter
     * @param filter filter predicate
     * @param <T>    the type of elements that should be filtered
     * @return first element in the given array matching the given predicate
     */
    public static @Nullable <T> T findFirst(final @Nullable T[] array, final Predicate<T> filter) {
        return array == null ? null : findFirst(Arrays.asList(array), filter);
    }

    /**
     * Filter the given collection and returns first element matching the given predicate. Returns
     * <code>null</code> if no such element exists or the given collection is <code>null</code>.
     *
     * @param collection collection to filter
     * @param filter     filter predicate
     * @param <T>        the type of elements that should be filtered
     * @return first element in the given collection matching the given predicate
     */
    public static @Nullable <T> T findFirst(final @Nullable Collection<T> collection, final Predicate<T> filter) {
        return collection == null ? null : collection.stream().filter(filter).findFirst().orElse(null);
    }

    /**
     * Filter the given array and returns a random element matching the given predicate. Returns
     * <code>null</code> if no such element exists or the given array is <code>null</code>.
     *
     * @param array  array to filter
     * @param filter filter predicate
     * @param <T>    the type of elements that should be filtered
     * @return any element in the given array matching the given predicate
     */
    public static @Nullable <T> T findOne(final @Nullable T[] array, final Predicate<T> filter) {
        return array == null ? null : findOne(Arrays.asList(array), filter);
    }

    /**
     * Filter the given collection and returns a random element matching the given predicate.
     * Returns <code>null</code> if no such element exists or the given collection is
     * <code>null</code>.
     *
     * @param collection collection to filter
     * @param filter     filter predicate
     * @param <T>        the type of elements that should be filtered
     * @return any element in the given collection matching the given predicate
     */
    public static @Nullable <T> T findOne(final @Nullable Collection<T> collection, final Predicate<T> filter) {
        return collection == null ? null : collection.parallelStream().filter(filter).findAny().orElse(null);
    }

    /**
     * Filter the given list and return all elements matching the given predicate. Returns an empty
     * list if no such element exists or the given list is <code>null</code>.
     *
     * @param list   list to filter
     * @param filter filter predicate
     * @param <T>    the type of elements that should be filtered
     * @return all elements in the given list matching the given predicate
     */
    public static <T> List<T> findAll(final @Nullable List<T> list, final Predicate<T> filter) {
        if (list == null || list.isEmpty()) {
            return Collections.emptyList();
        }
        return list.stream().filter(filter).collect(Collectors.toList());
    }

    /**
     * Returns all elements in the given array that match the given filter. Returns an empty array
     * if no matching element is found. Note: This returns {@code null} if given array is
     * {@code null} as it is just not possible to create a new typed array instance in such case.
     *
     * @param <T>    type of array elements
     * @param array  array to search through
     * @param filter filter to apply
     * @return filter matches
     */
    @SuppressWarnings("unchecked")
    public static @Nullable <T> T[] findAll(final @Nullable T[] array, final Predicate<T> filter) {
        if (array == null) {
            return null;
        }
        Collection<T> filtered = findAll(Arrays.asList(array), filter);
        return filtered.toArray((T[]) Array.newInstance(array.getClass().getComponentType(), filtered.size()));
    }

    private Lookup() {
        // don't instantiate
    }
}
