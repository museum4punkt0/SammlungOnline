package de.smbonline.mdssync.exc;

import de.smbonline.mdssync.util.Lookup;
import io.sentry.Sentry;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.Objects;

/**
 * Utility class for error logging. Uses slf4j internally. Provides some capturing methods for convenience.
 * Capture methods perform error logging and sentry notifications.
 */
public final class ErrorHandling {

    /**
     * Logs an error with an additional error message. If debug level is turned on,
     * logs the complete stack trace of the exception.
     *
     * @param throwable error
     * @param message   optional error message
     * @see #capture(Throwable, String, Object[])
     */
    public static void capture(final Throwable throwable, final @Nullable String message) {
        String msg = StringUtils.defaultString(message, "Exception occurred");
        msg = StringUtils.stripEnd(msg, "\t .!-?;");
        msg = StringUtils.appendIfMissing(msg, ":");

        Logger logger = getLogger(determineInvokerClass());
        if (logger.isErrorEnabled()) {
            logger.error("{} {}", msg, throwable.toString());
        }
        if (logger.isDebugEnabled()) {
            logger.error("", throwable);
        }

        Sentry.captureException(throwable);
    }

    /**
     * Logs an error with an additional error message. If debug level is turned on,
     * logs the complete stack trace of the exception.
     *
     * @param throwable       error
     * @param messageTemplate message template
     * @param args            message template placeholder values in correct order
     */
    public static void capture(final Throwable throwable, final String messageTemplate, final Object... args) {
        String invokerClass = determineInvokerClass();
        Logger logger = getLogger(invokerClass);
        logger.error(messageTemplate, args);
        if (logger.isDebugEnabled()) {
            logger.error("", throwable);
        } else {
            logger.error(throwable.toString());
        }

        Sentry.captureException(throwable);
    }

    private static String determineInvokerClass() {
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        stackTrace = ArrayUtils.remove(stackTrace, 0); // 0=java.lang.Thread
        StackTraceElement invoker = Lookup.findFirst(stackTrace, e ->
                !ErrorHandling.class.getName().equals(e.getClassName())
        );
        return Objects.requireNonNull(invoker).getClassName();
    }

    private static Logger getLogger(final String className) {
        try {
            return getLogger(Class.forName(className));
        } catch (@SuppressWarnings("unused") ClassNotFoundException | NoClassDefFoundError exc) {
            return getLogger(ErrorHandling.class);
        }
    }

    private static Logger getLogger(final Class<?> clazz) {
        return LoggerFactory.getLogger(clazz);
    }

    private ErrorHandling() {
        // no instances
    }
}
