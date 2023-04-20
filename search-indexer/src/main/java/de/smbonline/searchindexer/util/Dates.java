package de.smbonline.searchindexer.util;

import org.springframework.lang.Nullable;

import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class Dates {

    /**
     * "dd.MM.yyyy"
     */
    private static final Pattern REGULAR_DATE_PATTERN = Pattern.compile(
            "^\\s*(?<day>\\d{1,2})\\.(?<month>\\d{1,2})\\.(?<year>\\d{1,4})\\s*$");

    /**
     * "yyyy-MM-dd"
     */
    private static final Pattern ISO_DATE_PATTERN = Pattern.compile(
            "^\\s*(?<year>\\d{1,4})-(?<month>\\d{1,2})-(?<day>\\d{1,2})\\s*$");

    public static String formatDate(final String date, final String language) {
        Matcher matcher = ISO_DATE_PATTERN.matcher(date);
        if (matcher.matches()) {
            int year = Integer.parseInt(matcher.group("year"));
            int month = Integer.parseInt(matcher.group("month"));
            int day = Integer.parseInt(matcher.group("day"));
            return "de".equals(language)
                    ? String.format("%02d.%02d.%04d", day, month, year)
                    : String.format("%04d-%02d-%02d", year, month, day);
        }
        return date.trim();
    }

    public static @Nullable LocalDate tryParseDate(final @Nullable String date) {
        if (date != null) {
            Matcher matcher = ISO_DATE_PATTERN.matcher(date);
            if (matcher.matches()) {
                return LocalDate.parse(date.trim());
            }
            matcher = REGULAR_DATE_PATTERN.matcher(date);
            if (matcher.matches()) {
                int year = Integer.parseInt(matcher.group("year"));
                int month = Integer.parseInt(matcher.group("month"));
                int day = Integer.parseInt(matcher.group("day"));
                return LocalDate.parse(String.format("%04d-%02d-%02d", year, month, day));
            }
        }
        return null;
    }

    private Dates() {
        // no instances
    }
}
