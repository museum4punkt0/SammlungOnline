package de.smbonline.mdssync.exc;

import javax.validation.constraints.NotBlank;

/**
 * Exception indicates a precondition validation check failed.
 */
public class ValidationException extends RuntimeException {

    public ValidationException(final @NotBlank String message) {
        this(message, null);
    }

    public ValidationException(final @NotBlank String message, final Throwable cause) {
        super(message, cause);
    }
}
