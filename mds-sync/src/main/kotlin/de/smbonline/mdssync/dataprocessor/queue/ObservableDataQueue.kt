package de.smbonline.mdssync.dataprocessor.queue

import io.reactivex.rxjava3.subjects.PublishSubject
import io.reactivex.rxjava3.subjects.Subject
import java.io.Closeable

class ObservableDataQueue<T> : DataQueue<T>, Closeable {

    private val subject: Subject<T> = PublishSubject.create()

    override fun add(element: T) {
        return offer(element)
    }

    override fun addAll(elements: Collection<T>) {
        elements.forEach { offer(it) }
    }

    override fun subscribe(func: (element: T) -> Unit) {
        subject.subscribe(func)
    }

    override fun close() {
        subject.onComplete()
    }

    private fun offer(element: T) {
        subject.onNext(element)
    }
}
