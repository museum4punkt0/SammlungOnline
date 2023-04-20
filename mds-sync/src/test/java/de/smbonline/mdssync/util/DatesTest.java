package de.smbonline.mdssync.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;

import static org.assertj.core.api.Assertions.*;

class DatesTest {

    @Test
    void testLocalDateIsTreatedAsEuropeBerlin() {
        int localHour = 20;
        int offsetHours = OffsetDateTime.now(ZoneId.of("Europe/Berlin")).getOffset().getTotalSeconds() / 60 / 60; // either 1=CET or 2=CEST

        OffsetDateTime actual = Dates.toOffsetDateTime("2022-09-12T" + localHour + ":00:00");
        OffsetDateTime expected = OffsetDateTime.parse("2022-09-12T" + (localHour - offsetHours) + ":00:00+00:00");
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void testNoExceptionWhenBlankOrNull() {
        assertThat(Dates.tryParseDate(null)).isNull();
        assertThat(Dates.tryParseDate("")).isNull();
        assertThat(Dates.tryParseDate(" ")).isNull();
        assertThat(Dates.tryParseDate("\t \t")).isNull();
    }

    @Test
    void testNoExceptionWhenNotParsable() {
        assertThat(Dates.tryParseDate("foobar")).isNull();
        assertThat(Dates.tryParseDate("1.2.3.4.5")).isNull();
        assertThat(Dates.tryParseDate("2020-02-31")).isNull();
    }

    @Test
    void testParseIsoFormat() {
        assertThat(Dates.tryParseDate("2000-12-03")).isEqualTo(LocalDate.of(2000, 12, 3));
        assertThat(Dates.tryParseDate("1-2-3")).isEqualTo(LocalDate.of(1, 2, 3));
    }

    @Test
    void testParseGermanFormat() {
        assertThat(Dates.tryParseDate("2.12.2000")).isEqualTo(LocalDate.of(2000, 12, 2));
        assertThat(Dates.tryParseDate("3.2.1")).isEqualTo(LocalDate.of(1, 2, 3));
        assertThat(Dates.tryParseDate("24.02.91")).isEqualTo(LocalDate.of(91, 2, 24));
    }
}
