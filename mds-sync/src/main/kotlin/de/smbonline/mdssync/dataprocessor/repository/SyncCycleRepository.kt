package de.smbonline.mdssync.dataprocessor.repository

import com.apollographql.apollo.coroutines.toDeferred
import de.smbonline.mdssync.dataprocessor.graphql.client.GraphQlClient
import de.smbonline.mdssync.dataprocessor.graphql.queries.FetchLastSyncCycleQuery
import de.smbonline.mdssync.dataprocessor.graphql.queries.InsertSyncCycleMutation
import de.smbonline.mdssync.dataprocessor.graphql.queries.fragment.SyncCycleData
import de.smbonline.mdssync.dataprocessor.graphql.queries.type.Smb_sync_cycle_type_enum
import de.smbonline.mdssync.dataprocessor.repository.util.ensureNoError
import de.smbonline.mdssync.dto.SyncCycleDTO
import kotlinx.coroutines.runBlocking
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.math.BigDecimal

@Repository
class SyncCycleRepository @Autowired constructor(private val graphQlClient: GraphQlClient) {

    suspend fun fetchLastSyncCycle(type: SyncCycleDTO.Type): SyncCycleData? {
        val result = graphQlClient.client.query(
                FetchLastSyncCycleQuery(Smb_sync_cycle_type_enum.valueOf(type.name))
        ).toDeferred().await()

        val cycles = result.data?.smb_sync_cycles ?: return null
        return if (cycles.isEmpty()) null else {
            cycles.first().fragments.syncCycleData
        }
    }

    fun fetchLastSyncCycleBlocking(type: SyncCycleDTO.Type): SyncCycleData? {
        val result: SyncCycleData?
        runBlocking {
            result = fetchLastSyncCycle(type)
        }
        return result
    }

    suspend fun saveSyncCycle(syncCycleDto: SyncCycleDTO): Long? {
        val result = graphQlClient.client.mutate(
                InsertSyncCycleMutation(
                        timestamp = syncCycleDto.timestamp,
                        cycleType = Smb_sync_cycle_type_enum.valueOf(syncCycleDto.type.name),
                        debugInformation = syncCycleDto.debugInformation
                )
        ).toDeferred().await()
        ensureNoError(result)

        val cycle = result.data?.insert_smb_sync_cycles_one ?: return null
        return (cycle.id as BigDecimal).longValueExact()
    }
}