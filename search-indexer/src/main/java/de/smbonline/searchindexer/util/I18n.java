package de.smbonline.searchindexer.util;

import de.smbonline.searchindexer.graphql.queries.fragment.AssortmentData;
import de.smbonline.searchindexer.graphql.queries.fragment.CollectionData;
import de.smbonline.searchindexer.graphql.queries.fragment.CompilationData;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

import static de.smbonline.searchindexer.conf.ConstKt.*;

@Component
public class I18n {

    public interface Translations {
        String getFacetLabel(final String field);

        String getFacetOptionLabel(final String field, final String value);
    }

    private final class I18nImpl implements Translations {
        private final Map<String, String> labels;
        private final String language;

        private I18nImpl(final String language, final Map<String, String> staticMapping) {
            this.language = language;
            this.labels = staticMapping;
        }

        @Override
        public String getFacetLabel(final String field) {
            return this.labels.getOrDefault(String.format("facet[%s]", field), field);
        }

        @Override
        public String getFacetOptionLabel(final String field, final String value) {
            MappingSupplier mapping = I18n.this.mappingSupplier.getObject();
            if (COLLECTION_KEY_ATTRIBUTE.equals(field)) {
                CollectionData collection = mapping.fetchCollection(value);
                if (collection != null) {
                    return StringUtils.defaultString(collection.getTitle(), collection.getKey());
                }
                return value;
            }
            if (COMPILATION_ATTRIBUTE.equals(field)) {
                CompilationData compilation = mapping.fetchCompilation(value);
                if (compilation != null) {
                    return StringUtils.defaultString(compilation.getTitle(), compilation.getKey());
                }
                return value;
            }
            if (ASSORTMENTS_ATTRIBUTE.equals(field)) {
                List<AssortmentData> assortments = mapping.fetchAssortments(this.language);
                AssortmentData assortment = assortments.stream().filter(a -> a.getKey().equals(value)).findFirst().orElse(null);
                AssortmentData.I18n i18n = assortment == null || assortment.getI18n().isEmpty() ? null : assortment.getI18n().get(0);
                return i18n == null ? value : StringUtils.defaultString(i18n.getTitle(), assortment.getKey());
            }
            if (LOCATION_ATTRIBUTE.equals(field)) {
                // TODO use buildingMapping
                String label = value.replaceAll("(\"|\\(|\\)| AND)", "");
                // TODO hacked-in until Gemäldegalerie is correctly indexed
                if ("Kulturforum".equals(value)) {
                    label = "Gemäldegalerie";
                }
                return StringUtils.substringBefore(label, " OR");
            }
            // TODO
            return value;
        }
    }

    private final Map<String, I18nImpl> translators = Map.of(
            "de", new I18nImpl("de", Map.of(
                    String.format("facet[%s]", LOCATION_ATTRIBUTE), "Standort",
                    String.format("facet[%s]", COLLECTION_KEY_ATTRIBUTE), "Sammlungen und Institute",
                    String.format("facet[%s]", COMPILATION_ATTRIBUTE), "Bestände",
                    String.format("facet[%s]", ASSORTMENTS_ATTRIBUTE), "Kollektionen")
            ),
            "en", new I18nImpl("en", Map.of(
                    String.format("facet[%s]", LOCATION_ATTRIBUTE), "Location",
                    String.format("facet[%s]", COLLECTION_KEY_ATTRIBUTE), "Collections and Institutes",
                    String.format("facet[%s]", COMPILATION_ATTRIBUTE), "Compilations",
                    String.format("facet[%s]", ASSORTMENTS_ATTRIBUTE), "Assortments")
            )
    );

    private final ObjectProvider<? extends MappingSupplier> mappingSupplier;
    private final I18nImpl defaultTranslator;

    @Autowired
    public I18n(final ObjectProvider<? extends MappingSupplier> supplier) {
        this.mappingSupplier = supplier;
        this.defaultTranslator = translators.get("de");
    }

    public Translations get(final String lang) {
        return this.translators.getOrDefault(lang, this.defaultTranslator);
    }

}
