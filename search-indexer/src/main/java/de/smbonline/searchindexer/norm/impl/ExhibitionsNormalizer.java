package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.time.LocalDate;
import java.util.*;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.util.Dates.formatDate;
import static de.smbonline.searchindexer.util.Dates.tryParseDate;
import static de.smbonline.searchindexer.util.Validations.requireId;

// TODO exhibition-date indexing must be re-checked as days pass by
// TODO use exhibitions from graphql instead of parsing exhibition items

public class ExhibitionsNormalizer extends MultipleHitsSortedNormalizer<Data> {

    public ExhibitionsNormalizer() {
        super(EXHIBITIONS_ATTRIBUTE, "ObjRegistrarRef", ExhibitionsNormalizer::sort);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjRegistrarRef.RegExhibitionRef.ExhBeginDateDat",
                "ObjRegistrarRef.RegExhibitionRef.ExhDateTxt",
                "ObjRegistrarRef.RegExhibitionRef.ExhEndDateDat",
                "ObjRegistrarRef.RegExhibitionRef.ExhVenueDetailsTxt",
                "ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TitleClb",
                "ObjRegistrarRef.RegExhibitionRef.ExhTitleGrp.TypeVoc",
        };
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
    protected Data[] pickValues(final Data[] registrarItems) {
        return Arrays.stream(registrarItems)
                .map(ExhibitionsNormalizer::findExhibitionRef)
                .filter(Objects::nonNull)
                .map(ExhibitionsNormalizer::convertToDTO)
                .toArray(Data[]::new);
    }

    private static Data convertToDTO(final Data exhibitionItem) {

        Long id = requireId(exhibitionItem.getAttribute(ITEM_ID));
        String title = extractExhibitionTitle(exhibitionItem);
        String location = exhibitionItem.getTypedAttribute("ExhVenueDetailsTxt");
        // TODO honor language
        String dateRange = buildDateRange(exhibitionItem.getTypedAttribute("ExhBeginDateDat"), exhibitionItem.getTypedAttribute("ExhEndDateDat"), "de");

        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute("title", title)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(id, title, location, dateRange, false))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, buildTextValue(id, title, location, dateRange, true));
    }

    private static @Nullable String buildDateRange(final @Nullable String beginDate, final @Nullable String endDate, final String language) {
        boolean hasBeginDate = StringUtils.isNotBlank(beginDate);
        boolean hasEndDate = StringUtils.isNotBlank(endDate);

        StringBuilder sb = new StringBuilder();
        if (hasBeginDate) {
            sb.append(formatDate(beginDate, language));
            if (hasEndDate) {
                sb.append("-");
            }
        }
        if (hasEndDate) {
            sb.append(formatDate(endDate, language));
        }
        return sb.toString();
    }

    private static @Nullable String buildTextValue(
            final Long id,
            final @Nullable String title,
            final @Nullable String location,
            final @Nullable String dateRange,
            final boolean markup) {

        boolean hasTitle = StringUtils.isNotBlank(title);
        boolean hasLocation = StringUtils.isNotBlank(location);
        boolean hasDates = StringUtils.isNotBlank(dateRange);

        StringBuilder sb = new StringBuilder();
        if (hasTitle) {
            sb.append(title.trim());
            if (hasLocation || hasDates) {
                sb.append(", ");
            }
        }
        if (hasLocation) {
            sb.append(location.trim());
            if (hasDates) {
                sb.append(", ");
            }
        }
        if (hasDates) {
            sb.append(dateRange.trim());
        }

        if (sb.length() == 0) {
            return null;
        }
        return markup ? "<div>%s</div>".formatted(sb) : sb.toString().trim();
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

    private static Data[] sort(final Map<String, Data> registrarItems) {
        return registrarItems.values().stream().sorted((a, b) -> {
            String sortA = extractSortingInfo(findExhibitionRef(a));
            String sortB = extractSortingInfo(findExhibitionRef(b));
            return Comparator.<String>nullsLast(Comparator.naturalOrder()).compare(sortA, sortB);
        }).toArray(Data[]::new);
    }

    private static @Nullable Data findExhibitionRef(final Data registrar) {
        List<Data> exhibitions = registrar.getNestedTypedAttribute("RegExhibitionRef." + NESTED_ITEMS_ATTRIBUTE_NAME);
        if (exhibitions == null || exhibitions.isEmpty()) {
            return null;
        }
        // M:1 relation - there is max. 1 exhibition item so get(0) is safe
        return exhibitions.get(0);
    }
}
