package de.smbonline.searchindexer.norm;

import de.smbonline.searchindexer.graphql.queries.fragment.ThesaurusData;
import de.smbonline.searchindexer.norm.impl.shared.Resolvings;
import de.smbonline.searchindexer.service.GraphQlService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

public abstract class ThesaurusResolvingNormalizer<T> extends NormalizerBase<T> {

    protected final ObjectProvider<GraphQlService> graphQl;

    protected ThesaurusResolvingNormalizer(final String attribute, final ObjectProvider<GraphQlService> graphQl) {
        super(attribute);
        this.graphQl = graphQl;
    }

    protected @Nullable String resolveThesaurusLabel(
            final @Nullable Object thesaurusId,
            final String language,
            final boolean hierarchical) {
        return Resolvings.resolveThesaurusLabel(this.graphQl.getObject(), thesaurusId, language, hierarchical);
    }

    protected @Nullable ThesaurusData fetchThesaurus(final Long id) {
        return this.graphQl.getObject().fetchThesaurus(id);
    }
}
