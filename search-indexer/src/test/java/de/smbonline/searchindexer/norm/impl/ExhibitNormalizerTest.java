package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class ExhibitNormalizerTest {

    @Test
    public void testAttributeKey() {
        ExhibitNormalizer normalizer = new ExhibitNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("exhibit");
    }

    @Test
    public void testUseCorrectUnknownExhibitionSpace() {
        ExhibitNormalizer normalizer = new ExhibitNormalizer();
        normalizer.setUnknownExhibitionSpace("foobar");
        assertThat(normalizer.getUnknownExhibitionSpace()).isEqualTo("foobar");
    }

    @Test
    public void testMapping() {
        ExhibitNormalizer normalizer = new ExhibitNormalizer();
        normalizer.setUnknownExhibitionSpace("no-value");

        ObjectData obj = createObject(123456L);
        assertThat(normalizer.resolveAttributeValue(obj, "de")).isFalse();
        obj = withExhibitionSpace(obj, "no-value");
        assertThat(normalizer.resolveAttributeValue(obj, "de")).isNull();
        obj = withExhibitionSpace(obj, "Room 123");
        assertThat(normalizer.resolveAttributeValue(obj, "de")).isTrue();
    }
}
