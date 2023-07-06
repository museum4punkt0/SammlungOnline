package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.IgnorableKeyData
import de.smbonline.mdssync.dataprocessor.repository.IgnorableKeyRepository
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class IgnorableKeyService @Autowired constructor(private val ignorableKeyRepo: IgnorableKeyRepository) {

    fun getIgnorableKeys(): Array<String> {
        val data: List<IgnorableKeyData>
        runBlocking {
            data = ignorableKeyRepo.fetchAllIgnorableKeys()
        }
        return data.map { it.key }.sorted().toTypedArray()
    }
}