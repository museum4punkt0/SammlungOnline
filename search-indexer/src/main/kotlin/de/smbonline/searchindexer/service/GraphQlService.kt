package de.smbonline.searchindexer.service

import com.google.common.cache.Cache
import com.google.common.cache.CacheBuilder
import de.smbonline.searchindexer.api.GraphQlAPI
import de.smbonline.searchindexer.graphql.queries.fragment.*
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.concurrent.TimeUnit

@Service
class GraphQlService @Autowired constructor(private val graphQlAPI: GraphQlAPI) : MappingSupplier {

    private val assortmentsCache: Cache<String, List<AssortmentData>> = CacheBuilder.newBuilder()
            .expireAfterAccess(15, TimeUnit.MINUTES)
            .expireAfterWrite(60, TimeUnit.MINUTES).build()
    private val buildingsCache: Cache<String, List<BuildingData>> = CacheBuilder.newBuilder()
            .expireAfterAccess(30, TimeUnit.MINUTES)
            .expireAfterWrite(60, TimeUnit.MINUTES).build()
    private val collectionsCache: Cache<String, List<CollectionData>> = CacheBuilder.newBuilder()
            .expireAfterAccess(30, TimeUnit.MINUTES)
            .expireAfterWrite(60, TimeUnit.MINUTES).build()
    private val compilationsCache: Cache<String, List<CompilationData>> = CacheBuilder.newBuilder()
            .expireAfterAccess(30, TimeUnit.MINUTES)
            .expireAfterWrite(60, TimeUnit.MINUTES).build()
    private val approvalsCache: Cache<String, Array<String>> = CacheBuilder.newBuilder()
            .expireAfterAccess(1, TimeUnit.MINUTES)
            .expireAfterWrite(2, TimeUnit.MINUTES).build()

    private val caches = mapOf(
            Pair("assortments", assortmentsCache),
            Pair("buildings", buildingsCache),
            Pair("collections", collectionsCache),
            Pair("compilations", compilationsCache),
            Pair("approvals", approvalsCache)
    )

    fun evictCaches() {
        caches.keys.forEach { evictCache(it) }
    }

    fun evictCache(which: String) {
        caches[which]?.let {
            it.invalidateAll()
            it.cleanUp()
        }
    }

    fun fetchApprovedCollectionKeys(attrKey: String): Array<String> {
        return approvalsCache.get(attrKey) {
            runBlocking {
                val approval = graphQlAPI.fetchAttributeApproval(attrKey)
                return@runBlocking if (approval?.collectionKeys != null) {
                    approval.collectionKeys.substring(1, approval.collectionKeys.length - 1)
                            .split(',')
                            .map { it.trim() }
                            .toTypedArray()
                } else emptyArray()
            }
        }
    }

    override fun fetchAssortments(lang: String): List<AssortmentData> {
        return assortmentsCache.get(lang) {
            runBlocking {
                return@runBlocking graphQlAPI.fetchAssortments(lang)
            }
        }
    }

    override fun fetchBuildings(): List<BuildingData> {
        return buildingsCache.get("all") {
            runBlocking {
                return@runBlocking graphQlAPI.fetchBuildings()
            }
        }
    }

    override fun fetchCompilations(): List<CompilationData> {
        return compilationsCache.get("all") {
            runBlocking {
                return@runBlocking graphQlAPI.fetchCompilations()
            }
        }
    }

    override fun fetchCollections(): List<CollectionData> {
        return collectionsCache.get("all") {
            runBlocking {
                return@runBlocking graphQlAPI.fetchCollections()
            }
        }
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