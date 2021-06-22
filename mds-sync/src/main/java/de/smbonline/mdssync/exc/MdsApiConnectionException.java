package de.smbonline.mdssync.exc;

import javax.validation.constraints.NotBlank;
import java.net.ConnectException;

/**
 * Exception specifies that MDS-API call failed due to connection problems.
 */
public class MdsApiConnectionException extends ConnectException {

    private final Throwable cause;

    public MdsApiConnectionException(final @NotBlank String msg) {
        this(msg, null);
    }

    public MdsApiConnectionException(final @NotBlank String msg, final Throwable cause) {
        super(msg);
        this.cause = cause;
    }

    @Override
    public synchronized Throwable getCause() {
        return this.cause;
    }
}
