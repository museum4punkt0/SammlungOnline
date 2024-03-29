package de.smbonline.mdssync.util;

import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupReference;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReference;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import org.springframework.lang.Nullable;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Stream;

/**
 * Utility methods for finding and filtering elements from collections.
 */
public final class Lookup {

    public static Throwable findRootCause(final Throwable throwable) {
        Throwable cause = throwable;
        while (cause.getCause() != null) {
            cause = cause.getCause();
        }
        return cause;
    }

    // -- specifics --

    public static @Nullable DataField findDataField(final Collection<DataField> fields, final String name) {
        return findOne(fields, field -> name.equals(field.getName()));
    }

    public static @Nullable VirtualField findVrtField(final Collection<VirtualField> fields, final String name) {
        return findOne(fields, field -> name.equals(field.getName()));
    }

    public static @Nullable SystemField findSysField(final Collection<SystemField> fields, final String name) {
        return findOne(fields, field -> name.equals(field.getName()));
    }

    public static @Nullable RepeatableGroup findGroup(final Collection<RepeatableGroup> groups, final String name) {
        return findOne(groups, group -> name.equals(group.getName()));
    }

    /**
     * Find an RepeatableGroupItem which is qualified by given vocabulary information, e.g. TypeVoc=Geburtsort
     *
     * @param items       item to search through
     * @param vocName     name of VocabularyReference
     * @param vocItemName name of VocabularyReferenceItem (=value of VocabularyReference)
     * @return RepeatableGroupItem if found
     */
    public static @Nullable RepeatableGroupItem findGroupItem(
            final Collection<RepeatableGroupItem> items, final String vocName, final String vocItemName) {
        for (RepeatableGroupItem item : items) {
            VocabularyReferenceItem voc = findVocRefItem(item.getVocabularyReference(), vocName, vocItemName);
            if (voc != null) {
                return item;
            }
        }
        return null;
    }

    public static @Nullable RepeatableGroupReference findGroupRef(
            final Collection<RepeatableGroupReference> refs, final String name) {
        return findFirst(refs, ref -> name.equals(ref.getName()));
    }

    public static @Nullable ModuleReference findModuleRef(final Collection<ModuleReference> refs, final String name) {
        return findFirst(refs, ref -> name.equals(ref.getName()));
    }

    public static @Nullable ModuleReferenceItem findModuleRefItem(final Collection<ModuleReferenceItem> items, final Long id) {
        return findFirst(items, item -> id.equals(item.getModuleItemId()));
    }

    /**
     * Find VocabularyReference by name.
     *
     * @param refs references
     * @param name name
     * @return VocabularyReference with given name
     */
    public static @Nullable VocabularyReference findVocRef(
            final Collection<VocabularyReference> refs, final String name) {
        return findFirst(refs, ref -> name.equals(ref.getName()));
    }

    public static @Nullable VocabularyReferenceItem findVocRefItem(
            final Collection<VocabularyReference> refs, final String vocName) {
        return findVocRefItem(refs, vocName, null);
    }

    public static @Nullable VocabularyReferenceItem findVocRefItem(
            final Collection<VocabularyReference> refs, final String vocName, @Nullable final String vocItemName) {

        Stream<VocabularyReferenceItem> items = refs.stream()
                .filter(ref -> vocName.equals(ref.getName()))
                .map(VocabularyReference::getVocabularyReferenceItem)
                .filter(Objects::nonNull);
        Optional<VocabularyReferenceItem> item = vocItemName == null
                ? items.findFirst()
                : items.filter(ref -> vocItemName.equals(ref.getName())).findFirst();
        return item.orElse(null);
    }

    // -- generics --

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
    public static <T> Collection<T> findAll(final @Nullable Collection<T> list, final Predicate<T> filter) {
        if (list == null || list.isEmpty()) {
            return Collections.emptyList();
        }
        return list.stream().filter(filter).toList();
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
