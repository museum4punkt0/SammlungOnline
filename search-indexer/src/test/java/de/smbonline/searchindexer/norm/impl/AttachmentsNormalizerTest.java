package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class AttachmentsNormalizerTest {

    @Test
    public void testAttributeKey() {
        AttachmentsNormalizer normalizer = new AttachmentsNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("attachments");
    }

    @Test
    public void testWithAttachments() {
        ObjectData obj = createRichObject();
        obj.getAttachments().add(createAttachment("dummy"));

        AttachmentsNormalizer normalizer = new AttachmentsNormalizer();
        Boolean value = normalizer.resolveAttributeValue(obj);
        assertThat(value).isTrue();
    }

    @Test
    public void testWithoutAttachments() {
        ObjectData obj = createRichObject();
        obj.getAttachments().clear();

        AttachmentsNormalizer normalizer = new AttachmentsNormalizer();
        Boolean value = normalizer.resolveAttributeValue(obj);
        assertThat(value).isFalse();
    }
}
