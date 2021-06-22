package de.smbonline.mdssync.pattern.cor

interface Processable {

    var beforeExecuteCommand: (() -> Unit)?
    var afterExecuteCommand: (() -> Unit)?
    var onError: ((exc: Exception) -> Unit)?

}