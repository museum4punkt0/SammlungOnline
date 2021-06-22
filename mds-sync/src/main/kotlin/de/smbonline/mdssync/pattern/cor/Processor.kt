package de.smbonline.mdssync.pattern.cor

interface Processor<T> {

    fun processCommand(element: T)

}