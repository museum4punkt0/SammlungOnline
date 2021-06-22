package de.smbonline.mdssync.util;

import de.smbonline.mdssync.exc.ValidationException;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;

public class ValidationsTest {

    @Test
    public void testStartBeforeEnd_FAIL() {
        assertThatExceptionOfType(ValidationException.class)
                .isThrownBy(() -> Validations.ensureStartBeforeEnd(LocalDateTime.MAX, LocalDateTime.MIN))
                .withMessageMatching("start( | .* )before( | .* )end");
    }

    @Test
    public void testStartBeforeEnd_SUCCESS() {
        assertThat(catchThrowable(() ->
                Validations.ensureStartBeforeEnd(LocalDateTime.MIN, LocalDateTime.MAX)
        )).isNull();
    }

    @Test
    @SuppressWarnings("varargs")
    public void testIsVarArgsDefined() {
        assertThat(Validations.isVarArgsDefined()).isFalse();
        assertThat(Validations.isVarArgsDefined((String) null)).isFalse();
        assertThat(Validations.isVarArgsDefined(new String[0])).isFalse();
        assertThat(Validations.isVarArgsDefined(new String[]{null})).isFalse();
        assertThat(Validations.isVarArgsDefined(new String[]{"string"})).isTrue();
        assertThat(Validations.isVarArgsDefined("one", "two", "three")).isTrue();
        assertThat(Validations.isVarArgsDefined("notnull", null)).isTrue();
        assertThat(Validations.isVarArgsDefined(null, "notnull")).isTrue();
    }

    @Test
    public void testRequireArrayLength_SUCCESS() {
        for (int i = 0; i < 20; i++) {
            String[] ok = Validations.requireArrayLength(i, new String[i]);
            assertThat(ok).hasSize(i);
        }
    }

    @Test
    public void testRequireArrayLength_FAIL() {
        assertThatExceptionOfType(ValidationException.class)
                .isThrownBy(() -> Validations.requireArrayLength(12, new String[2]))
                .withMessageContaining("array length");
    }
}
