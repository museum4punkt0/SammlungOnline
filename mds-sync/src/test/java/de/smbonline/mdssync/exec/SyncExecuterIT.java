package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.MdsSessionHandler;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.dataprocessor.queue.DataQueue;
import de.smbonline.mdssync.dataprocessor.repository.ObjectRepository;
import de.smbonline.mdssync.dto.Operation;
import de.smbonline.mdssync.dto.PrincipalObject;
import de.smbonline.mdssync.dto.WrapperDTO;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Module;
import org.apache.commons.lang3.ArrayUtils;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assumptions.*;

@SpringBootTest
@ActiveProfiles("test")
class SyncExecuterIT {

    @Autowired
    MdsApiConfig config;

    @Autowired
    MdsSessionHandler sessionHandler;

    @Autowired
    ObjectProvider<SyncExecuter> executerProvider;

    @Autowired
    DataQueue<WrapperDTO> dataQueue;

    @Autowired
    ObjectRepository repo;

    @Test
    void runSyncForDeletedObjects() throws Exception {

        // Setup: ensure a deleted object is in the db
        // ----

        Search trashBinSearch = new SearchRequestHelper(config, "Object").buildSearchDeletedPayload();
        Module module = new MdsApiClient(config, "Object", sessionHandler).search(trashBinSearch, null);
        Assumptions.assumeFalse(module.getModuleItem().isEmpty(), "no deleted objects available that can be tested");

        Long id = module.getModuleItem().get(0).getId();

        PrincipalObject object = new PrincipalObject(id, "de");
        WrapperDTO wrapper = new WrapperDTO(object);
        wrapper.setOperation(Operation.UPSERT);
        wrapper.getOnError().add(exc -> fail("exception"));
        dataQueue.add(wrapper);

        // suspend VM with debugger here and check if object is in db
        TimeUnit.SECONDS.sleep(5);
        assumeThat(repo.existsObjectBlocking(id)).isTrue();

        // here starts the test
        // ----

        SyncExecuter executer = executerProvider.getObject();
        executer.setModuleName("Object");
        SyncResult result = executer.sync(id);
        assertThat(result.getSuccessfulIds()).containsExactly(id);

        // suspend VM with debugger here and check if object is deleted from db
        TimeUnit.SECONDS.sleep(5);
        assertThat(repo.existsObjectBlocking(id)).isFalse();
    }

    @Test
    void runSyncForIds() {
        String[] ids = {"865040", "867231", "959003",};
        Long[] mdsIds = Arrays.stream(ids).map(Long::valueOf).toArray(Long[]::new);
        SyncExecuter executer = executerProvider.getObject();
        executer.setModuleName("Object");
        SyncResult result = executer.sync(mdsIds);
        if (result.getSuccessfulIds() == null || mdsIds.length != result.getSuccessfulIds().length) {
            System.out.println("Skipped: " + Arrays.toString(ArrayUtils.removeElements(mdsIds, result.getSuccessfulIds())));
            System.out.println("Failed: " + Arrays.toString(result.getFailedIds()));
        }
        assertThat(result.getSuccessfulIds()).containsExactlyInAnyOrder(mdsIds);
    }
}
