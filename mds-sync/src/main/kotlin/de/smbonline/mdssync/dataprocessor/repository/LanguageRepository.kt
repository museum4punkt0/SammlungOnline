package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchLanguageByNameQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchLanguagesQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertOrUpdateLanguageMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.LanguageData
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.exc.SyncFailedException
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class LanguageRepository {

    @Autowired
    private lateinit var graphQlClient: GraphQlClient

    fun fetchLanguagesBlocking(): List<LanguageData> {
        val result: List<LanguageData>
        runBlocking {
            result = fetchLanguages()
        }
        return result
    }

    suspend fun fetchLanguages(): List<LanguageData> {
        val result = graphQlClient.client.query(
                FetchLanguagesQuery()
        ).toDeferred().await()
        val languages = result.data?.smb_language.orEmpty()
        return languages.map { it.fragments.languageData }
    }

    suspend fun fetchLanguage(lang: String): LanguageData? {
        val result = graphQlClient.client.query(
                FetchLanguageByNameQuery(lang = lang)
        ).toDeferred().await()
        val language = result.data?.smb_language?.firstOrNull()
        return language?.fragments?.languageData;
    }

    suspend fun fetchOrInsertLanguage(lang: String): Long {
        val language = fetchLanguage(lang)
        return if (language == null) insertLanguage(lang) else (language.id as BigDecimal).longValueExact()
    }

    suspend fun insertLanguage(lang: String): Long {
        val result = graphQlClient.client.mutate(
                InsertOrUpdateLanguageMutation(lang = lang)
        ).toDeferred().await()
        ensureNoError(result)

        result.data?.insert_smb_language_one ?: throw SyncFailedException("failed to insert language $lang")
        return (result.data!!.insert_smb_language_one!!.id as BigDecimal).longValueExact()
    }
}