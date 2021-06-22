package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.AttributeRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dto.ObjectDTO
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assumptions.assumeThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class ObjectServiceIT {

    @Autowired
    lateinit var metadataService: ObjectService

    @Autowired
    lateinit var objectRepository: ObjectRepository

    @Autowired
    lateinit var attributesRepository: AttributeRepository

    @Test
    fun testSave() {
        val mdsId: Long = 114

        runBlocking {

            // TODO @Tom: better setup required to ensure object with attributes exists
            assumeThat(objectRepository.existsObject(mdsId)).isTrue
            val attrCountBeforeChange = attributesRepository.getAttributeIds(mdsId, "de").size
            assumeThat(attrCountBeforeChange).isGreaterThan(0)

            val obj = ObjectDTO(mdsId)
            obj.language = "de"
            metadataService.save(obj)

            val attrCountAfterChange = attributesRepository.getAttributeIds(mdsId, "de").size
            assertThat(attrCountAfterChange).isEqualTo(0)
            assertThat(attrCountAfterChange).isNotEqualTo(attrCountBeforeChange)
        }
    }
}