package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.DateRange;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.NormalizerBase;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;

public class DateRangeNormalizer extends NormalizerBase<DateRange> {

    private static final Logger LOGGER = LoggerFactory.getLogger(DateRangeNormalizer.class);

    private static final DateRange NO_DATA_AVAILABLE = new DateRange(null, null);

    /**
     * "dd.MM.yyyy hh:mm:ss.SSS"
     */
    private static final Pattern REGULAR_DATE_PATTERN = Pattern.compile(
            "^\\s*(\\d{1,2})\\.(\\d{1,2})\\.(-?\\d{1,4})(?: \\d{1,2}:\\d{2}(?::\\d{2}(?:\\.\\d+)?)?)?\\s*$");
    /**
     * "yyyy"
     */
    private static final Pattern YEAR_ONLY_PATTERN = Pattern.compile("^\\s*(-?\\d{1,4})\\s*$");

    /**
     * "nicht datierbar"
     */
    private static final Pattern NO_DATA_AVAILABLE_PATTERN =
            Pattern.compile("^(?:0|ohne Datum|undatiert|nicht datierbar|o\\.\\s*J\\.)$");

    private enum TimeMode {
        FLOOR {
            // set to start-of-day time
            public void adjust(final Calendar c) {
                c.set(Calendar.HOUR_OF_DAY, 0);
                c.set(Calendar.MINUTE, 0);
                c.set(Calendar.SECOND, 0);
                c.set(Calendar.MILLISECOND, 0);
            }
        },
        CEIL {
            // set to end-of-day time
            public void adjust(final Calendar c) {
                c.set(Calendar.HOUR_OF_DAY, 23);
                c.set(Calendar.MINUTE, 59);
                c.set(Calendar.SECOND, 59);
                c.set(Calendar.MILLISECOND, 999);
            }
        };
        public abstract void adjust(final Calendar c);
    }

    public DateRangeNormalizer() {
        super(DATE_RANGE_ATTRIBUTE);
    }

    @Override
    public @Nullable DateRange resolveAttributeValue(final ObjectData source) {
        Data[] dateItems = findGroupItems(source, "ObjDateGrp");

        // find an item with concrete dates that we can use directly
        Optional<Data> withConcreteDateInfo = Arrays
                .stream(dateItems)
                .filter(d -> d.hasAttribute("DateFromTxt") && d.hasAttribute("DateToTxt"))
                .findFirst();
        if (withConcreteDateInfo.isPresent()) {
            Data dateItem = withConcreteDateInfo.get();
            String fromText = Objects.requireNonNull(dateItem.getTypedAttribute("DateFromTxt"));
            String toText = Objects.requireNonNull(dateItem.getTypedAttribute("DateToTxt"));
            DateRange dateRange = tryParseDateRange(fromText, toText);
            if (dateRange != null) {
                LOGGER.info("Calculated date-range {} for object {} - source data: DateFromTxt={}, DateToTxt={}",
                        dateRange, source.getId(), fromText, toText);
                return dateRange;
            }
            LOGGER.warn("Can't handle concrete date info DateFromTxt={} DateToTxt={}]. Try parsing DateTxt...", fromText, toText);
        }

        // find an item with date text where we can apply best-guess-logic of time range calculation
        ArrayList<String> failedCandidates = new ArrayList<>();
        for (Data dateItem : dateItems) {
            String dateText = dateItem.getTypedAttribute("DateTxt");
            if (StringUtils.isBlank(dateText)) {
                continue;
            }
            DateRange dateRange = checkDataAvailable(dateText);
            if (dateRange == NO_DATA_AVAILABLE) {
                LOGGER.info("Calculated date-range N/A for object {} - source data: DateTxt={}", source.getId(), dateText);
                return null;
            }
            dateRange = tryGuessDateRange(dateText);
            if (dateRange != null) {
                LOGGER.info("Calculated date-range {} for object {} - source data: DateTxt={}",
                        dateRange, source.getId(), dateText);
                return dateRange;
            }
            failedCandidates.add(dateText);
        }

        if (!failedCandidates.isEmpty()) {
            LOGGER.info("Can't calculate date-range for object {}. " +
                    "Attempts failed for: {}", source.getId(), failedCandidates);
        }
        return null;
    }

