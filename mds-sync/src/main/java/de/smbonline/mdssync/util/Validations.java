package de.smbonline.mdssync.util;

import de.smbonline.mdssync.exc.ValidationException;
import org.springframework.lang.Nullable;

import java.time.OffsetDateTime;

/**
 * Utility class for validations.
 * {@code ensureXXX} methods throw {@link ValidationException} if validation fails.
 * {@code requireXXX} methods throw {@link ValidationException} if validation fails, otherwise return the valid object.
 * {@code isXXX} return false if validation fails, otherwise return true.
 */
public final class Validations {

    /**
     * Ensures given lower-bound is less than given upper-bound. Throws exception if not.
     *
     * @param lower requested lower bound
     * @param upper requested upper bound
     * @throws ValidationException if lower is not less than upper
     */
    public static void ensureLowerLessThanUpper(final Number lower, final Number upper) {
        if (lower.doubleValue() >= upper.doubleValue()) {
            throw new ValidationException("start must be before end");
        }
    }

    /**
     * Ensures given start time is before given end time. Throws exception if not.
     *
     * @param start requested start time
     * @param end   requested end time
     * @throws ValidationException if start is not before end
     */
    public static void ensureStartBeforeEnd(final OffsetDateTime start, final OffsetDateTime end) {
        if (!start.isBefore(end)) {
            throw new ValidationException("start must be before end");
        }
    }

    /**
     * Ensures length of given array is like requested. Throws exception if not.
     *
     * @param length (non-negative) requested array length
     * @param array  array to check
     * @param <T>    type of array elements
     * @return given array if length is ok
     * @throws ValidationException if array length is not ok
     */
    public static <T> T[] requireArrayLength(final int length, final T[] array) {
        if (array.length != length) {
            throw new ValidationException("array length mismatch (" + length + " != " + array.length + ")");
        }
        return array;
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
