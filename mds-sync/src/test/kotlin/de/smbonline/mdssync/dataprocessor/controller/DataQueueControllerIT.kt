package de.smbonline.mdssync.dataprocessor.controller

import de.smbonline.mdssync.dto.ObjectDTO
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DataQueueControllerIT {

    @Autowired
    lateinit var dataQueueController: DataQueueController

    @Test
    fun testCommands() {
        var beforeCommandExecuted = false
        var afterCommandExecuted = false
        var onErrorExecuted = false

        val obj = ObjectDTO(1234567890)
        obj.language = "de"
        val mdsDtoWrapper = WrapperDTO(obj)
        mdsDtoWrapper.operation = Operation.DELETE
        mdsDtoWrapper.beforeExecuteCommand = {
            println("beforeExecuteCommand")
            beforeCommandExecuted = true
        }
        mdsDtoWrapper.afterExecuteCommand = {
            println("afterExecuteCommand")
            afterCommandExecuted = true
            throw Exception("Exception to test onError")
        }
        mdsDtoWrapper.onError = {
            println("onError")
            onErrorExecuted = true
        }

        dataQueueController.dataQueue.add(mdsDtoWrapper)

        assertTrue(beforeCommandExecuted)
        assertTrue(afterCommandExecuted)
        assertTrue(onErrorExecuted)
    }
}