package de.smbonline.mdssync.dataprocessor.controller

import de.smbonline.mdssync.dataprocessor.queue.DataQueue
import de.smbonline.mdssync.dataprocessor.queue.ObservableDataQueue
import de.smbonline.mdssync.dataprocessor.service.HighlightService
import de.smbonline.mdssync.dataprocessor.service.AttachmentService
import de.smbonline.mdssync.dataprocessor.service.ObjectService
import de.smbonline.mdssync.dataprocessor.service.SyncCycleService
import de.smbonline.mdssync.dto.WrapperDTO
import de.smbonline.mdssync.pattern.cor.ChainOfResponsibilityBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.config.ConfigurableBeanFactory
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

@Component
class DataQueueController {

    @Autowired
    lateinit var applicationContext: ApplicationContext

    @Autowired
    lateinit var dataQueue: DataQueue<WrapperDTO>

    @PostConstruct
    fun registerServices() {
        val objectService = applicationContext.getBean(ObjectService::class.java)
        val attachmentService = applicationContext.getBean(AttachmentService::class.java)
        val syncCycleService = applicationContext.getBean(SyncCycleService::class.java)
        val highlightService = applicationContext.getBean(HighlightService::class.java)
        val engine = ChainOfResponsibilityBuilder.build(objectService, attachmentService, syncCycleService, highlightService)
        dataQueue.subscribe { engine.processCommand(it) }
    }

    @Bean
    @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
    fun dataQueue(): DataQueue<WrapperDTO> {
        return ObservableDataQueue()
    }
}