package de.smbonline.mdssync.pattern.cor

abstract class GenericElement : Processable {

    override var beforeExecuteCommand: (() -> Unit)? = null
    override var afterExecuteCommand: (() -> Unit)? = null
    override var onError: ((exc: Exception) -> Unit)? = null

}