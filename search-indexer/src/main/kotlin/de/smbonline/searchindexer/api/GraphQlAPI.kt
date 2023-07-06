package de.smbonline.searchindexer.api

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.BigDecimal
import com.apollographql.apollo.api.Error
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import com.apollographql.apollo.coroutines.await
import de.smbonline.searchindexer.conf.GraphQlConfig
import de.smbonline.searchindexer.graphql.queries.*
import de.smbonline.searchindexer.graphql.queries.fragment.*
import de.smbonline.searchindexer.log.LogExecutionTime
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class GraphQlAPI @Autowired constructor(private val config: GraphQlConfig) {

    private val client: ApolloClient

    init {
        client = initApolloClient()
    }

    suspend fun ping(): List<Error> {
        val result = client.query(PingQuery()).await()
        return result.errors ?: emptyList()
    }

    @LogExecutionTime
    suspend fun fetchAssortments(lang: String): List<AssortmentData> {
        val result = client.query(FetchAssortmentsQuery(lang)).await()
        return result.data?.smb_assortments?.map { it.fragments.assortmentData }.orEmpty()
    }

    suspend fun fetchBuildings(): List<BuildingData> {
        val result = client.query(FetchBuildingsQuery()).await()
        return result.data?.smb_buildings?.map { it.fragments.buildingData }.orEmpty()
    }

    suspend fun fetchCollections(): List<CollectionData> {
        val result = client.query(FetchCollectionsQuery()).await()
        return result.data?.smb_collections?.map { it.fragments.collectionData }.orEmpty()
    }

    suspend fun fetchCompilations(): List<CompilationData> {
        val result = client.query(FetchCompilationsQuery()).await()
        return result.data?.smb_org_unit?.map { it.fragments.compilationData }.orEmpty()
    }

    suspend fun fetchThesaurus(id: Long): ThesaurusData? {
        val result = client.query(FetchThesaurusQuery(id)).await()
        return result.data?.smb_thesaurus_by_pk?.fragments?.thesaurusData
    }

    suspend fun fetchThesaurusTranslation(id: Long, lang: String): ThesaurusTranslationData? {
        val result = client.query(FetchThesaurusTranslationQuery(id, lang)).await()
        return result.data?.smb_thesaurus_translations?.firstOrNull()?.fragments?.thesaurusTranslationData
    }

    suspend fun fetchPerson(id: Long): PersonData? {
        val result = client.query(FetchPersonQuery(id)).await()
        return result.data?.smb_persons_by_pk?.fragments?.personData
    }

    suspend fun fetchMaterialReference(id: Long): MaterialData? {
        val result = client.query(FetchMaterialByIdQuery(id)).await()
        return result.data?.smb_material_references_by_pk?.fragments?.materialData
    }

    suspend fun fetchGeoReference(id: Long): GeoData? {
        val result = client.query(FetchGeographicalReferenceByIdQuery(id)).await()
        return result.data?.smb_geographical_references_by_pk?.fragments?.geoData
    }

    suspend fun fetchExhibition(id: Long): ExhibitionData? {
        val result = client.query(FetchExhibitionQuery(id)).await()
        return result.data?.smb_exhibitions_by_pk?.fragments?.exhibitionData
    }

    suspend fun fetchInvolvedParties(objectId: Long): List<InvolvedPartyData> {
        val result = client.query(FetchInvolvedPartiesQuery(objectId)).await()
        return result.data?.smb_persons_objects?.map { it.fragments.involvedPartyData }.orEmpty()
    }

    suspend fun fetchExhibitions(objectId: Long): List<ExhibitionData> {
        val result = client.query(FetchExhibitionLinksQuery(objectId)).await()
        return result.data?.smb_exhibitions_objects?.map { it.exhibition.fragments.exhibitionData }.orEmpty()
    }

    /**
     * Check if Object with given id exists.
     * @param id of requested Object
     * @return whether Object exists
     */
    suspend fun existsObject(id: Long): Boolean {
        val result = client.query(FetchObjectQuery(id)).await()
        return result.data?.smb_objects_by_pk?.id != null
    }

    /**
     * Fetch an Object with given id from database. The language specifies the desired AttributeTranslations.
     * @param id of requested Object
     * @param lang language key
     * @return Object if exists
     */
    @LogExecutionTime
    suspend fun loadObject(id: Long, lang: String): ObjectData? {
        val result = client.query(FetchObjectWithAttributesQuery(id, lang)).await()
        return result.data?.smb_objects_by_pk?.fragments?.objectData
    }

    @LogExecutionTime
    suspend fun fetchObjectIds(startId: Long, endId: Long, offset: Int, limit: Int): Array<Long> {
        val result = client.query(FetchObjectsQuery(startId, endId, offset, limit)).await()
        return result.data?.smb_objects?.map { (it.id as BigDecimal).longValueExact() }.orEmpty().toTypedArray()
    }

    @LogExecutionTime
    suspend fun fetchAttributeApproval(attrKey: String): ApprovalData? {
        val result = client.query(FetchAttributeApprovalByKeyQuery(attrKey)).await()
        return result.data?.smb_attribute_approval?.firstOrNull()?.fragments?.approvalData;
    }

    private fun initApolloClient(): ApolloClient {
        return ApolloClient.builder()
                .serverUrl(config.endpoint)
                .normalizedCache(buildCacheFactory())
                .okHttpClient(buildHttpClient())
                .build()
    }

    private fun buildCacheFactory(): LruNormalizedCacheFactory {
        return LruNormalizedCacheFactory(EvictionPolicy.builder()
                .maxSizeBytes(config.inMemoryCacheSize.toLong())
                .build())
    }

    private fun buildHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
                .followRedirects(true)
                .followSslRedirects(true)
                .addInterceptor { chain: Interceptor.Chain ->
                    val requestBuilder = chain.request().newBuilder()
                    for (entry in config.headers.entries) {
                        requestBuilder.addHeader(entry.key, entry.value)
                    }
                    chain.proceed(requestBuilder.build())
                }
                .build()
    }

}
