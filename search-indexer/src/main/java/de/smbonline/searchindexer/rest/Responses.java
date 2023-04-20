package de.smbonline.searchindexer.rest;

import de.smbonline.searchindexer.dto.Data;
import de.smbonline.searchindexer.dto.Format;
import de.smbonline.searchindexer.dto.Projection;
import de.smbonline.searchindexer.util.CsvTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Objects;
import java.util.stream.Collectors;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.dto.JsonAttr.*;
import static org.springframework.http.HttpStatus.*;

public final class Responses {

    public static final String RESPONSE_ERROR_ATTRIBUTE = "error";

    private static final Logger LOGGER = LoggerFactory.getLogger(Responses.class);

    public static ResponseEntity<Data> handleDataResponse(final Data response, final Projection projection) {
        if (response.hasAttribute(RESPONSE_ERROR_ATTRIBUTE)) {
            return ResponseEntity.status(BAD_GATEWAY).body(response);
        }
        switch (projection) {
            case ID:
                // remove everything but the object ids
                if (response.hasAttribute(ATTR_RESULTS)) {
                    Objects.requireNonNull(response.<Collection<Data>>getTypedAttribute(ATTR_RESULTS)).forEach(Responses::removeAllButId);
                } else if (response.hasAttribute(ID_ATTRIBUTE)) {
                    removeAllButId(response);
                }
                break;
            case FLAT:
                // only return formatted values
                flattenDataResponse(response);
                break;
            case FULL:
            default:
                // data is fully retrieved, no reason for transformation
        }
        return ResponseEntity.ok(response);
    }


    public static ResponseEntity<StreamingResponseBody> handleDataResponse(final Data response, final Format format) {
        if (response.hasAttribute(RESPONSE_ERROR_ATTRIBUTE)) {
            return ResponseEntity.status(BAD_GATEWAY).build();
        }
        flattenDataResponse(response);
        try {
            File file;
            switch (format) {
                default:
                case JSON:
                    file = new File(System.getProperty("java.io.tmpdir") + "tmp.json");
                    try (FileWriter fileWriter = new FileWriter(file, StandardCharsets.UTF_8)) {
                        fileWriter.write(response.toString());
                    }
                    break;
                case EXCEL: // TBD
                case CSV:
                    file = CsvTransformer.getInstance().transform(response);
                    break;
            }

            StreamingResponseBody responseBody = outputStream -> Files.copy(file.toPath(), outputStream);
            String contentDisposition = "attachment; filename=data." + format.toString().toLowerCase();
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .body(responseBody);

        } catch (IOException exception) {
            LOGGER.error("Could not transform data", exception);
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).build();
        }
    }

    private static void flattenFields(final Data data) {
        for (String field : data.getAttributes().keySet()) {
            Object value = data.getAttribute(field);
            if (value instanceof Data) {
                data.setAttribute(field, ((Data) value).getAttribute(FORMATTED_VALUE_ATTRIBUTE));
            } else if (value instanceof Collection) {
                Iterator<?> iterator = ((Collection<?>) value).iterator();
                if (iterator.hasNext() && iterator.next() instanceof Data) {
                    Collection<String> values = ((Collection<Data>) value).stream()
                            .map(nested -> nested.<String>getTypedAttribute(FORMATTED_VALUE_ATTRIBUTE))
                            .collect(Collectors.toList());
                    data.setAttribute(field, values);
                }
            }
        }
    }

    private static void flattenDataResponse(Data response) {
        if (response.hasAttribute(ATTR_RESULTS)) {
            Objects.requireNonNull(response.<Collection<Data>>getTypedAttribute(ATTR_RESULTS)).forEach(Responses::flattenFields);
        } else if (response.hasAttribute(ID_ATTRIBUTE)) {
            flattenFields(response);
        }
    }

    private static void removeAllButId(final Data data) {
        Collection<String> keys = new ArrayList<>(data.getAttributes().keySet());
        keys.stream().filter(key -> !key.equals(ID_ATTRIBUTE)).forEach(data::removeAttribute);
    }

    private Responses() {
        // no instances
    }
}