    public static @Nullable DateRange tryGuessDateRange(final String dateText) {
        DateRange dateRange = checkDateByRegex(dateText);
        if (dateRange == null) {
            dateRange = checkKnownEpochs(dateText);
        }

        // TODO much more here, e.g.
        // 4.1998
        // Zypro-archaisch II
        // zyklisch datiert (1849)
        // zwischen 27. Februar und 15. Juni 212 n.Chr.
        // Zhanguo-Periode
        // Xolalpan-Phase 400 - 650
        // ...

        return dateRange;
    }

    private static @Nullable DateRange checkDataAvailable(final String dateText) {
        return NO_DATA_AVAILABLE_PATTERN.matcher(dateText).matches() ? NO_DATA_AVAILABLE : null;
    }

    private static @Nullable DateRange checkKnownEpochs(final String dateText) {
        for (Map.Entry<String, Pair<Integer, Integer>> epoch : epochMapping().entrySet()) {
            if (epoch.getKey().equalsIgnoreCase(dateText.trim())) {
                Integer from = epoch.getValue().getLeft();
                Integer to = epoch.getValue().getRight();
                return createDayRange(from == null ? null : firstDayOfYear(from), to == null ? null : lastDayOfYear(to));
            }
        }
        return null;
    }

    private static @Nullable DateRange checkDateByRegex(final String dateText) {
        Pattern pattern;
        Matcher matcher;

        // "yyyy"
        pattern = YEAR_ONLY_PATTERN;
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear(Integer.parseInt(matcher.group(1)));
            String to = lastDayOfYear(Integer.parseInt(matcher.group(1)));
            return createDayRange(from, to);
        }

        // "vor yyyy"
        pattern = Pattern.compile("^\\s*(?:wohl )?vor *(\\d{1,4})\\s*(?:n(?:\\.|ach) ?Chr(?:\\.|istus))?$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            int year = Integer.parseInt(matcher.group(1)) - 1;
            return createDayRange(null, lastDayOfYear(year));
        }

        /// "yyyy (?)"
        pattern = Pattern.compile("^\\s*(\\d{1,4})\\s*\\(?\\??\\)?$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            int year = Integer.parseInt(matcher.group(1));
            return createDayRange(firstDayOfYear(year - 2), lastDayOfYear(year + 2));
        }

        // "vor yyyy vor Christus"
        pattern = Pattern.compile("^\\s*(?:wohl )?vor *(\\d{1,4})\\s*(?:v(?:\\.|or) ?Chr(?:\\.|istus)).*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String to = lastDayOfYear(-Integer.parseInt(matcher.group(1)) - 1);
            return createDayRange(null, to);
        }

        // "wohl um yyyy vor Christus"
        pattern = Pattern.compile("^\\s*(?:wohl )?um *(\\d{1,4})\\s*(?:v(?:\\.|or) ?Chr(?:\\.|istus)).*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear(-Integer.parseInt(matcher.group(1)) - 10);
            String to = lastDayOfYear(Math.min(-1, -Integer.parseInt(matcher.group(1)) + 10)); // keep it BC
            return createDayRange(from, to);
        }

        // "wohl um yyyy", "Region, um yyyy"
        pattern = Pattern.compile("^\\s*(?:wohl|.+,)? *um *(\\d{1,4})\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear(Math.max(0, Integer.parseInt(matcher.group(1)) - 5)); // keep it AD
            String to = lastDayOfYear(Integer.parseInt(matcher.group(1)) + 5);
            return createDayRange(from, to);
        }

        // "ca. yyyy"
        pattern = Pattern.compile("^\\s*ca\\. *(\\d{1,4})\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear(Math.max(0, Integer.parseInt(matcher.group(1)) - 5)); // keep it AD
            String to = lastDayOfYear(Integer.parseInt(matcher.group(1)) + 5);
            return createDayRange(from, to);
        }

