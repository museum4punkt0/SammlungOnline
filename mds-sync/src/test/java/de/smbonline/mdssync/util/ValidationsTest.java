package de.smbonline.mdssync.util;

import de.smbonline.mdssync.exc.ValidationException;
import org.junit.jupiter.api.Test;

import java.time.OffsetDateTime;

import static org.assertj.core.api.Assertions.*;

class ValidationsTest {

    @Test
    void testStartBeforeEnd_FAIL() {
        assertThatExceptionOfType(ValidationException.class)
                .isThrownBy(() -> Validations.ensureStartBeforeEnd(OffsetDateTime.MAX, OffsetDateTime.MIN))
                .withMessageMatching("start( | .* )before( | .* )end");
    }

    @Test
    void testStartBeforeEnd_SUCCESS() {
        assertThat(catchThrowable(() ->
                Validations.ensureStartBeforeEnd(OffsetDateTime.MIN, OffsetDateTime.MAX)
        )).isNull();
    }

    @Test
    @SuppressWarnings({"varargs", "RedundantArrayCreation"})
    void testIsVarArgsDefined() {
        assertThat(Validations.isVarArgsDefined()).isFalse();
        assertThat(Validations.isVarArgsDefined((String) null)).isFalse();
        assertThat(Validations.isVarArgsDefined(new String[0])).isFalse();
        assertThat(Validations.isVarArgsDefined(new String[]{null})).isFalse();
        assertThat(Validations.isVarArgsDefined(new String[]{"string"})).isTrue();
        assertThat(Validations.isVarArgsDefined("string")).isTrue();
        assertThat(Validations.isVarArgsDefined("one", "two", "three")).isTrue();
        assertThat(Validations.isVarArgsDefined("notnull", null)).isTrue();
        assertThat(Validations.isVarArgsDefined(null, "notnull")).isTrue();
    }

    @Test
    void testRequireArrayLength_SUCCESS() {
        for (int i = 0; i < 20; i++) {
            String[] ok = Validations.requireArrayLength(i, new String[i]);
            assertThat(ok).hasSize(i);
        }
    }

    @Test
    void testRequireArrayLength_FAIL() {
        assertThatExceptionOfType(ValidationException.class)
                .isThrownBy(() -> Validations.requireArrayLength(12, new String[2]))
                .withMessageContaining("array length");
    }
}
