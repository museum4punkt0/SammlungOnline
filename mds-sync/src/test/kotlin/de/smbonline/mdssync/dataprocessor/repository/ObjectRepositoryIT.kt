package de.smbonline.mdssync.dataprocessor.repository

import de.smbonline.mdssync.dto.AttributeValue
import de.smbonline.mdssync.dto.PrincipalObject
import kotlinx.coroutines.runBlocking
import org.apache.commons.lang3.RandomUtils
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("test")
class ObjectRepositoryIT {

    @Autowired
    lateinit var objectRepository: ObjectRepository

    @Test
    fun testGetObjects() {
        val existingId: Long = Long.MAX_VALUE
        val missingId: Long = -1

        // setup

        runBlocking {
            // ensure existing
            val obj = PrincipalObject(existingId, "foobar")
            obj.attributes = ArrayList()
            objectRepository.saveObject(obj)
            // ensure missing
            objectRepository.deleteObject(missingId)
        }

        // run test

        runBlocking {
            Assertions.assertTrue(objectRepository.existsObject(existingId))
            Assertions.assertFalse(objectRepository.existsObject(missingId))
        }

        // cleanup

        runBlocking {
            objectRepository.deleteObject(existingId)
        }
    }

    @Test
    fun testSaveObjects() {
        val testId = RandomUtils.nextLong()

        // cleanup

        runBlocking {
            objectRepository.deleteObject(testId)
        }

        // run test

        val obj1 = PrincipalObject(testId, "de")

        val attr1 = AttributeValue()
        attr1.datatype = "String"
        attr1.key = "ObjectRepositoryTest.testSaveObjects"
        attr1.fqKey = "ObjectRepositoryTest.testSaveObjects.attr1"
        attr1.language = "de"
        attr1.value = "Value of testSaveObjects - attr 1"

        val attr2 = AttributeValue()
        attr2.datatype = "String"
        attr2.key = "ObjectRepositoryTest.testSaveObjects"
        attr2.fqKey = "ObjectRepositoryTest.testSaveObjects.attr2"
        attr2.language = "de"
        attr2.value = "Value of testSaveObjects - attr2"

        obj1.attributes = listOf(attr1, attr2)

        runBlocking {
            val result = objectRepository.saveObject(obj1)
            Assertions.assertNotNull(result)
        }

        // cleanup

        runBlocking {
            objectRepository.deleteObject(testId)
        }
    }
}