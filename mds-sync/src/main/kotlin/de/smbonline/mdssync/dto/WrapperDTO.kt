package de.smbonline.mdssync.dto

import de.smbonline.mdssync.pattern.cor.Processable

class WrapperDTO(val dto: Any) : Processable {

    var operation: Operation = Operation.UPSERT

    override var beforeExecuteCommand: (() -> Unit)? = null
    override var afterExecuteCommand: (() -> Unit)? = null
    override var onError: ((exc: Exception) -> Unit)? = null

    override fun toString(): String = "Wrapper{op=$operation, obj=$dto}"
}