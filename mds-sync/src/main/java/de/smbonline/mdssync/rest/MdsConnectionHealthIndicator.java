package de.smbonline.mdssync.rest;

import de.smbonline.mdssync.search.MdsApiClient;
import de.smbonline.mdssync.search.MdsApiConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

/**
 * Checks the connection to the MDS-API by calling a particular object endpoint. <br>
 * Note: When the object with the specified id is not available the API returns 404 which
 * leads to a down response by this health check.
 */
@Component
public class MdsConnectionHealthIndicator implements HealthIndicator {

    private static final String MDS_TEST_OBJECT_ID = "1";

    @Autowired
    MdsApiConfig mdsConfig;

    @Override
    public Health health() {
        try {
            MdsApiClient apiClient = new MdsApiClient(this.mdsConfig, "Object");
            apiClient.get(MDS_TEST_OBJECT_ID, null);
        } catch (Exception e) {
            return Health.down().withException(e).build();
        }
        return Health.up().build();
    }
}
