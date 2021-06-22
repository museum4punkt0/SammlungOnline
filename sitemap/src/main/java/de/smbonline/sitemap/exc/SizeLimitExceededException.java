package de.smbonline.sitemap.exc;

/**
 * Exception that will be used to protect the maximum size of sitemap entries.
 */
public class SizeLimitExceededException extends RuntimeException {
    public SizeLimitExceededException(final String message) {
        super(message);
    }
}
