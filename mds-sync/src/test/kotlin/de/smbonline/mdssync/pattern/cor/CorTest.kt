package de.smbonline.mdssync.pattern.cor

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import kotlin.reflect.cast

class CorTest {

    @ExperimentalStdlibApi
    @Test
    fun genericEngineTest() {
        val clazz1 = TestMetadata::class
        val engine1 = GenericEngine(clazz = clazz1, command = { element: Any ->
            val e = clazz1.cast(element)

            println(e.title)
            println(e.subTitle)
            Assertions.assertEquals("Huhu", e.title)
            Assertions.assertEquals("I don't need subtitles", e.subTitle)
        })

        val clazz2 = TestImageData::class
        val engine2 = GenericEngine(clazz = clazz2, command = { element: Any ->
            val e = clazz2.cast(element)

            println(e.img)
            Assertions.assertEquals("src=jasijowe.jpg", e.img)
        })

        val engine = ChainOfResponsibilityBuilder.build(engine1, engine2)
        engine.processCommand(TestImageData(img = "src=jasijowe.jpg"))
        engine.processCommand(TestMetadata(title = "Huhu", subTitle = "I don't need subtitles"))
    }

    class TestMetadata(var title: String, var subTitle: String) : GenericElement()

    class TestImageData(val img: String) : GenericElement()

}
