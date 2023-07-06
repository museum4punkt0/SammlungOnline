package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.GraphQlAPI
import de.smbonline.searchindexer.conf.ALL_RELEVANT_ATTRIBUTES
import de.smbonline.searchindexer.conf.NormalizerConfig
import de.smbonline.searchindexer.conf.NormalizerConfigurer
import de.smbonline.searchindexer.graphql.queries.fragment.*
import de.smbonline.searchindexer.norm.impl.TestData
import io.mockk.coEvery
import io.mockk.every
import io.mockk.mockk
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.ObjectProvider

class GraphQlDataResolverTest {

    @Test
    fun test965869() {
        val obj = TestData.create("965869")
        val api = mockAPI(obj)
        val provider = mockk<ObjectProvider<GraphQlService>>()
        val reg = NormalizerConfigurer().initConverterRegistry(NormalizerConfig(), provider)
        val service = GraphQlService(api)
        every { provider.getObject() } returns service

        // no assertions, just ensure we don't run into exception
        val searchObject = GraphQlDataResolver(provider.getObject(), reg).resolveObjectById(965869, "de")!!
        println(searchObject)
    }

    @Test
    fun testResolveThesaurusHierarchy() {
        val obj = TestData.create("965869")
        val api = mockAPI(obj)
        val provider = mockk<ObjectProvider<GraphQlService>>()
        val reg = NormalizerConfigurer().initConverterRegistry(NormalizerConfig(), provider)
        val service = GraphQlService(api)
        every { provider.getObject() } returns service
        val label = GraphQlDataResolver(provider.getObject(), reg).resolveThesaurus(1L, "de")?.getTypedAttribute<String>("formatted")
        assertThat(label).isEqualTo("one (three / two)")
    }

    @Test
    fun testTransformSearchObject() {
        // given
        val obj = TestData.createRichObject()
        val id = (obj.id as Number).toLong()
        val api = mockAPI(obj)
        val provider = mockk<ObjectProvider<GraphQlService>>()
        val service = GraphQlService(api)
        every { provider.getObject() } returns service

        // when
        val cfg = NormalizerConfig()
        cfg.locationSeparator = "->" // arrow syntax is used in rich-object, so make sure we use it here
        val reg = NormalizerConfigurer().initConverterRegistry(cfg, provider)
        val resolver = GraphQlDataResolver(provider.getObject(), reg)
        val searchObject = resolver.resolveObjectById(id, "de")!!
        println(searchObject)

        // then
        assertThat(searchObject).isNotNull
        assertThat(searchObject.id).isEqualTo(id)
        assertThat(searchObject.language).isEqualTo("de")
        assertThat(searchObject.attributes).isNotEmpty
        assertThat(searchObject.attributes).containsEntry("@id", "$id")
        assertThat(searchObject.attributes).containsEntry("@initialImport", "${obj.createdAt}")
        assertThat(searchObject.attributes).containsEntry("@lastSynced", "${obj.updatedAt}")
        for (attrKey in ALL_RELEVANT_ATTRIBUTES) {
            assertThat(searchObject.attributes).containsKey(attrKey)
        }
        assertThat(searchObject.attributes).containsOnlyKeys(*ALL_RELEVANT_ATTRIBUTES, "@id", "@initialImport", "@lastSynced")
    }

    private fun mockAPI(obj: ObjectData): GraphQlAPI {
        val the3 = ThesaurusTranslationData("smb_thesaurus_translations", thesaurus(3L, null), "three")
        val the2 = ThesaurusTranslationData("smb_thesaurus_translations", thesaurus(2L, the3.thesaurus), "two")
        val the1 = ThesaurusTranslationData("smb_thesaurus_translations", thesaurus(1L, the2.thesaurus), "one")
        val approvals = ApprovalData("smb_attribute_approval", "field", "[AMP]")
        val api = mockk<GraphQlAPI>()
        val id = (obj.id as Number).toLong()
        coEvery { api.existsObject(id) } returns true
        coEvery { api.loadObject(id, "de") } returns obj
        coEvery { api.fetchThesaurus(1L) } returns thesaurusData(the1.thesaurus)
        coEvery { api.fetchThesaurus(2L) } returns thesaurusData(the2.thesaurus)
        coEvery { api.fetchThesaurus(3L) } returns thesaurusData(the3.thesaurus)
        coEvery { api.fetchThesaurusTranslation(1L, "de") } returns the1
        coEvery { api.fetchThesaurusTranslation(2L, "de") } returns the2
        coEvery { api.fetchThesaurusTranslation(3L, "de") } returns the3
        coEvery { api.fetchAttributeApproval(any()) } returns approvals
        coEvery { api.fetchAssortments(any()) } returns listOf(
                AssortmentData("smb_assortments", 1L, "123456789", null, "SPECIFIC",
                        listOf(AssortmentData.Object("smb_assortments_objects", id)),
                        listOf(AssortmentData.I18n("smb_assortments_translation", "123456789"))
                )
        )
        coEvery { api.fetchInvolvedParties(id) } returns listOf(
                InvolvedPartyData("smb_persons_objects", InvolvedPartyData.Person(
                        "smb_persons", 99L, "xailabs dev", null
                ), null, 0)
        )
        return api
    }

    private fun thesaurus(id: Long, parent: ThesaurusTranslationData.Thesaurus?): ThesaurusTranslationData.Thesaurus {
        return ThesaurusTranslationData.Thesaurus("smb_thesaurus", id, "the$id", parent?.id)
    }

    private fun thesaurusData(same: ThesaurusTranslationData.Thesaurus): ThesaurusData {
        return ThesaurusData("smb_thesaurus", same.id, same.name, same.parentId, "")
    }
}