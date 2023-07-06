package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.CultureData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static org.apache.commons.lang3.StringUtils.equalsIgnoreCase;
import static org.apache.commons.lang3.StringUtils.substringAfter;

public class CulturalReferenceNormalizer extends ThesaurusResolvingNormalizer<Data[]> {

    public CulturalReferenceNormalizer(final ObjectProvider<GraphQlService> graphQl) {
        super(CULTURAL_REFERENCES_ATTRIBUTE, graphQl);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjCulturalContextGrp.DenominationVoc",
                "ObjCulturalContextGrp.NameVoc",
                "ObjCulturalContextGrp.SortLnu",
                "ObjCulturalContextGrp.TypeVoc",
        };
    }


    @Override
    public @Nullable Data[] resolveAttributeValue(final ObjectData source, final String language) {
        List<Data> refs = new ArrayList<>();
        for (ObjectData.CulturalReference ref : source.getCulturalReferences()) {
            CultureData cultureData = ref.getFragments().getCultureData();
            if (cultureData.getNameVocId() != null) {
                Data dto = resolveReference(cultureData, language);
                refs.add(dto);
            }
        }
        return refs.isEmpty() ? null : refs.toArray(Data[]::new);
    }

    private Data resolveReference(final CultureData ref, final String language) {

        String name = resolveThesaurusLabel(ref.getNameVocId(), language, false);
        String nameHierarchical = resolveThesaurusLabel(ref.getNameVocId(), language, true);
        String type = resolveThesaurusLabel(ref.getTypeVocId(), language, false);
        String denomination = resolveThesaurusLabel(ref.getDenominationVocId(), language, true);
        String searchLink = Links.internal(CULTURAL_REFERENCES_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + ref.getNameVocId());

        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, ref.getNameVocId())
                .setNonNullAttribute("typeId", ref.getTypeVocId())
                .setNonNullAttribute("denominationId", ref.getDenominationVocId())
                .setNonNullAttribute("name", name)
                .setNonNullAttribute("search", searchLink)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(ref, name, nameHierarchical, type, denomination, false))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, buildTextValue(ref, name, nameHierarchical, type, denomination, true));
    }

    private @Nullable String buildTextValue(
            final CultureData ref,
            final @Nullable String name,
            final @Nullable String nameHierarchical,
            final @Nullable String type,
            final @Nullable String denomination,
            final boolean markup) {

        boolean hasName = StringUtils.isNotBlank(name);
        boolean isNameHierarchical = hasName && !equalsIgnoreCase(name, nameHierarchical);
        boolean hasType = StringUtils.isNotBlank(type);
        boolean hasDenomination = StringUtils.isNotBlank(denomination);

        StringBuilder sb = new StringBuilder();
        if (hasName) {
            if (hasType) {
                String template = markup ? "<span>%s:</span> " : "%s: ";
                sb.append(template.formatted(type.trim()));
            }
            if (markup) {
                String searchParam = CULTURAL_REFERENCES_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + ref.getNameVocId();
                sb.append(Links.internalHTML(searchParam, name.trim()));
                if (isNameHierarchical) {
                    sb.append(" <span>%s</span>".formatted(substringAfter(nameHierarchical, name).trim()));
                }
            } else {
                sb.append(name.trim());
            }
            if (hasDenomination) {
                String template = markup ? " <span>(%s)</span>" : " (%s)";
                sb.append(template.formatted(denomination.trim()));
            }
        }

        if (sb.length() == 0) {
            return null;
        }
        return markup ? "<div>%s</div>".formatted(sb) : sb.toString().trim();
    }
}
