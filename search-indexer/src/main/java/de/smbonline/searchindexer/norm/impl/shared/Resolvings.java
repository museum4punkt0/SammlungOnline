package de.smbonline.searchindexer.norm.impl.shared;

import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusTranslationData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

public final class Resolvings {

    private static final String HIERARCHY_SEPARATOR = " / ";

    public static @Nullable String resolveThesaurusLabel(final GraphQlService graphQl, final @Nullable Object thesaurusId, final String language) {
        if (thesaurusId == null) {
            return null;
        }
        Long id = ((Number) thesaurusId).longValue();
        String translation = resolveHierarchicalLabel(graphQl, id, language);
        if (translation == null) {
            ThesaurusData thesaurus = graphQl.fetchThesaurus(id);
            translation = thesaurus == null ? null : toThesaurusLabel(thesaurus.getName());
        }
        return translation;
    }

    private static @Nullable String resolveHierarchicalLabel(final GraphQlService graphQl, final Long id, final String language) {
        ThesaurusTranslationData[] translations = fetchFullHierarchy(graphQl, id, language);
        if (translations.length == 0) {
            return null;
        }
        // last element is the one we requested
        // 0..n-2 are parents
        String label = extractLabel(translations[translations.length - 1]);
        StringBuilder parents = new StringBuilder();
        for (int i = 0; i < translations.length - 1; i++) {
            String parentLabel = extractLabel(translations[i]);
            if (parentLabel != null) {
                if (parentLabel.contains(HIERARCHY_SEPARATOR)) {
                    parents.append(parentLabel);
                    break; // full hierarchy in label; no need to resolve more
                }
                if (!parents.isEmpty()) {
                    parents.append(HIERARCHY_SEPARATOR);
                }
                parents.append(parentLabel);
            }
        }
        return parents.isEmpty() ? label : label + " (" + parents + ")";
    }

    private static ThesaurusTranslationData[] fetchFullHierarchy(final GraphQlService graphQl, final Long id, final String language) {
        List<ThesaurusTranslationData> hierarchy = new ArrayList<>();
        for (Long nextId = id; nextId != null; ) {
            boolean hasParent = false;
            ThesaurusTranslationData next = graphQl.fetchThesaurusTranslation(nextId, language);
            if (next != null) {
                hierarchy.add(0, next);
                if (next.getThesaurus().getParentId() != null) {
                    hasParent = true;
                }
            }
            nextId = hasParent ? ((Number) next.getThesaurus().getParentId()).longValue() : null;
        }
        return hierarchy.toArray(ThesaurusTranslationData[]::new);
    }


    private static @Nullable String extractLabel(final ThesaurusTranslationData translation) {
        return StringUtils.isBlank(translation.getLabel())
                ? toThesaurusLabel(translation.getThesaurus().getName()) : translation.getLabel();
    }

    private static @Nullable String toThesaurusLabel(final @Nullable String thesaurusName) {
        if (StringUtils.isBlank(thesaurusName)) {
            return null;
        }
        if (thesaurusName.contains("##")) {
            // In MDS a hierarchy is shown with ## separators in the name
            String[] labels = thesaurusName.split("##");
            String label = labels[labels.length - 1];
            String[] hierarchy = ArrayUtils.remove(labels, labels.length - 1);
            return label + " (" + String.join(HIERARCHY_SEPARATOR, hierarchy) + ")";
        }
        if (thesaurusName.startsWith("http")) {
            // yes ... sometimes a link is stored in the name - we hope that the last path-segment gives some kind
            // of valuable information like it does for http://iconclass.org/rkd/:id
            return thesaurusName.substring(thesaurusName.lastIndexOf('/') + 1);
        }
        return thesaurusName.trim();
    }

    private Resolvings() {
        // no instances
    }
}
