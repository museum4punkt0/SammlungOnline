package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import de.smbonline.searchindexer.norm.ThesaurusResolvingNormalizer;
import de.smbonline.searchindexer.service.GraphQlService;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.EXHIBITION_SPACE_ATTRIBUTE;

// TODO use this in favor of ExhibitionSpaceNormalizer
public class ExhibitionSpaceNormalizer2 extends ThesaurusResolvingNormalizer<String> {

    public ExhibitionSpaceNormalizer2(final ObjectProvider<GraphQlService> graphQl) {
        super(EXHIBITION_SPACE_ATTRIBUTE, graphQl);
    }

    @Override
    public String[] getRelevantAttributeKeys() {
        return new String[]{
                "ObjCurrentLocationVoc",
                "ObjNormalLocationVoc"
        };
    }

    @Override
    public @Nullable String resolveAttributeValue(final ObjectData source, final String language) {
        // TODO only building, sector, level, room - neither collection nor appendix
        return resolveThesaurusLabel(source.getLocationVocId(), language, true);
    }
}
