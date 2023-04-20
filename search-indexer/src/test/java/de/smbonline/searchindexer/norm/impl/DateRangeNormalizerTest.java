package de.smbonline.searchindexer.norm.impl;

import java.util.Date;
import java.util.Locale;

import de.smbonline.searchindexer.dto.DateRange;
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.lang3.tuple.Triple;
import org.junit.jupiter.api.Test;

import static de.smbonline.searchindexer.norm.impl.TestData.createObject;
import static org.assertj.core.api.Assertions.assertThat;

public class DateRangeNormalizerTest {

    @Test
    public void justPrintMinAndMaxDates() {
        String pattern = "G y-MM-dd HH:mm:ss.SSS";
        Date min = new Date(Long.MIN_VALUE);
        Date max = new Date(Long.MAX_VALUE);
        System.out.printf("min: %s = %d%n", DateFormatUtils.format(min, pattern, Locale.ENGLISH), min.getTime());
        System.out.printf("max: %s = %d%n", DateFormatUtils.format(max, pattern, Locale.ENGLISH), max.getTime());
    }

    @Test
    public void testAttributeKey() {
        DateRangeNormalizer normalizer = new DateRangeNormalizer();
        assertThat(normalizer.getAttributeKey()).isEqualTo("dateRange");
    }

    @Test
    public void testMapping_FromToExistsAD() throws Exception {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "1805"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "2022")
        );
        // when
        DateRangeNormalizer normalizer = new DateRangeNormalizer();
        DateRange value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        //
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("1805-01-01 AD 00:00:00.000"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("2022-12-31 AD 23:59:59.999"));
    }

    @Test
    public void testMapping_FromToExistsBC() throws Exception {
        ObjectData obj;
        DateRange value;
        DateRangeNormalizer normalizer = new DateRangeNormalizer();

        // -- check different years --

        // given
        obj = createObject(
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "-700"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "-680")
        );
        // when
        value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("0700-01-01 BC 00:00:00.000"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("0680-12-31 BC 23:59:59.999"));

        // -- check different months --

        // given
        obj = createObject(
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "15.3.-216"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "13.4.-216")
        );
        // when
        value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("0216-03-15 BC 00:00:00.000"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("0216-04-13 BC 23:59:59.999"));

        // -- check different days --

        // given
        obj = createObject(
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "13.4.-232"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "18.4.-232")
        );
        // when
        value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("0232-04-13 BC 00:00:00.000"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("0232-04-18 BC 23:59:59.999"));
    }

    @Test
    public void testMapping_FromToExistsPassingYear0() throws Exception {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "-10"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "20")
        );
        // when
        DateRangeNormalizer normalizer = new DateRangeNormalizer();
        DateRange value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("0010-01-01 BC 00:00:00.000"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("0020-12-31 AD 23:59:59.999"));
    }

    @Test
    public void testMapping_FromToExistsButIsInvalid() throws Exception {
        ObjectData obj;
        DateRange value;
        DateRangeNormalizer normalizer = new DateRangeNormalizer();

        // given
        obj = createObject(
                // supposed to be 1888-1890 but should we know?
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "1888"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "90")
        );
        // when
        value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();

        // ---

        // given
        obj = createObject(
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "1888"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "90"),
                // this we can handle
                Triple.of("ObjDateGrp.DateTxt", "[123].ObjDateGrp.item[1].DateTxt", "1888-90")
        );
        // when
        value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("1888-01-01 AD 00:00:00.000"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("1890-12-31 AD 23:59:59.999"));
    }

    @Test
    public void testMapping_NoDateInfo() {
        // given
        ObjectData obj = createObject(123L, Pair.of("ObjDateGrp.Foobar", "nothing"));
        // when
        DateRangeNormalizer normalizer = new DateRangeNormalizer();
        DateRange value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }

    @Test
    public void testMapping_NoDataAvailable() {
        // given
        ObjectData obj = createObject(
                Triple.of("ObjDateGrp.DateTxt", "[123].ObjDateGrp.item[1].DateTxt", "nicht datierbar")
        );
        // when
        DateRangeNormalizer normalizer = new DateRangeNormalizer();
        DateRange value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNull();
    }

    @Test
    public void testTryGuessDateRange_NoDataAvailable() {
        DateRange dateRange;

        dateRange = DateRangeNormalizer.tryGuessDateRange("o.J.");
        assertThat(dateRange).isNull();
        dateRange = DateRangeNormalizer.tryGuessDateRange("ohne Datum");
        assertThat(dateRange).isNull();
        dateRange = DateRangeNormalizer.tryGuessDateRange("undatiert");
        assertThat(dateRange).isNull();
    }

    @Test
    public void testTryGuessDateRangeFromText() throws Exception {
        DateRange dateRange;

        dateRange = DateRangeNormalizer.tryGuessDateRange("0");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("0000-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("0000-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("1234");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("1234-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("1234-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("1234/5678\t");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("1234-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("5678-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("\n956 - 1012");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("0956-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("1012-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("zwischen 800 und 850");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("0800-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("0850-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("\twohl um 12");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isGreaterThanOrEqualTo(datetimeSeconds("0000-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isLessThanOrEqualTo(datetimeSeconds("0022-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("1.4.2001 12:03:55.672");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("2001-04-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("2001-04-01 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("wohl um 2010/20");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("2010-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("2020-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("1843/44");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("1843-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("1844-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("1901/2");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("1901-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("1902-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("19. Jhd");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("1800-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("1899-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("Volksrepublik China, um 1958");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isGreaterThanOrEqualTo(datetimeSeconds("1950-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isLessThanOrEqualTo(datetimeSeconds("1968-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("12. - 13. Jahrhundert");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("1100-01-01 AD 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("1299-12-31 AD 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("2800-2700 vor Christus, Djemdet-Nasr-zeitlich");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isEqualTo(datetimeSeconds("2800-01-01 BC 00:00:00"));
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("2700-12-31 BC 23:59:59"));

        dateRange = DateRangeNormalizer.tryGuessDateRange("\twohl vor 300 v.Chr.");
        assertThat(dateRange).isNotNull();
        assertThat(dateRange.getGte()).isNull();
        assertThat(dateRange.getLte()).isEqualTo(datetimeSeconds("0301-12-31 BC 23:59:59"));
    }

    @Test
    public void testTryFixInvalidDate() throws Exception {
        // given
        ObjectData obj = createObject(
                // supposed to be 1888-1890 but should we know?
                Triple.of("ObjDateGrp.DateFromTxt", "[123].ObjDateGrp.item[1].DateFromTxt", "30.2.1992"),
                Triple.of("ObjDateGrp.DateToTxt", "[123].ObjDateGrp.item[1].DateToTxt", "35.3.1992")
        );
        // when
        DateRangeNormalizer normalizer = new DateRangeNormalizer();
        DateRange value = normalizer.resolveAttributeValue(obj, "de");
        // then
        assertThat(value).isNotNull();
        assertThat(value.getGte()).isEqualTo(datetimeSeconds("1992-02-29 AD 00:00:00"));
        assertThat(value.getLte()).isEqualTo(datetimeSeconds("1992-03-31 AD 23:59:59"));
    }

    private long datetimeSeconds(final String str) throws Exception {
        long millis = FastDateFormat.getInstance("yyyy-MM-dd G HH:mm:ss", Locale.ENGLISH).parse(str).getTime();
        return millis/1000;
    }
}
