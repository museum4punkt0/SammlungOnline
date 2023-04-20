package de.smbonline.mdssync.exc;

import org.springframework.lang.Nullable;

import java.net.ConnectException;

/**
 * Exception specifies that MDS-API call failed due to connection problems.
 */
public class MdsApiConnectionException extends ConnectException {

    private final Throwable cause;

    public MdsApiConnectionException(final String msg) {
        this(msg, null);
    }

    public MdsApiConnectionException(final String msg, final @Nullable Throwable cause) {
        super(msg);
        this.cause = cause;
    }

    @Override
    public synchronized @Nullable Throwable getCause() {
        return this.cause;
    }
}
