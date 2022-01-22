package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.norm.MultipleHitsSortedNormalizer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public class ProvenanceNormalizer extends MultipleHitsSortedNormalizer<String> {

    private static final String ENFORCED_LINEBREAK = "\r\n";

    private static final Pair<String, String> APPROVAL_DISTINGUISHER =
            Pair.of("OwnApprovalVoc", "Provenienzschritt freigegeben für SMB-digital");

    public ProvenanceNormalizer() {
        super(PROVENANCE_ATTRIBUTE, "ObjOwnership001Ref");
    }

    @Override
    protected Data[] applyFilter(final Data[] items) {
        return Arrays.stream(items)
                .filter(item -> hasAttributeValue(item, APPROVAL_DISTINGUISHER.getKey(), APPROVAL_DISTINGUISHER.getValue()))
                .toArray(Data[]::new);
    }

    @Override
    protected String[] pickValues(final Data[] items) {
        return Arrays.stream(items)
                .map(ProvenanceNormalizer::extractProvenanceInfo)
                .toArray(String[]::new);
    }

    private static String extractProvenanceInfo(final Data item) {

        String date = item.getTypedAttribute("OwnDatePreviewVrt");
        String certainty = item.getTypedAttribute("OwnCertaintyVoc");
        String owner = extractOwnerInfo(item);
        String location = item.getTypedAttribute("OwnLocation001Voc");
        String locationDetails = item.getTypedAttribute("OwnLocationDetailsTxt");
        String method = item.getTypedAttribute("OwnExchangeMethodVoc");
        String[] sources = extractSources(item);

        boolean hasDate = StringUtils.isNotBlank(date);
        boolean hasCertainty = StringUtils.isNotBlank(certainty);
        boolean hasOwner = StringUtils.isNotBlank(owner);
        boolean hasLocation = StringUtils.isNotBlank(location);
        boolean hasLocationDetails = StringUtils.isNotBlank(locationDetails);
        boolean hasMethod = StringUtils.isNotBlank(method);
        boolean hasSources = sources != null;

        StringBuilder sb = new StringBuilder();
        if (hasDate) {
            sb.append(date.trim());
        }
        if (hasCertainty) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append('(').append(certainty.trim()).append(')');
        }
        if (hasOwner) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(owner.trim());
            if (hasLocation || hasLocationDetails || hasMethod) {
                sb.append(',');
            }
        }
        if (hasLocation) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(location.trim());
            if (hasLocationDetails || hasMethod) {
                sb.append(',');
            }
        }
        if (hasLocationDetails) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append(locationDetails.trim());
            if (hasMethod) {
                sb.append(',');
            }
        }
        if (hasMethod) {
            if (sb.length() > 0) {
                sb.append(' ');
            }
            sb.append('(').append(method.trim()).append(')');
        }
        if (hasSources) {
            if (sb.length() > 0) {
                sb.append(ENFORCED_LINEBREAK);
            }
            sb.append(String.join(ENFORCED_LINEBREAK, sources));
        }
        return sb.toString();
    }

    private static @Nullable String[] extractSources(final Data item) {
        Collection<Data> sources = item.getNestedTypedAttribute("OwnDocumentsGrp." + NESTED_ITEMS_ATTRIBUTE_NAME);
        if (sources == null) {
            return null;
        }
        String[] texts = Arrays.stream(sortByAttribute(sources.toArray(Data[]::new), SORTING_FIELDNAME))
                .filter(source -> hasTypeVoc(source, "Quelle extern"))
                .map(source -> source.<String>getTypedAttribute("DocumentsClb"))
                .filter(StringUtils::isNotBlank)
                .map(text -> text + ": " + "Quelle extern")
                .toArray(String[]::new);
        return texts.length == 0 ? null : texts;
    }

    private static @Nullable String extractOwnerInfo(final Data item) {
        if (hasAttributeValue(item, "OwnOwnerTxt")) {
            return item.getTypedAttribute("OwnOwnerTxt");
        }
        Collection<Data> persons = item.getNestedTypedAttribute("OwnPersonMNRef." + NESTED_ITEMS_ATTRIBUTE_NAME);
        if (persons != null) {
            return persons.stream()
                    .map(p -> p.<String>getTypedAttribute("PerNennformTxt"))
                    .filter(StringUtils::isNotBlank)
                    .collect(Collectors.joining(", "));
        }
        return null;
    }
}
