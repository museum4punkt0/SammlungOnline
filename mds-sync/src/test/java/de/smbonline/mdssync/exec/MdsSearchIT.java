package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.MdsSessionHandler;
import de.smbonline.mdssync.api.SearchRequestHelper;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.response.Attachment;
import de.smbonline.mdssync.jaxb.search.response.Module;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;

import java.time.OffsetDateTime;

@SpringBootTest
@ActiveProfiles("test")
class MdsSearchIT {

    @Autowired
    Environment env;

    @Autowired
    MdsApiConfig config;

    @Autowired
    MdsSessionHandler sessionHandler;

    @Test
    void checkSearchWithFiltersAndSorting() throws Exception {
        MdsApiClient api = new MdsApiClient(config, "Object", sessionHandler);
        Search search = new SearchRequestHelper(config, "Object").buildSearchPayload(
                0, 1,
                OffsetDateTime.now().minusYears(2),
                OffsetDateTime.now(),
                "+__id");
        Module resp = api.search(search, "de");
        Assertions.assertThat(resp.getTotalSize()).isGreaterThan(0);
    }

    @Test
    void checkSimpleSearch() throws Exception {
        MdsApiClient api = new MdsApiClient(config, "Object", sessionHandler);
        Search search = new SearchRequestHelper(config, "Object").buildSearchPayload(
                0, 1, null, null, null);
        Module resp = api.search(search, null);
        Assertions.assertThat(resp.getTotalSize()).isGreaterThan(0);
    }

    @Test
    void checkGet() throws Exception {
        MdsApiClient api = new MdsApiClient(config, "ObjectGroup", sessionHandler);
        ModuleItem group = api.get(1021L, null);
        Assertions.assertThat(group).isNotNull();
    }

    @Test
    void checkGetAttachment() throws Exception {
        // TODO try to handle this with annotation (@DisabledIf ?)
        Assumptions.assumeFalse(env.getProperty("mds-api.base-url").contains("Test"),
                "disabled because we don't expect attachments in the test system");

        MdsApiClient api = new MdsApiClient(config, "Multimedia", sessionHandler);
        Attachment attachment = api.getAttachment(2618128L);
        Assertions.assertThat(attachment).isNotNull();
        Assertions.assertThat(attachment.getValue()).isNotEmpty();
    }
}
