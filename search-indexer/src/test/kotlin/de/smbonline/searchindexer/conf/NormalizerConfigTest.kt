package de.smbonline.searchindexer.conf

import de.smbonline.searchindexer.service.GraphQlService
import io.mockk.mockk
import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.ObjectProvider

class NormalizerConfigTest {

    @Test
    fun textOneNormalizerForEachRelevantAttribute() {
        val cfg = NormalizerConfig()
        val provider = mockk<ObjectProvider<GraphQlService>>()
        val reg = NormalizerConfigurer().initConverterRegistry(cfg, provider)
        for (attr in ALL_RELEVANT_ATTRIBUTES) {
            Assertions.assertThat(reg.getNormalizer(attr)).isNotNull
        }
    }

}