package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroup;
import de.smbonline.mdssync.jaxb.search.response.RepeatableGroupItem;
import de.smbonline.mdssync.util.Dates;
import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.MutableTriple;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.lang.Nullable;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

public class BiographicalDatesRule implements TransformationRule<Triple<LocalDate, LocalDate, String>> {

    @Override
    public Triple<LocalDate, LocalDate, String> apply(final ModuleItem moduleItem) {
        RepeatableGroup dateGroup = findGroup(moduleItem.getRepeatableGroup(), "PerDateGrp");
        return dateGroup != null ? extractBiographicalDates(dateGroup) : ImmutableTriple.nullTriple();
    }

    private Triple<LocalDate, LocalDate, String> extractBiographicalDates(final RepeatableGroup dateGroup) {

        // check "Lebensdaten" first
        RepeatableGroupItem life = findGroupItem(dateGroup.getRepeatableGroupItem(), VOC_TYPE, "Lebensdaten");
        if (life != null) {
            String from = findFirstHit(life.getDataField(), "DateFromDat", "DateFromTxt");
            String to = findFirstHit(life.getDataField(), "DateToDat", "DateToTxt");
            String preview = extractValue(findVrtField(life.getVirtualField(), "PreviewVrt"));
            return ImmutableTriple.of(from == null ? null : Dates.tryParseDate(from), to == null ? null : Dates.tryParseDate(to), preview);
        }

        // fallback to lowest SortLnu
        MutableTriple<LocalDate, LocalDate, String> lifespan = MutableTriple.of(null, null, null);
        RepeatableGroupItem firstItem = dateGroup.getRepeatableGroupItem().stream()
                // sort by SortLnu, ignore items where SortLnu is missing
                .map(item -> Pair.of(extractSortInfo(item), item))
                .filter(pair -> pair.getKey() >= 0)
                .sorted(Comparator.comparingInt(Pair::getKey))
                .map(Pair::getValue)
                .findFirst().orElse(null);
        if (firstItem != null) {
            String from = findFirstHit(firstItem.getDataField(), "DateFromDat", "DateFromTxt");
            String to = findFirstHit(firstItem.getDataField(), "DateToDat", "DateToTxt");
            String preview = extractValue(findVrtField(firstItem.getVirtualField(), "PreviewVrt"));
            lifespan.setLeft(Dates.tryParseDate(from));
            lifespan.setMiddle(Dates.tryParseDate(to));
            lifespan.setRight(preview);
        }

        // fallback to "Geburtsdatum" and "Todesdatum"
        if (lifespan.getLeft() == null) {
            RepeatableGroupItem birthday = findGroupItem(dateGroup.getRepeatableGroupItem(), VOC_TYPE, "Geburtsdatum");
            if (birthday != null) {
                String value = findFirstHit(birthday.getDataField(), "DateFromDat", "DateFromTxt");
                lifespan.setLeft(Dates.tryParseDate(value));
            }
        }
        if (lifespan.getMiddle() == null) {
            RepeatableGroupItem death = findGroupItem(dateGroup.getRepeatableGroupItem(), VOC_TYPE, "Todesdatum");
            if (death != null) {
                String value = findFirstHit(death.getDataField(), "DateFromDat", "DateFromTxt");
                lifespan.setMiddle(Dates.tryParseDate(value));
            }
        }

        return lifespan;
    }

    private @Nullable String findFirstHit(final List<DataField> fields, final String... candidates) {
        for (String candidate : candidates) {
            String value = extractValue(findDataField(fields, candidate));
            if (value != null) {
                return value;
            }
        }
        return null;
    }
}
