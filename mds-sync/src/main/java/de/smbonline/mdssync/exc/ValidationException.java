package de.smbonline.mdssync.exc;


import org.springframework.lang.Nullable;

/**
 * Exception indicates a precondition validation check failed.
 */
public class ValidationException extends RuntimeException {

    public ValidationException(final String message) {
        this(message, null);
    }

    public ValidationException(final String message, final @Nullable Throwable cause) {
        super(message, cause);
    }
}
