package de.smbonline.searchindexer.dto;

import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.Optional;

public enum Projection {

    FLAT,
    FULL,
    ID;

    public static final String DEFAULT_PROJECTION_NAME = "flat";
    public static final Projection DEFAULT_PROJECTION = getOrDefault(DEFAULT_PROJECTION_NAME);

    public static Projection getOrDefault(final @Nullable Object obj) {
        Optional<Projection> projection = Optional.empty();
        if (obj instanceof Projection) {
            projection = Optional.of((Projection) obj);
        }
        if (obj instanceof String) {
            projection = Arrays.stream(values()).filter(p -> p.name().equalsIgnoreCase((String) obj)).findFirst();
        }
        if (obj instanceof Number) {
            projection = Arrays.stream(values()).filter(p -> p.ordinal() == ((Number) obj).intValue()).findFirst();
        }
        return projection.orElse(DEFAULT_PROJECTION);
    }
}
