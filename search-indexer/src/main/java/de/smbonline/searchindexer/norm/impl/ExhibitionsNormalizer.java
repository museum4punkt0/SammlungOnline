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

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.util.Dates.*;

// TODO exhibition-date indexing must be re-checked as days pass by
public class ExhibitionsNormalizer extends MultipleHitsSortedNormalizer<String> {

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
            sb.append(formatDate(beginDate, "de")); // TODO honor language
            if (hasEndDate) {
                sb.append("-");
            }
        }
        if (hasEndDate) {
            sb.append(formatDate(endDate, "de")); // TODO honor language
        }
        return sb.toString();
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
}
