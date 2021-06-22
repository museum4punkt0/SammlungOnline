package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.IgnorableKeyRepository
import de.smbonline.mdssync.dataprocessor.repository.LanguageRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class IgnorableKeyService {

    @Autowired
    lateinit var ignorableKeyRepo: IgnorableKeyRepository

    fun getIgnorableKeys(): List<String> {
        val data = ignorableKeyRepo.fetchAllIgnorableKeysBlocking()
        return data.map { it.key }.sorted()
    }
}