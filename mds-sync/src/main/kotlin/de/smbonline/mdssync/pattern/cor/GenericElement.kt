package de.smbonline.mdssync.pattern.cor

abstract class GenericElement : Processable {

    override var beforeExecuteCommand: List<(() -> Unit)> = mutableListOf()
    override var afterExecuteCommand: List<(() -> Unit)> = mutableListOf()
    override var onError: List<((exc: Exception) -> Unit)> = mutableListOf()

}