        // "wohl um yyyy/yyyy"
        pattern = Pattern.compile("^\\s*(?:wohl )?um *(\\d{1,4}) *[-/] *(\\d{1,4})\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            return createYearRange(matcher.group(1), matcher.group(2));
        }

        // "nach yyyy"
        pattern = Pattern.compile("^\\s*(?:wohl )?nach *(\\d{1,4})\\s*\\(?\\??\\)?\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear(Integer.parseInt(matcher.group(1)) + 1);
            return createDayRange(from, null);
        }

        // "zwischen den Jahren yyyy und yyyy"
        pattern = Pattern.compile("^\\s*zwischen(?:.+?)(\\d{1,4}) *und *(\\d{1,4})\\.?$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            return createYearRange(matcher.group(1), matcher.group(2));
        }

        // "yyyy bis yyyy"
        pattern = Pattern.compile("^\\s*(\\d{1,4}) *(?:-|/|bis) *(\\d{1,4})\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            return createYearRange(matcher.group(1), matcher.group(2));
        }

        // "yyyy bis yyyy vor Christus"
        pattern = Pattern.compile("^\\s*(\\d{1,4}) *(?:-|/|bis) *(\\d{1,4})\\s*(?:v(?:\\.|or) ?Chr(?:\\.|istus)).*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            int year1 = -Integer.parseInt(matcher.group(1));
            int year2 = -Integer.parseInt(matcher.group(2));
            String from = firstDayOfYear(Math.min(year1, year2));
            String to = lastDayOfYear(Math.max(year1, year2));
            return createDayRange(from, to);
        }

        // "xx.Jh."
        pattern = Pattern.compile("^\\s*(\\d{1,2})\\.? *(?:Jh[d]?\\.?|Jahrhundert)\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear((Integer.parseInt(matcher.group(1)) * 100) - 100);
            String to = lastDayOfYear((Integer.parseInt(matcher.group(1)) * 100) - 1);
            return createDayRange(from, to);
        }

        // "xx.Jh. - xx.Jh."
        pattern = Pattern.compile("^\\s*(\\d{1,2})\\.? *(?:Jh[d]?\\.? *)?(?:-|/|bis) *(\\d{1,2})\\.? *(?:Jh[d]?\\.?|Jahrhundert)\\s*$", Pattern.CASE_INSENSITIVE);
        matcher = pattern.matcher(dateText);
        if (matcher.matches()) {
            String from = firstDayOfYear((Integer.parseInt(matcher.group(1)) * 100) - 100);
            String to = lastDayOfYear((Integer.parseInt(matcher.group(2)) * 100) - 1);
            return checkFromBeforeTo(from, to) ? createDayRange(from, to) : null;
        }

        // "dd.MM.yyyy hh:mm:ss.SSS"
        String date = checkRegularDatePattern(dateText);
        if (date != null) {
            return createDayRange(date, date);
        }

        // TODO much more here, e.g.
        // 01. Apr. 1985
        // 01.09.1971/ 02.09.1971/ 04.09.1971
        // ...

