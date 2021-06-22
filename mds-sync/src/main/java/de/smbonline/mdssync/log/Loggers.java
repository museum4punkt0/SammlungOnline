package de.smbonline.mdssync.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Collection of shared loggers.
 */
public final class Loggers {
    public static final Logger SYNC_LOGGER = LoggerFactory.getLogger("sync-results");
    public static final Logger PERFORMANCE_LOGGER = LoggerFactory.getLogger("performance");

    private Loggers() {
        // no instances
    }
}
