package de.smbonline.mdssync.util;

import de.smbonline.mdssync.exc.ErrorHandling;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static de.smbonline.mdssync.util.MdsConstants.*;

public final class Dates {

    /**
     * "dd.MM.yyyy hh:mm:ss.SSS"
     */
    private static final Pattern REGULAR_DATE_PATTERN = Pattern.compile(
            "^\\s*(?<day>\\d{1,2})\\.(?<month>\\d{1,2})\\.(?<year>-?\\d{1,4})(?: \\d{1,2}:\\d{2}(?::\\d{2}(?:\\.\\d+)?)?)?\\s*$");

    /**
     * "yyyy-MM-dd"
     */
    private static final Pattern ISO_DATE_PATTERN = Pattern.compile(
            "^\\s*(?<year>\\d{1,4})-(?<month>\\d{1,2})-(?<day>\\d{1,2})\\s*$");

    /**
     * Convert local date time to OffsetDateTime
     *
     * @param localDatetimeString yyyy-MM-dd[T]hh:mm:ss.SSS
     * @return OffsetDateTime
     */
    public static OffsetDateTime toOffsetDateTime(final String localDatetimeString) {
        // convert "2021-11-11 09:51:18.661" to "2021-11-11T09:51:18.661" if necessary
        String isoDateString = localDatetimeString.replace(' ', 'T');
        return toOffsetDateTime(LocalDateTime.parse(isoDateString));
    }

    /**
     * Convert LocalDateTime to OffsetDateTime.
     *
     * @param localDatetime local date time
     * @return OffsetDateTime
     */
    public static OffsetDateTime toOffsetDateTime(final LocalDateTime localDatetime) {
        return OffsetDateTime.from(localDatetime.atZone(MDS_DATE_ZONE));
    }

    public static @Nullable LocalDate tryParseDate(final @Nullable String dateText) {
        if (StringUtils.isBlank(dateText)) {
            return null;
        }

        try {

            LocalDate date = checkRegularDatePattern(dateText);
            if (date == null) {
                date = checkIsoDatePattern(dateText);
            }
            return date;

        } catch (DateTimeException exc) {
            ErrorHandling.capture(exc, "Unsupported date format {}", dateText);
            return null;
        }
    }

    // "yyyy-MM-dd"
    private static @Nullable LocalDate checkIsoDatePattern(final String dateText) {
        Matcher matcher = ISO_DATE_PATTERN.matcher(dateText);
        return matcher.matches() ? extractDate(matcher) : null;
    }

    // "dd.MM.yyyy"
    private static @Nullable LocalDate checkRegularDatePattern(final String dateText) {
        Matcher matcher = REGULAR_DATE_PATTERN.matcher(dateText);
        return matcher.matches() ? extractDate(matcher) : null;
    }

    private static LocalDate extractDate(final Matcher matcher) {
        int year = Integer.parseInt(matcher.group("year"));
        int month = Integer.parseInt(matcher.group("month"));
        int day = Integer.parseInt(matcher.group("day"));
        return LocalDate.of(year, month, day);
    }

    private Dates() {
        // no instances
    }
}
