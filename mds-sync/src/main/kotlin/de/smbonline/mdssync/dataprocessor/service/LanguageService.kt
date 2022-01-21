package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.LanguageRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class LanguageService {

    @Autowired
    lateinit var languageRepository: LanguageRepository

    fun getSupportedLanguages(): List<String> {
        val data = languageRepository.fetchLanguagesBlocking()
        return data.map { it.code }
    }
}