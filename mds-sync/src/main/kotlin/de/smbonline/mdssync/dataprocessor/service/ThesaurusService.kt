package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.ThesaurusData
import de.smbonline.mdssync.dataprocessor.repository.ThesaurusRepository
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.Thesaurus
import de.smbonline.mdssync.dto.ThesaurusExt
import de.smbonline.mdssync.dto.ThesaurusTranslation
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.Engine
import kotlinx.coroutines.runBlocking
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class ThesaurusService(
        private val thesaurusRepository: ThesaurusRepository
) : DataService<Thesaurus>, Engine<WrapperDTO>() {

    override fun save(element: Thesaurus) {
        runBlocking {
            if (element is ThesaurusTranslation) {
                val id = saveThesaurus(element.thesaurus);
                saveThesaurusTranslation(element, id)
            } else {
                saveThesaurus(element);
            }
        }
    }

    override fun delete(element: Thesaurus) {
        runBlocking {
            if (element is ThesaurusTranslation) {
                deleteThesaurusTranslation(element)
            } else {
                deleteThesaurus(element)
            }
        }
    }

    override fun isResponsible(element: WrapperDTO): Boolean {
        return element.dto is Thesaurus
    }

    override fun executeCommand(element: WrapperDTO) {
        when (element.operation) {
            Operation.UPSERT -> save(element.dto as Thesaurus)
            Operation.DELETE -> delete(element.dto as Thesaurus)
        }
    }

    fun getAllInstances(): Array<String> {
        var result: Array<String>
        runBlocking {
            result = thesaurusRepository.fetchAllInstances()
        }
        return result
    }

    fun getIdsForInstance(instance:String): Array<Long> {
        var result: Array<Long>
        runBlocking {
            result = thesaurusRepository.fetchIdsForInstance(instance)
        }
        return result
    }

    fun getThesaurus(id: Long): ThesaurusData? {
        val result: ThesaurusData?
        runBlocking {
            result = thesaurusRepository.fetchThesaurusData(id)
        }
        return result
    }

    fun getThesaurus(mdsId: Long, type: String): ThesaurusData? {
        val result: ThesaurusData?
        runBlocking {
            result = thesaurusRepository.fetchThesaurusData(mdsId, type)
        }
        return result
    }

    private suspend fun saveThesaurus(data: Thesaurus): Long {
        val existing = thesaurusRepository.fetchThesaurusData(data.mdsId, data.type)
        val id = if (existing == null) {
            thesaurusRepository.insertThesaurus(data.mdsId, data.name, data.type, data.instance)
        } else {
            (existing.id as Number).toLong()
        }
        if (data is ThesaurusExt) {
            val parentId = if (data.parent != null) saveThesaurus(data.parent!!) else null
            val updateRequired = (existing != null && existing.name != data.name) || parentId != existing?.parentId
            if (updateRequired) {
                thesaurusRepository.updateThesaurus(id, parentId, data.name)
            }
        }
        return id
    }

    private suspend fun saveThesaurusTranslation(translation: ThesaurusTranslation, thesaurusId: Long): Long {
        return thesaurusRepository.insertOrUpdateTranslation(thesaurusId, translation.language, translation.value)
    }

    private suspend fun deleteThesaurus(thesaurus: Thesaurus): Boolean {
        // return true if entry does not even exist
        val entry = thesaurusRepository.fetchThesaurusData(thesaurus.mdsId, thesaurus.type) ?: return true
        return thesaurusRepository.deleteThesaurus((entry.id as Number).toLong())
    }

    private suspend fun deleteThesaurusTranslation(translation: ThesaurusTranslation): Boolean {
        // return true if entry does not even exist
        val thesaurus = thesaurusRepository.fetchThesaurusData(translation.thesaurus.mdsId, translation.thesaurus.type)
                ?: return true
        val entry = thesaurusRepository.fetchTranslationData((thesaurus.id as Number).toLong(), translation.language)
                ?: return true
        return thesaurusRepository.deleteTranslation((entry.id as Number).toLong())

    }
}