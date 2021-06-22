package de.smbonline.mdssync.dataprocessor.repository.util

import com.apollographql.apollo.api.Response
import de.smbonline.mdssync.exc.SyncFailedException
import java.util.stream.Collectors

fun ensureNoError(vararg results: Response<*>) {
    var errors = results.filter { !it.errors.isNullOrEmpty() }.flatMap { it.errors.orEmpty() }
    if (errors.isNotEmpty()) {
        throw SyncFailedException(errors.stream().map { it.message }.collect(Collectors.joining()))
    }
}

