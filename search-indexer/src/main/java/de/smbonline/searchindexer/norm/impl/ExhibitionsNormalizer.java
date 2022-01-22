package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static de.smbonline.searchindexer.conf.ConstKt.*;

// TODO exhibition-date indexing must be re-checked as days pass by
public class ExhibitionsNormalizer extends MultipleHitsSortedNormalizer<String> {

    /**
     * "dd.MM.yyyy"
     */
    private static final Pattern REGULAR_DATE_PATTERN = Pattern.compile(
            "^\\s*(?<day>\\d{1,2})\\.(?<month>\\d{1,2})\\.(?<year>\\d{1,4})\\s*$");

    /**
     * "yyyy-MM-dd"
     */
    private static final Pattern ISO_DATE_PATTERN = Pattern.compile(
            "^\\s*(\\d{1,4})-(\\d{1,2})-(\\d{1,2})\\s*$");
    
    public ExhibitionsNormalizer() {
        super(EXHIBITIONS_ATTRIBUTE, "ObjRegistrarRef", ExhibitionsNormalizer::sort);
    }

    private static @Nullable Data findExhibitionRef(final Data registrar) {
        List<Data> exhibitions = registrar.getNestedTypedAttribute("RegExhibitionRef." + NESTED_ITEMS_ATTRIBUTE_NAME);
        if (exhibitions == null || exhibitions.isEmpty()) {
            return null;
        }
        // M:1 relation - there is max. 1 exhibition item so get(0) is safe
        return exhibitions.get(0);
    }

    private static Data[] sort(final Map<String, Data> registrarItems) {
        return registrarItems.values().stream().sorted((a, b) -> {
            String sortA = extractSortingInfo(findExhibitionRef(a));
            String sortB = extractSortingInfo(findExhibitionRef(b));
            return Comparator.<String>nullsLast(Comparator.naturalOrder()).compare(sortA, sortB);
        }).toArray(Data[]::new);
    }

    @Override
    protected Data[] applyFilter(final Data[] registrarItems) {
        return Arrays.stream(registrarItems)
                .filter(registrarItem -> {
                    LocalDate lDate = extractExhibitionDate(findExhibitionRef(registrarItem));
                    return lDate != null && lDate.isBefore(LocalDate.now());
                })
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] registrarItems) {
        return Arrays.stream(registrarItems)
                .map(ExhibitionsNormalizer::findExhibitionRef)
                .map(ExhibitionsNormalizer::extractExhibitionInfo)
                .toArray(String[]::new);
    }

    private static String extractExhibitionInfo(final Data exhibitionItem) {
        String title = extractExhibitionTitle(exhibitionItem);
        String location = exhibitionItem.getTypedAttribute("ExhVenueDetailsTxt");
        String beginDate = exhibitionItem.getTypedAttribute("ExhBeginDateDat");
        String endDate = exhibitionItem.getTypedAttribute("ExhEndDateDat");

        boolean hasTitle = StringUtils.isNotBlank(title);
        boolean hasLocation = StringUtils.isNotBlank(location);
        boolean hasBeginDate = StringUtils.isNotBlank(beginDate);
        boolean hasEndDate = StringUtils.isNotBlank(endDate);

        StringBuilder sb = new StringBuilder();
        if (hasTitle) {
            sb.append(title.trim());
            if (hasLocation || hasBeginDate || hasEndDate) {
                sb.append(", ");
            }
        }
        if (hasLocation) {
            sb.append(location.trim());
            if (hasBeginDate || hasEndDate) {
                sb.append(", ");
            }
        }
        if (hasBeginDate) {
            sb.append(formatDate(beginDate));
            if (hasEndDate) {
                sb.append("-");
            }
        }
        if (hasEndDate) {
            sb.append(formatDate(endDate));
        }
        return sb.toString();
    }

    private static String formatDate(final String date) {
        Matcher matcher = ISO_DATE_PATTERN.matcher(date);
        if (matcher.matches()) {
            int year = Integer.parseInt(matcher.group(1));
            int month = Integer.parseInt(matcher.group(2));
            int day = Integer.parseInt(matcher.group(3));
            return String.format("%02d.%02d.%04d", day, month, year);
        }
        return date.trim();
    }

    private static @Nullable String extractExhibitionTitle(final Data exhibitionItem) {
        Collection<Data> titles = exhibitionItem.getNestedTypedAttribute("ExhTitleGrp." + NESTED_ITEMS_ATTRIBUTE_NAME);
        return titles == null ? null : titles.stream()
                .filter(title -> hasTypeVoc(title, "Ausstellungstitel"))
                .findFirst()
                .map(title -> title.<String>getTypedAttribute("TitleClb"))
                .orElse(null);
    }

    private static @Nullable String extractSortingInfo(final @Nullable Data exhibitionItem) {
        return exhibitionItem != null && exhibitionItem.hasAttribute("ExhDateTxt")
                ? StringUtils.leftPad(exhibitionItem.getTypedAttribute("ExhDateTxt"), 4, '0')
                : null;
    }


    private @Nullable LocalDate extractExhibitionDate(final @Nullable Data exhibitionItem) {
        if (exhibitionItem != null) {
            String date = exhibitionItem.getTypedAttribute("ExhBeginDateDat");
            return tryParseDate(date);
        }
        return null;
    }

    private static @Nullable LocalDate tryParseDate(final @Nullable String date) {
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
}
