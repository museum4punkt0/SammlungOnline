package de.smbonline.searchindexer.rest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.web.client.HttpClientErrorException;

public final class Requests {

    public static long requireNumericPathElement(final @Nullable String candidate) {
        if (StringUtils.isNumeric(candidate)) {
            return Long.parseLong(candidate);
        }
        throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
    }

    private Requests() {
        // no instances
    }
}
