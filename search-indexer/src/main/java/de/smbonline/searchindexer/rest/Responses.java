package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
import org.springframework.http.ResponseEntity;

import static org.springframework.http.HttpStatus.*;

public final class Responses {

    public static final String RESPONSE_ERROR_ATTRIBUTE = "error";

    public static ResponseEntity<Data> handleDataResponse(final Data response) {
        if (response.hasAttribute(RESPONSE_ERROR_ATTRIBUTE)) {
            return ResponseEntity.status(BAD_GATEWAY).body(response);
        }
        return ResponseEntity.ok(response);
    }

    private Responses() {
        // no instances
    }
}
