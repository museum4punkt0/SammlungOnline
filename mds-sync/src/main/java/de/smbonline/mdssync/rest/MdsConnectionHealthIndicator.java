package de.smbonline.mdssync.rest;

import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.api.MdsSessionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

import static de.smbonline.mdssync.util.MdsConstants.*;

/**
 * Checks the connection to the MDS-API by calling a particular object endpoint. <br>
 * Note: When the object with the specified id is not available the API returns 404 which
 * leads to a down response by this health check.
 */
@Component
public class MdsConnectionHealthIndicator implements HealthIndicator {

    private static final Long MDS_TEST_OBJECT_ID = 1L;

    private final MdsApiConfig mdsConfig;
    private final MdsSessionHandler sessionHandler;

    @Autowired
    public MdsConnectionHealthIndicator(final MdsApiConfig config, final MdsSessionHandler handler) {
        this.mdsConfig = config;
        this.sessionHandler = handler;
    }

    @Override
    public Health health() {
        try {
            MdsApiClient apiClient = new MdsApiClient(this.mdsConfig, MODULE_OBJECTS, this.sessionHandler);
            apiClient.get(MDS_TEST_OBJECT_ID, null);
        } catch (Exception e) {
            return Health.down().withException(e).build();
        }
        return Health.up().build();
    }
}
