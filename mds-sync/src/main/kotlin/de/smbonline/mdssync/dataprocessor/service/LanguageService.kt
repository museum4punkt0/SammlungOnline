package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.LanguageData
import de.smbonline.mdssync.dataprocessor.repository.LanguageRepository
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class LanguageService {

    @Autowired
    lateinit var languageRepository: LanguageRepository

    fun getSupportedLanguages(): Array<String> {
        val data: Array<String>
        runBlocking {
            data = languageRepository.fetchLanguages()
                    .filter { it.syncEnabled == true }.map { it.code }.toTypedArray()
        }
        return data
    }
}