package de.smbonline.mdssync.pattern.cor

interface Processable {

    var beforeExecuteCommand: List<(() -> Unit)>
    var afterExecuteCommand: List<(() -> Unit)>
    var onError: List<((exc: Exception) -> Unit)>

}