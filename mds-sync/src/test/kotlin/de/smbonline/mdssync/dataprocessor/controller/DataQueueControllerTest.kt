package de.smbonline.mdssync.dataprocessor.controller

import de.smbonline.mdssync.dataprocessor.queue.ObservableDataQueue
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class DataQueueControllerTest {

    private companion object {
        const val STRING1: String = "Ich war hier"
        const val STRING2: String = "nüscht"
    }

    @Test
    fun testObservableDataQueue() {
        var metadataCounter = 0
        var imageCounter = 0

        val metadataQueue: ObservableDataQueue<TestMetadata> = ObservableDataQueue()
        metadataQueue.subscribe { element: TestMetadata ->
            Assertions.assertEquals(STRING1, element.title)
            Assertions.assertEquals(STRING2, element.subTitle)
            Assertions.assertEquals(metadataCounter, element.idx)
            metadataCounter++
        }

        val imageQueue: ObservableDataQueue<TestImageData> = ObservableDataQueue()
        imageQueue.subscribe { element: TestImageData ->
            Assertions.assertEquals(STRING1, element.name)
            Assertions.assertEquals(imageCounter, element.idx)
            imageCounter++
        }

        imageQueue.add(TestImageData(name = STRING1, idx = 0))
        metadataQueue.add(TestMetadata(title = STRING1, subTitle = STRING2, idx = 0))
        imageQueue.add(TestImageData(name = STRING1, idx = 1))
        metadataQueue.add(TestMetadata(title = STRING1, subTitle = STRING2, idx = 1))
        imageQueue.add(TestImageData(name = STRING1, idx = 2))
        metadataQueue.add(TestMetadata(title = STRING1, subTitle = STRING2, idx = 2))
        imageQueue.add(TestImageData(name = STRING1, idx = 3))
        metadataQueue.add(TestMetadata(title = STRING1, subTitle = STRING2, idx = 3))
        imageQueue.add(TestImageData(name = STRING1, idx = 4))
        imageQueue.add(TestImageData(name = STRING1, idx = 5))
    }

    class TestMetadata(var title: String, var subTitle: String, var idx: Int)

    class TestImageData(val name: String, var idx: Int)

}
