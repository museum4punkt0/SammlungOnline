package de.smbonline.mdssync.dataprocessor.config

import de.smbonline.mdssync.dto.PrincipalObject
import de.smbonline.mdssync.dto.Operation
import de.smbonline.mdssync.dto.WrapperDTO
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DataQueueConfigurerIT {

    @Autowired
    lateinit var dataQueueConfigurer: DataQueueConfigurer

    @Test
    fun testCommands() {
        var beforeCommandExecuted = false
        var afterCommandExecuted = false
        var onErrorExecuted = false

        val obj = PrincipalObject(1234567890,"de")
        val mdsDtoWrapper = WrapperDTO(obj)
        mdsDtoWrapper.operation = Operation.DELETE
        mdsDtoWrapper.beforeExecuteCommand += {
            println("beforeExecuteCommand")
            beforeCommandExecuted = true
        }
        mdsDtoWrapper.afterExecuteCommand += {
            println("afterExecuteCommand")
            afterCommandExecuted = true
            throw Exception("Exception to test onError")
        }
        mdsDtoWrapper.onError += {
            println("onError")
            onErrorExecuted = true
        }

        dataQueueConfigurer.dataQueue().add(mdsDtoWrapper)

        assertTrue(beforeCommandExecuted)
        assertTrue(afterCommandExecuted)
        assertTrue(onErrorExecuted)
    }
}