        return null;
    }

    private static @Nullable DateRange createYearRange(final String fromYear, final String toYear) {
        String from = fromYear;
        String to = toYear;
        if (to.length() < from.length()) {
            // something like 1843/44
            to = from.substring(0, from.length() - to.length()) + to;
        }
        from = firstDayOfYear(Integer.parseInt(from));
        to = lastDayOfYear(Integer.parseInt(to));
        return checkFromBeforeTo(from, to) ? createDayRange(from, to) : null;
    }

    private static DateRange createDayRange(final @Nullable String isoFromDay, final @Nullable String isoToDay) {
        Long from = isoFromDay == null ? null : startOfDay(isoFromDay);
        Long to = isoToDay == null ? null : endOfDay(isoToDay);
        return createTimeRange(from, to);
    }

    private static DateRange createTimeRange(final @Nullable Long fromSeconds, final @Nullable Long toSeconds) {
        return new DateRange(fromSeconds, toSeconds);
    }

    private static @Nullable String checkRegularDatePattern(final String dateText) {
        Matcher matcher = REGULAR_DATE_PATTERN.matcher(dateText);
        if (matcher.matches()) {
            int day = Integer.parseInt(matcher.group(1));
            int month = Integer.parseInt(matcher.group(2));
            int year = Integer.parseInt(matcher.group(3));
            return isoDate(year, month, day);
        }
        return null;
    }

    private static @Nullable DateRange tryParseDateRange(final String fromText, final String toText) {
        String from = isoStartDay(fromText);
        String to = isoEndDay(toText);
        if (from != null && to != null) {
            boolean fromBeforeTo = checkFromBeforeTo(from, to);
            if (fromBeforeTo) {
                return createDayRange(from, to);
            } else {
                // to is before from, we can't use it
                LOGGER.warn("Can't handle parsed date info [{} TO {}].", from, to);
            }
        } else if (from != null) {
            return createDayRange(from, null);
        } else if (to != null) {
            return createDayRange(null, to);
        }
        return null;
    }

    private static boolean checkFromBeforeTo(final String isoFrom, final String isoTo) {
        Calendar from = asCalendar(isoFrom, TimeMode.FLOOR);
        Calendar to = asCalendar(isoTo, TimeMode.CEIL);
        return !from.after(to);
    }

    private static Calendar asCalendar(final String isoDate, final TimeMode mode) {
        String[] parts = isoDate.split("[- ]");
        Calendar c = new GregorianCalendar();
        c.set(Calendar.YEAR, Integer.parseInt(parts[0]));
        c.set(Calendar.MONTH, Integer.parseInt(parts[1]) - 1);
        c.set(Calendar.DAY_OF_MONTH, Integer.parseInt(parts[2]));
        if (parts.length == 4) {
            c.set(Calendar.ERA, "BC".equals(parts[3]) ? GregorianCalendar.BC : GregorianCalendar.AD);
        }
        mode.adjust(c);
        return c;
    }

    private static @Nullable String isoStartDay(final String val) {
        if (YEAR_ONLY_PATTERN.matcher(val).matches()) {
            int year = Integer.parseInt(val.trim());
            return firstDayOfYear(year);
        }
        String date = checkRegularDatePattern(val);
        if (date != null) {
            return date;
        }
        LOGGER.warn("Cannot handle {} as start date. Using null", val);
        return null;
    }

    private static @Nullable String isoEndDay(final String val) {
        if (YEAR_ONLY_PATTERN.matcher(val).matches()) {
            int year = Integer.parseInt(val.trim());
            return lastDayOfYear(year);
        }
        String date = checkRegularDatePattern(val);
        if (date != null) {
            return date;
        }
        LOGGER.warn("Cannot handle {} as end date. Using null", val);
        return null;
    }

    private static Long startOfDay(final String isoDate) {
        return asCalendar(isoDate, TimeMode.FLOOR).getTimeInMillis()/1000;
    }

    private static Long endOfDay(final String isoDate) {
        return asCalendar(isoDate, TimeMode.CEIL).getTimeInMillis()/1000;
    }

    private static String firstDayOfYear(final int year) {
        return isoDate(year, 1, 1);
    }

    private static String lastDayOfYear(final int year) {
        return isoDate(year, 12, 31);
    }

    private static String isoDate(final int year, final int month, final int day) {
        Calendar c = new GregorianCalendar();
        int y = Math.abs(year);
        int m = Math.max(1, Math.min(month, 12));
        c.set(Calendar.YEAR, y);
        c.set(Calendar.ERA, year < 0 ? GregorianCalendar.BC : GregorianCalendar.AD);
        c.set(Calendar.MONTH, m - 1);
        int d = Math.max(1, Math.min(day, c.getActualMaximum(Calendar.DAY_OF_MONTH)));
        String pattern = year < 0 ? "%04d-%02d-%02d BC" : "%04d-%02d-%02d";
        return String.format(pattern, y, m, d);
    }
}
