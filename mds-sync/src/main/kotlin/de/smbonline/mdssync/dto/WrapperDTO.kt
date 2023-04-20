package de.smbonline.mdssync.dto

import de.smbonline.mdssync.pattern.cor.Processable

class WrapperDTO(val dto: Any) : Processable {

    var operation: Operation = Operation.UPSERT

    override var beforeExecuteCommand: List<(() -> Unit)> = mutableListOf()
    override var afterExecuteCommand: List<(() -> Unit)> = mutableListOf()
    override var onError: List<((exc: Exception) -> Unit)> = mutableListOf()

    override fun toString(): String = "Wrapper{op=$operation, obj=$dto}"
}