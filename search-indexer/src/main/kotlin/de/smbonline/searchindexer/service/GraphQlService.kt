package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.GraphQlAPI
import de.smbonline.searchindexer.graphql.queries.fragment.*
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class GraphQlService @Autowired constructor(private val graphQlAPI: GraphQlAPI) {

    fun fetchApprovedCollectionKeys(attrKey: String): Array<String> {
        var result: Array<String>
        runBlocking {
            val approval = graphQlAPI.fetchAttributeApproval(attrKey)
            result = if (approval?.collectionKeys != null) {
                approval.collectionKeys.substring(1, approval.collectionKeys.length - 1)
                        .split(',')
                        .map { it.trim() }
                        .toTypedArray()
            } else emptyArray()
        }
        return result
    }

    fun fetchAssortments(): List<AssortmentData> {
        var result: List<AssortmentData>
        runBlocking {
            result = graphQlAPI.fetchAssortments()
        }
        return result
    }

    fun fetchThesaurus(id: Long): ThesaurusData? {
        var result: ThesaurusData?
        runBlocking {
            result = graphQlAPI.fetchThesaurus(id)
        }
        return result
    }

    fun fetchThesaurusTranslation(id: Long, language: String): ThesaurusTranslationData? {
        var result: ThesaurusTranslationData?
        runBlocking {
            result = graphQlAPI.fetchThesaurusTranslation(id, language)
        }
        return result
    }

    fun fetchPerson(id: Long): PersonData? {
        var result: PersonData?
        runBlocking {
            result = graphQlAPI.fetchPerson(id)
        }
        return result
    }

    fun fetchExhibition(id: Long): ExhibitionData? {
        var result: ExhibitionData?
        runBlocking {
            result = graphQlAPI.fetchExhibition(id)
        }
        return result
    }

    fun fetchMaterialAndTechnique(id: Long): MaterialData? {
        var result: MaterialData?
        runBlocking {
            result = graphQlAPI.fetchMaterialReference(id)
        }
        return result
    }

    fun fetchGeographicalReference(id: Long): GeoData? {
        var result: GeoData?
        runBlocking {
            result = graphQlAPI.fetchGeoReference(id)
        }
        return result
    }

    fun fetchInvolvedParties(objectId: Long): List<InvolvedPartyData> {
        var result: List<InvolvedPartyData>
        runBlocking {
            result = graphQlAPI.fetchInvolvedParties(objectId)
        }
        return result
    }

    fun fetchExhibitions(objectId: Long): List<ExhibitionData> {
        var result: List<ExhibitionData>
        runBlocking {
            result = graphQlAPI.fetchExhibitions(objectId)
        }
        return result
    }

    fun fetchObjectIds(startId: Long?, endId: Long?, offset: Int, limit: Int): Array<Long> {
        var result: Array<Long>
        runBlocking {
            result = graphQlAPI.fetchObjectIds(startId ?: 0, endId ?: Long.MAX_VALUE, offset, limit)
        }
        return result
    }

    fun fetchObject(id: Long, lang: String): ObjectData? {
        var result: ObjectData?
        runBlocking {
            result = graphQlAPI.loadObject(id, lang)
        }
        return result
    }
}