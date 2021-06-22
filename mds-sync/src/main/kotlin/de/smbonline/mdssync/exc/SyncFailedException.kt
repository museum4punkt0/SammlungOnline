package de.smbonline.mdssync.exc

class SyncFailedException : Exception {
    constructor(message: String) : super(message) {}
    constructor(message: String, cause: Throwable) : super(message, cause) {}
}