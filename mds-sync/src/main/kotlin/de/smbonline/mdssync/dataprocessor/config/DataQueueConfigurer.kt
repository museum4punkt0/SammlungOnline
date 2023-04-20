package de.smbonline.mdssync.dataprocessor.config

import de.smbonline.mdssync.dataprocessor.queue.DataQueue
import de.smbonline.mdssync.dataprocessor.queue.ObservableDataQueue
import de.smbonline.mdssync.dataprocessor.service.AssortmentService
import de.smbonline.mdssync.dataprocessor.service.AttachmentService
import de.smbonline.mdssync.dataprocessor.service.ExhibitionService
import de.smbonline.mdssync.dataprocessor.service.HighlightService
import de.smbonline.mdssync.dataprocessor.service.ObjectService
import de.smbonline.mdssync.dataprocessor.service.PersonService
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService
import de.smbonline.mdssync.dataprocessor.service.ThesaurusService
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.ChainOfResponsibilityBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

@Component
class DataQueueConfigurer @Autowired constructor(val applicationContext: ApplicationContext) {

    private val dataQueue: DataQueue<WrapperDTO> = ObservableDataQueue()

    @PostConstruct
    fun registerServices() {
        val objectService = applicationContext.getBean(ObjectService::class.java)
        val attachmentService = applicationContext.getBean(AttachmentService::class.java)
        val syncCycleService = applicationContext.getBean(SyncCycleService::class.java)
        val highlightService = applicationContext.getBean(HighlightService::class.java)
        val assortmentService = applicationContext.getBean(AssortmentService::class.java)
        val exhibitionService = applicationContext.getBean(ExhibitionService::class.java)
        val personService = applicationContext.getBean(PersonService::class.java)
        val thesaurusService = applicationContext.getBean(ThesaurusService::class.java)
        val engine = ChainOfResponsibilityBuilder.build(objectService, exhibitionService, personService, thesaurusService, attachmentService, highlightService, assortmentService, syncCycleService)
        this.dataQueue.subscribe { engine.processCommand(it) }
    }

    @Bean
    fun dataQueue(): DataQueue<WrapperDTO> {
        return dataQueue
    }
}