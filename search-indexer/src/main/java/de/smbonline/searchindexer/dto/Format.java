package de.smbonline.searchindexer.dto;

import java.util.Arrays;
import java.util.Optional;

public enum Format {

    // TBD LIDO?
    JSON,
    CSV,
    EXCEL;

    public static final String DEFAULT_FORMAT_NAME = "csv";
    public static final Format DEFAULT_FORMAT = getOrDefault(DEFAULT_FORMAT_NAME);

    public static Format getOrDefault(final Object obj) {
        Optional<Format> format = Optional.empty();
        if (obj instanceof Format) {
            format = Optional.of((Format) obj);
        }
        if (obj instanceof String) {
            format = Arrays.stream(values()).filter(p -> p.name().equalsIgnoreCase((String) obj)).findFirst();
        }
        if (obj instanceof Number) {
            format = Arrays.stream(values()).filter(p -> p.ordinal() == ((Number) obj).intValue()).findFirst();
        }
        return format.orElse(DEFAULT_FORMAT);
    }
}
