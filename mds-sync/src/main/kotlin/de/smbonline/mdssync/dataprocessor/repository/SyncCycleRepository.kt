package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.api.Input
import com.apollographql.apollo.coroutines.await
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchLastSyncCycleQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertSyncCycleMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.SyncCycleData
import de.smbonline.mdssync.dataprocessor.graphql.queries.type.Smb_sync_cycle_type_enum
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.SyncCycle
import de.smbonline.mdssync.dto.SyncCycleType
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class SyncCycleRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun fetchLastSyncCycle(type: SyncCycleType, module: String): SyncCycleData? {
        val result = graphQlClient.client.query(
                FetchLastSyncCycleQuery(Smb_sync_cycle_type_enum.valueOf(type.name), module)
        ).await()
        return result.data?.smb_sync_cycles?.firstOrNull()?.fragments?.syncCycleData
    }

    suspend fun saveSyncCycle(syncCycle: SyncCycle): Long? {
        val result = graphQlClient.client.mutate(
                InsertSyncCycleMutation(
                        timestamp = syncCycle.timestamp,
                        cycleType = Smb_sync_cycle_type_enum.valueOf(syncCycle.type.name),
                        module = Input.optional(syncCycle.module),
                        debugInformation = syncCycle.debugInformation,
                        succeeded = Input.optional(toArraySyntax(syncCycle.succeeded)),
                        failed = Input.optional(toArraySyntax(syncCycle.failed)),
                        skipped = Input.optional(toArraySyntax(syncCycle.skipped))
                )
        ).await()
        ensureNoError(result)

        val cycle = result.data?.insert_smb_sync_cycles_one ?: return null
        return (cycle.id as BigDecimal).longValueExact()
    }

    private fun toArraySyntax(arr: Array<*>?): String? {
        return arr?.joinToString(",", "{", "}")
    }
}