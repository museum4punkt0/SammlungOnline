package de.smbonline.searchindexer.norm.impl.shared;

import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusTranslationData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

import static de.smbonline.searchindexer.util.Validations.requireId;

public final class Resolvings {

    private static final String HIERARCHY_SEPARATOR = " / ";

    public static @Nullable String resolveThesaurusLabel(
            final GraphQlService graphQl,
            final @Nullable Object thesaurusId,
            final String language,
            final boolean hierarchical) {
        if (thesaurusId == null) {
            return null;
        }
        Long id = requireId(thesaurusId);
        String translation = hierarchical
                ? resolveHierarchicalTranslation(graphQl, id, language)
                : resolveTranslation(graphQl, id, language);
        if (translation == null) {
            ThesaurusData thesaurus = graphQl.fetchThesaurus(id);
            translation = thesaurus == null ? null : toThesaurusLabel(thesaurus.getName(), hierarchical);
        }
        return translation;
    }

    private static @Nullable String resolveTranslation(final GraphQlService graphQl, final Long id, final String language) {
        ThesaurusTranslationData translation = graphQl.fetchThesaurusTranslation(id, language);
        if (translation == null) {
            return null;
        }
        return extractLabel(translation, false);
    }

    private static @Nullable String resolveHierarchicalTranslation(final GraphQlService graphQl, final Long id, final String language) {
        ThesaurusTranslationData[] translations = fetchFullHierarchy(graphQl, id, language);
        if (translations.length == 0) {
            return null;
        }
        String label = extractLabel(translations[translations.length - 1], true);
        if (label == null) {
            return null; // nothing to do
        }
        if (label.contains(HIERARCHY_SEPARATOR)) {
            return label; // already done
        }
        // else build hierarchy

        // last element n-1 was the one we requested, 0..n-2 are parents
        StringBuilder parents = new StringBuilder();
        for (int i = 0; i < translations.length - 1; i++) {
            String parentLabel = extractLabel(translations[i], true);
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
            nextId = hasParent ? requireId(next.getThesaurus().getParentId()) : null;
        }
        return hierarchy.toArray(ThesaurusTranslationData[]::new);
    }


    private static @Nullable String extractLabel(final ThesaurusTranslationData translation, final boolean hierarchicalIfShortcutAvailable) {
        return StringUtils.isBlank(translation.getLabel())
                ? toThesaurusLabel(translation.getThesaurus().getName(), hierarchicalIfShortcutAvailable) : translation.getLabel();
    }

    private static @Nullable String toThesaurusLabel(
            final @Nullable String thesaurusName,
            final boolean hierarchicalIfShortcutAvailable) {

        if (StringUtils.isBlank(thesaurusName)) {
            return null;
        }
        if (thesaurusName.contains("##")) {
            // In MDS a hierarchy is shown with ## separators in the name
            String[] labels = thesaurusName.split("##");
            String label = labels[labels.length - 1];
            if (hierarchicalIfShortcutAvailable) {
                String[] hierarchy = ArrayUtils.remove(labels, labels.length - 1);
                return label + " (" + String.join(HIERARCHY_SEPARATOR, hierarchy) + ")";
            } else {
                return label;
            }
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
