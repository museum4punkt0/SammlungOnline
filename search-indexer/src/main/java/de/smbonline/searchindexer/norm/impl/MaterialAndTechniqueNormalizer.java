package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.MaterialData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.norm.impl.shared.Links;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.rest.Params.urlEncode;
import static de.smbonline.searchindexer.util.Misc.wrapQuotes;
import static de.smbonline.searchindexer.util.Validations.requireId;
import static org.apache.commons.lang3.StringUtils.equalsIgnoreCase;
import static org.apache.commons.lang3.StringUtils.substringAfter;

public class MaterialAndTechniqueNormalizer extends ThesaurusResolvingNormalizer<Data[]> {

    private static final class MaterialRef {
        final String language;
        final List<ObjectData.MaterialReference> references;

        private MaterialRef(final String language, final List<ObjectData.MaterialReference> refs) {
            this.language = language;
            this.references = Collections.unmodifiableList(refs);
        }
    }

    public MaterialAndTechniqueNormalizer(final ObjectProvider<GraphQlService> graphQl) {
        super(MATERIAL_AND_TECHNIQUE_ATTRIBUTE, graphQl);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjMaterialTechniqueGrp.ExportClb",
                "ObjMaterialTechniqueGrp.MaterialVoc",
                "ObjMaterialTechniqueGrp.MatTechVoc",
                "ObjMaterialTechniqueGrp.PhotographyVoc",
                "ObjMaterialTechniqueGrp.PresentationVoc",
                "ObjMaterialTechniqueGrp.SortLnu",
                "ObjMaterialTechniqueGrp.TechniqueVoc",
                "ObjMaterialTechniqueGrp.TypeVoc",
        };
    }

    @Override
    public @Nullable Data[] resolveAttributeValue(final ObjectData source, final String language) {
        MaterialRef ref = new MaterialRef(language, source.getMaterialReferences());
        List<Data> refs = convertWithBusinessRuleFilter(ref);
        return refs.isEmpty() ? null : refs.toArray(Data[]::new);
    }

    private List<Data> convertWithBusinessRuleFilter(final MaterialRef refs) {

        // only use "Ausgabe" if exist
        List<Data> result = refs.references.stream()
                .map(this::extractMaterialData)
                .filter(material -> {
                    if (StringUtils.isNotBlank(material.getDetails()) && material.getTypeVocId() != null) {
                        ThesaurusData type = fetchThesaurus(((Number) material.getTypeVocId()).longValue());
                        return type != null && "Ausgabe".equals(type.getName());
                    }
                    return false;
                })
                .map(material -> resolveReference(material, refs.language))
                .collect(Collectors.toList());

        // else use all "ExportClb" if exist
        if (result.isEmpty()) {
            result = refs.references.stream()
                    .map(this::extractMaterialData)
                    .filter(material -> StringUtils.isNotBlank(material.getDetails()))
                    .map(material -> resolveReference(material, refs.language))
                    .collect(Collectors.toList());
        }

        // else use all specific vocs with type-voc prefix
        if (result.isEmpty()) {
            result = refs.references.stream()
                    .map(this::extractMaterialData)
                    .filter(material -> material.getSpecificTypeVocId() != null)
                    .map(material -> resolveReference(material, refs.language))
                    .collect(Collectors.toList());
        }
        return result;
    }

    private MaterialData extractMaterialData(final ObjectData.MaterialReference ref) {
        return ref.getFragments().getMaterialData();
    }

    private Data resolveReference(final MaterialData material, final String language) {

        Long id = material.getSpecificTypeVocId() == null ? null : requireId(material.getSpecificTypeVocId());
        String details = StringUtils.trimToNull(material.getDetails());
        String type = resolveThesaurusLabel(material.getTypeVocId(), language, false);
        String specificType = resolveThesaurusLabel(id, language, false);
        String specificTypeHierarchical = resolveThesaurusLabel(id, language, true);
        String searchLink = Links.internal(buildSearchParams(details, id));

        // details override specific-type-voc
        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute("typeId", material.getTypeVocId())
                .setNonNullAttribute("name", details == null ? specificType : details)
                .setNonNullAttribute("search", searchLink)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(material, details, type, specificType, specificTypeHierarchical, false))
                .setNonNullAttribute(MARKUP_VALUE_ATTRIBUTE, buildTextValue(material, details, type, specificType, specificTypeHierarchical, true));
    }

    /**
     * Build the actual text that is shown for this attribute.
     *
     * @param material     the base object
     * @param details      extracted details from base object
     * @param type         extracted type-voc-label from base object
     * @param specificType extracted specific-type-voc-label from base object
     * @param markup       true for HTML, false for plain text
     * @return text value
     */
    private @Nullable String buildTextValue(
            final MaterialData material,
            final @Nullable String details,
            final @Nullable String type,
            final @Nullable String specificType,
            final @Nullable String specificTypeHierarchical,
            final boolean markup) {

        boolean hasDetails = StringUtils.isNotBlank(details);
        boolean hasType = StringUtils.isNotBlank(type);
        boolean hasSpecificType = StringUtils.isNotBlank(specificType);
        boolean isSpecificTypeHierarchical = hasSpecificType && !equalsIgnoreCase(specificType, specificTypeHierarchical);

        StringBuilder sb = new StringBuilder();

        // option A: details
        if (hasDetails) {
            if (markup) {
                String searchParam = buildSearchParams(details, null);
                sb.append(Links.internalHTML(searchParam, details));
            } else {
                sb.append(details);
            }
        }
        // option B: voc
        else if (hasSpecificType) {
            if (hasType) {
                String template = markup ? "<span>%s:</span> " : "%s: ";
                sb.append(template.formatted(type));
            }
            if (markup) {
                String searchParam = buildSearchParams(null, requireId(material.getSpecificTypeVocId()));
                sb.append(Links.internalHTML(searchParam, specificType));
                if (isSpecificTypeHierarchical) {
                    sb.append(" <span>%s</span>".formatted(substringAfter(specificTypeHierarchical, specificType).trim()));
                }
            } else {
                sb.append(specificType);
            }
        }

        if (sb.length() == 0) {
            return null;
        }
        return markup ? "<div>%s</div>".formatted(sb) : sb.toString().trim();
    }

    /**
     * Builds search query term, uses details if given else the id.
     *
     * @param details material string
     * @param id      material voc id
     * @return query param
     */
    private String buildSearchParams(final @Nullable String details, final @Nullable Long id) {
        if (id == null) {
            return MATERIAL_AND_TECHNIQUE_ATTRIBUTE + ".name:" + wrapQuotes(urlEncode(details));
        } else {
            return MATERIAL_AND_TECHNIQUE_ATTRIBUTE + "." + ID_ATTRIBUTE + ":" + id;
        }
    }
}
