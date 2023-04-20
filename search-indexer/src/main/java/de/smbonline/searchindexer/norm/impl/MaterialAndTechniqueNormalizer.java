package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.graphql.queries.fragment.MaterialData;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;

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
        return new Data()
                .setNonNullAttribute(ID_ATTRIBUTE, material.getId())
                .setNonNullAttribute("specificTypeId", material.getSpecificTypeVocId())
                .setNonNullAttribute("typeId", material.getTypeVocId())
                .setNonNullAttribute("details", StringUtils.trimToNull(material.getDetails()))
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, buildTextValue(material, language));
    }

    private @Nullable String buildTextValue(final MaterialData material, final String language) {
        if (StringUtils.isNotBlank(material.getDetails())) {
            return material.getDetails().trim();
        }
        if (material.getSpecificTypeVocId() == null) {
            return null;
        }

        String typeLabel = resolveThesaurusLabel(material.getTypeVocId(), language);
        String specificTypeLabel = resolveThesaurusLabel(material.getSpecificTypeVocId(), language);

        boolean hasType = StringUtils.isNotBlank(typeLabel);
        boolean hasSpecificType = StringUtils.isNotBlank(specificTypeLabel);

        StringBuilder sb = new StringBuilder();
        if (hasSpecificType) {
            if (hasType) {
                sb.append(typeLabel).append(": ");
            }
            sb.append(specificTypeLabel);
        }
        return sb.length() == 0 ? null : sb.toString();
    }
}
