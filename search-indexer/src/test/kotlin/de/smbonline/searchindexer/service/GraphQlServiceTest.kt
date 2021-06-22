package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.GraphQlAPI
import de.smbonline.searchindexer.conf.ALL_RELEVANT_ATTRIBUTES
import de.smbonline.searchindexer.conf.NormalizerConfig
import de.smbonline.searchindexer.conf.NormalizerConfigurer
import de.smbonline.searchindexer.norm.impl.TestData
import org.junit.jupiter.api.Test
import org.assertj.core.api.Assertions.*;
import io.mockk.*
class GraphQlServiceTest {

    @Test
    fun testTransformSearchObject() {
        // given
        val api = mockk<GraphQlAPI>()
        val obj = TestData.createRichObject();
        val id = (obj.id as Number).toLong()
        coEvery { api.existsObject(id) } returns true
        coEvery { api.loadObject(id, "de") } returns obj

        // when
        val cfg = NormalizerConfig()
        cfg.locationSeparator = "->" // arrow syntax is used in rich-object, so make sure we use it here
        val service = GraphQlService(api, NormalizerConfigurer(cfg).initConverterRegistry())
        val searchObject = service.resolveObjectById(id, "de")!!
        println(searchObject)

        // then
        assertThat(searchObject).isNotNull
        assertThat(searchObject.id).isEqualTo(id)
        assertThat(searchObject.language).isEqualTo("de")
        assertThat(searchObject.attributes.attributes).isNotEmpty
        assertThat(searchObject.attributes.attributes).containsEntry("@id", "$id")
        assertThat(searchObject.attributes.attributes).containsEntry("@initialImport", obj.createdAt)
        assertThat(searchObject.attributes.attributes).containsEntry("@lastSynced", obj.updatedAt)
        for (attrKey in ALL_RELEVANT_ATTRIBUTES) {
            assertThat(searchObject.attributes.attributes).containsKey(attrKey);
        }
        assertThat(searchObject.attributes.attributes).containsOnlyKeys(*ALL_RELEVANT_ATTRIBUTES, "@id", "@initialImport", "@lastSynced");
    }
}