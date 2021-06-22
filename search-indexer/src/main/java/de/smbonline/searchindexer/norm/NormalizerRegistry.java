package de.smbonline.searchindexer.norm;

import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

/**
 * Registry for normalizers. Note this is not annotated as Spring Component here.
 * It's created as a singleton Bean in {@link de.smbonline.searchindexer.conf.NormalizerConfigurer} instead.
 */
public class NormalizerRegistry {

    private final List<Normalizer<?>> normalizers = new ArrayList<>();

    public NormalizerRegistry register(final Normalizer<?> normalizer) {
        this.normalizers.add(normalizer);
        return this;
    }

    public @Nullable Normalizer<?> getNormalizer(final String attributeKey) {
        return this.normalizers.stream().filter(norm
                -> attributeKey.equals(norm.getAttributeKey())).findFirst().orElse(null);
    }
}
