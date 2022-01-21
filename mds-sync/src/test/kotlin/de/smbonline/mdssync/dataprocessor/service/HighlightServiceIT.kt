package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dataprocessor.repository.HighlightRepository
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository
import de.smbonline.mdssync.dataprocessor.repository.OrgUnitRepository
import de.smbonline.mdssync.dto.HighlightDTO
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class HighlightServiceIT {

    @Autowired
    lateinit var highlightService: HighlightService

    @Autowired
    lateinit var orgUnitRepository: OrgUnitRepository

    @Autowired
    lateinit var highlightsRepository: HighlightRepository

    @Autowired
    lateinit var objectRepository: ObjectRepository

    // at some times this integration-test fails, because highlight and orgUnit are saved correctly,
    // but hasura returns cached values.
    @Test
    fun testSaveFetchDelete() {
        runBlocking {
            val highlightDto = HighlightDTO()
            highlightDto.orgUnitName = "OrgUnitTestCase1"
            highlightDto.objectIds = arrayOf(975447, 865040, 1576560, 1668818, 459698)
            highlightService.save(highlightDto)

            val allHighlights = highlightsRepository.fetchAllHighlights()
            assertThat(allHighlights).isNotEmpty

            val orgUnitId = orgUnitRepository.getOrgUnitIdByOrgUnitName(highlightDto.orgUnitName)
            assertThat(orgUnitId).isNotNull
            val deletedHighlights = highlightsRepository.deleteHighlights(orgUnitId!!)
            assertThat(deletedHighlights).isNotEmpty

            val deletedOrgUnitId = orgUnitRepository.deleteOrgUnit(orgUnitId)
            assertThat(deletedOrgUnitId).isEqualTo(orgUnitId)
        }
    }

}