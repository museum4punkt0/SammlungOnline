package de.smbonline.mdssync.dataprocessor.repository

import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import java.math.BigDecimal

@SpringBootTest
@ActiveProfiles("test")
class OrgUnitRepositoryIT {

    @Autowired
    lateinit var orgUnitRepository: OrgUnitRepository

    private companion object {
        const val ORG_UNIT1: String = "OrgUnitTestCase1"
        const val ORG_UNIT2: String = "OrgUnitTestCase2"
    }

    @Test
    fun testInsertFetchDelete() {

        // first make sure the test units don't exist
        runBlocking {
            val one = orgUnitRepository.fetchOrgUnitByOrgUnitName(ORG_UNIT1)
            one?.let { orgUnitRepository.deleteOrgUnit(ORG_UNIT1) }
            val two = orgUnitRepository.fetchOrgUnitByOrgUnitName(ORG_UNIT2)
            two?.let { orgUnitRepository.deleteOrgUnit(ORG_UNIT2) }
        }

        // now run tests
        runBlocking {

            // insert
            val save1 = orgUnitRepository.saveOrgUnit(ORG_UNIT1)
            val save2 = orgUnitRepository.saveOrgUnit(ORG_UNIT2)
            assertThat(save1).isNotNull()
            assertThat(save2).isNotNull()

            // fetch
            val fetch1 = orgUnitRepository.fetchOrgUnitByOrgUnitName(ORG_UNIT1)
            assertThat(fetch1).isNotNull
            assertThat(fetch1!!.key).isEqualTo(ORG_UNIT1)

            val fetch2 = orgUnitRepository.fetchOrgUnitByOrgUnitName(ORG_UNIT2)
            assertThat(fetch2).isNotNull
            assertThat(fetch2!!.key).isEqualTo(ORG_UNIT2)

            val fetchAll = orgUnitRepository.fetchAllOrgUnits()
            assertThat(fetchAll).isNotEmpty

            // delete
            for (orgUnit in fetchAll) {
                val delete = orgUnitRepository.deleteOrgUnit((orgUnit.id as BigDecimal).longValueExact())
                assertThat(delete).isNotNull()
            }
        }
    }

}