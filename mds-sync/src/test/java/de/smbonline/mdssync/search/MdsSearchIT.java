package de.smbonline.mdssync.search;

import de.smbonline.mdssync.search.request.Search;
import de.smbonline.mdssync.search.response.Attachment;
import de.smbonline.mdssync.search.response.Module;
import de.smbonline.mdssync.search.response.ModuleItem;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

import java.time.LocalDateTime;

@SpringBootTest
public class MdsSearchIT {

    @Autowired
    Environment env;

    @Autowired
    MdsApiConfig config;

    @Test
    public void checkSearchWithFiltersAndSorting() throws Exception {
        MdsApiClient api = new MdsApiClient(config, "Object");
        Search search = new SearchRequestHelper(config, "Object").buildSearchPayload(
                0, 1,
                LocalDateTime.now().minusYears(2),
                LocalDateTime.now(),
                "+__id");
        Module resp = api.search(search, "de");
        Assertions.assertThat(resp.getTotalSize()).isGreaterThan(0);
    }

    @Test
    public void checkSimpleSearch() throws Exception {
        MdsApiClient api = new MdsApiClient(config, "Object");
        Search search = new SearchRequestHelper(config, "Object").buildSearchPayload(
                0, 1, null, null, null);
        Module resp = api.search(search, null);
        Assertions.assertThat(resp.getTotalSize()).isGreaterThan(0);
    }

    @Test
    public void checkGet() throws Exception {
        MdsApiClient api = new MdsApiClient(config, "ObjectGroup");
        ModuleItem group = api.get("1021", null);
        Assertions.assertThat(group).isNotNull();
    }

    @Test
    public void checkGetAttachment() throws Exception {
        // TODO @Tom: try to handle this with annotation (@DisabledIf ?)
        Assumptions.assumeFalse(env.getProperty("mds-api.base-url").contains("Test"),
                "disabled because we don't expect attachments in the test system");

        MdsApiClient api = new MdsApiClient(config, "Multimedia");
        Attachment attachment = api.getAttachment("2618128");
        Assertions.assertThat(attachment).isNotNull();
        Assertions.assertThat(attachment.getValue()).isNotEmpty();
    }
}
