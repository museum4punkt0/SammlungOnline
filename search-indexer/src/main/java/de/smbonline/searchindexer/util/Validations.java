package de.smbonline.searchindexer.util;

import org.springframework.lang.Nullable;

/**
 * Utility class for validations.
 * {@code ensureXXX} methods throw Exception if validation fails.
 * {@code requireXXX} methods throw Exception if validation fails, otherwise return the valid object.
 * {@code isXXX} return false if validation fails, otherwise return true.
 */
public final class Validations {

    public static Long requireId(final Object any) {
        return any instanceof Number ? ((Number) any).longValue() : Long.parseLong(any.toString());
    }

    /**
     * Checks if a given varargs array has values.
     *
     * @param <T>   type of array elements
     * @param array array to check
     * @return true if elements contained
     */
    @SafeVarargs
    public static <T> boolean isVarArgsDefined(final @Nullable T... array) {
        // no args
        if (array == null || array.length == 0) {
            return false;
        }
        // mistakenly passed null object
        if (array.length == 1 && array[0] == null) {
            return false;
        }
        // ok, there is at least one element
        return true;
    }

    private Validations() {
        // no instances
    }
}
