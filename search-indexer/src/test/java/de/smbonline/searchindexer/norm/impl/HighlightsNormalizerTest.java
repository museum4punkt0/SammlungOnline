package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class HighlightsNormalizerTest {

    @Test
    public void testAttributeKey() {
        HighlightsNormalizer normalizer = new HighlightsNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("highlight");
    }

    @Test
    public void testWithHighlights() {
        ObjectData obj = createRichObject();
        obj.getHighlights().add(createHighlight(789L));

        HighlightsNormalizer normalizer = new HighlightsNormalizer();
        Boolean value = normalizer.resolveAttributeValue(obj, "de");
        assertThat(value).isTrue();
    }

    @Test
    public void testWithoutHighlights() {
        ObjectData obj = createRichObject();
        obj.getHighlights().clear();

        HighlightsNormalizer normalizer = new HighlightsNormalizer();
        Boolean value = normalizer.resolveAttributeValue(obj, "de");
        assertThat(value).isFalse();
    }
}
