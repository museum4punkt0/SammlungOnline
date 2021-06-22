package de.smbonline.mdssync.dataprocessor.queue

interface DataQueue<T> {

    fun add(element: T)

    fun addAll(elements: Collection<T>)

    fun subscribe(func: (element: T) -> Unit)

}