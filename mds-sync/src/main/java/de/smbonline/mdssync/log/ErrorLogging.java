package de.smbonline.mdssync.log;

import de.smbonline.mdssync.util.Lookup;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.Objects;

/**
 * Utility class for error logging. Uses slf4j internally. Provides some logging methods for convenience.
 */
public final class ErrorLogging {

    /**
     * Logs an error with an additional error message. If debug level is turned on,
     * logs the complete stack trace of the exception.
     *
     * @param throwable error
     * @param message   optional error message
     * @see #log(Throwable, String, Object[])
     */
    public static void log(final Throwable throwable, final @Nullable String message) {
        String msg = StringUtils.defaultString(message, "Exception occurred");
        msg = StringUtils.stripEnd(msg, "\t .!-?;");
        msg = StringUtils.appendIfMissing(msg, ":");

        Logger logger = getLogger(determineInvokerClass());
        logger.error("{} {}", msg, throwable.toString());
        if (logger.isDebugEnabled()) {
            logger.error("", throwable);
        }
    }

    /**
     * Logs an error with an additional error message. If debug level is turned on,
     * logs the complete stack trace of the exception.
     *
     * @param throwable       error
     * @param messageTemplate message template
     * @param args            message template placeholder values in correct order
     */
    public static void log(final Throwable throwable, final String messageTemplate, final Object... args) {
        String invokerClass = determineInvokerClass();
        Logger logger = getLogger(invokerClass);
        logger.error(messageTemplate, args);
        if (logger.isDebugEnabled()) {
            logger.error("", throwable);
        } else {
            logger.error(throwable.toString());
        }
    }

    private static String determineInvokerClass() {
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        StackTraceElement invoker = Lookup.findFirst(stackTrace, e ->
                !ErrorLogging.class.getName().equals(e.getClassName())
        );
        return Objects.requireNonNull(invoker).getClassName();
    }

    private static Logger getLogger(final String className) {
        try {
            return getLogger(Class.forName(className));
        } catch (@SuppressWarnings("unused") ClassNotFoundException | NoClassDefFoundError exc) {
            return getLogger(ErrorLogging.class);
        }
    }

    private static Logger getLogger(final Class<?> clazz) {
        return LoggerFactory.getLogger(clazz);
    }

    private ErrorLogging() {
        // no instances
    }
}
