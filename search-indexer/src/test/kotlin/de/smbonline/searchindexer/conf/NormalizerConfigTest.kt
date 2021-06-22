package de.smbonline.searchindexer.conf

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test

class NormalizerConfigTest {

    @Test
    fun textOneNormalizerForEachRelevantAttribute() {
        val cfg = NormalizerConfig()
        val reg = NormalizerConfigurer(cfg).initConverterRegistry();
        for (attr in ALL_RELEVANT_ATTRIBUTES) {
            Assertions.assertThat(reg.getNormalizer(attr)).isNotNull
        }
    }

}