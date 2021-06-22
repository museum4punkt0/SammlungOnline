package de.smbonline.searchindexer.norm;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class NormalizerRegistryTest {

    private NormalizerRegistry reg = new NormalizerRegistry();

    @Test
    public void testRegister() {
        Normalizer<?> foo = new SimpleMappingNormalizer("foo", "bar");
        Normalizer<?> lurch = new SimpleMappingNormalizer("lurch", "blubb");
        Normalizer<?> strunz = new SimpleMappingNormalizer("strunz", "mimimi");
        Normalizer<?> lalalala = new SimpleMappingNormalizer("lalalala", "muh");

        reg.register(foo);
        reg.register(lurch);
        reg.register(strunz);
        reg.register(lalalala);

        assertThat(reg.getNormalizer("bar")).isSameAs(foo);
        assertThat(reg.getNormalizer("blubb")).isSameAs(lurch);
        assertThat(reg.getNormalizer("mimimi")).isSameAs(strunz);
        assertThat(reg.getNormalizer("muh")).isSameAs(lalalala);
    }
}
