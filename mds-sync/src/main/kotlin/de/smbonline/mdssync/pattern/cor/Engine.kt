package de.smbonline.mdssync.pattern.cor

// TODO extract the whole package to a separate library

abstract class Engine<T> : Processor<T> where T : Processable {

    var nextCommand: Processor<T>? = null

    protected abstract fun isResponsible(element: T): Boolean

    // TBD allow executeCommand to break the chain and consume the element?
    //  (return true/false or throw dedicated exception)
    protected abstract fun executeCommand(element: T)

    override fun processCommand(element: T) {
        if (isResponsible(element)) {
            executeProcessCommands(element)
        }
        nextCommand?.processCommand(element)
    }

    private fun executeProcessCommands(element: T) {
        element.beforeExecuteCommand.forEach { it.invoke() }
        try {
            executeCommand(element)
            element.afterExecuteCommand.forEach { it.invoke() }
        } catch (e: Exception) {
            element.onError.forEach { it.invoke(e) }
        }
    }
}