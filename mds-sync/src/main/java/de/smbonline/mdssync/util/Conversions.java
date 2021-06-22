package de.smbonline.mdssync.util;

import org.springframework.lang.Nullable;

public final class Conversions {

    public static int toInteger(final @Nullable Object obj) {
        if (obj == null) {
            return 0;
        }
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
            switch (Character.toLowerCase((char) obj)) {
                case 'x':
                case 'y':
                case '1':
                    return true;
                default:
                    return false;
            }
        }
        if (obj instanceof String) {
            switch (((String) obj).toLowerCase()) {
                case "x":
                case "y":
                case "1":
                case "on":
                case "true":
                case "active":
                case "enabled":
                case "yes":
                    return true;
                default:
                    return false;
            }
        }
        return false;
    }

    private Conversions() {
        // no instances
    }
}
