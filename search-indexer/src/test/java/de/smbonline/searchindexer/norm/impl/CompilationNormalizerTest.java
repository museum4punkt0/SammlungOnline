package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static de.smbonline.searchindexer.norm.impl.Mockings.*;
import static de.smbonline.searchindexer.norm.impl.TestData.*;
import static org.assertj.core.api.Assertions.assertThat;

public class CompilationNormalizerTest {

    @Test
    public void testAttributeKey() {
        CompilationNormalizer normalizer = new CompilationNormalizer(graphQlProvider(mappingSupplierMock()));
        assertThat(normalizer.getAttributeKey()).isEqualTo("compilation");
    }

    @Test
    public void testMapping() {
        // given
        ObjectData obj = createObject(123L, Pair.of("__orgUnit", "KBArchitekturzeichnung"));
        // when
        CompilationNormalizer normalizer = new CompilationNormalizer(graphQlProvider(mappingSupplierMock()));
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isEqualTo("Sammlung Architektur");
    }

    @Test
    public void testMappings() {
        CompilationNormalizer normalizer = new CompilationNormalizer(graphQlProvider(mappingSupplierMock()));

        // check if all mappings are implemented
        for (Map.Entry<String, String> entry : compilationMapping().entrySet()) {
            // given
            ObjectData obj = createObject(123L, Pair.of("__orgUnit", entry.getKey()));
            // when
            String value = normalizer.resolveAttributeValue(obj, "de");
            // then
            assertThat(value).isEqualTo(entry.getValue());
        }
    }

    @Test
    public void testMappingNotFound() {
        // given
        ObjectData obj = createObject(123L, Pair.of("__orgUnit", "fününününü"));
        // when
        CompilationNormalizer normalizer = new CompilationNormalizer(graphQlProvider(mappingSupplierMock()));
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }

    @Test
    public void testNoCompilationInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("blubb", "bla"), Pair.of("key", "val"));
        // when
        CompilationNormalizer normalizer = new CompilationNormalizer(graphQlProvider(mappingSupplierMock()));
        String value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }
}
