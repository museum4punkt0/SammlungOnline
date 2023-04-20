package de.smbonline.mdssync.util;

import org.springframework.lang.Nullable;
import org.springframework.util.StringUtils;

import java.time.LocalDate;

public final class Conversions {

    public static int toInteger(final @Nullable Object obj) {
        if (obj instanceof Number) {
            return ((Number) obj).intValue();
        }
        if (obj instanceof Boolean) {
            return (boolean) obj ? 1 : 0;
        }
        if (obj instanceof String) {
            return Integer.parseInt((String) obj);
        }
        return -1;
    }

    public static boolean toBoolean(final @Nullable Object obj) {
        if (obj == null) {
            return false;
        }
        if (obj instanceof Boolean) {
            return (boolean) obj;
        }
        if (obj instanceof Number) {
            return ((Number) obj).intValue() > 0;
        }
        if (obj instanceof Character) {
            return switch (Character.toLowerCase((char) obj)) {
                case 'x', 'y', '1' -> true;
                default -> false;
            };
        }
        if (obj instanceof String) {
            return switch (((String) obj).toLowerCase()) {
                case "x", "y", "1", "on", "true", "active", "enabled", "yes" -> true;
                default -> false;
            };
        }
        return false;
    }

    public static @Nullable LocalDate toDate(final @Nullable String string) {
        if (!StringUtils.hasText(string)) {
            return null;
        }
        try {
            return LocalDate.parse(string);
        } catch (Exception exc) {
            return null;
        }
    }

    private Conversions() {
        // no instances
    }
}
