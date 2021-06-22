package de.smbonline.mdssync.util;

import org.apache.commons.lang3.ArrayUtils;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

public class LookupTest {

    @Test
    public void testFindFirst() {
        String[] array = {"a", "b", "c"};
        String str = Lookup.findFirst(array, e -> e.charAt(0) == 'a');
        assertThat(str).isEqualTo("a");

        List<Number> list = Arrays.asList(1.3, 5.7f, 12L, 123, 34, 2.0, 0.04, 100);
        Number num = Lookup.findFirst(list, n -> n instanceof Integer);
        assertThat(num).isEqualTo(123);
    }

    @Test
    public void testFindRandom() {
        String hit;

        String[] array = {
                /* 0..25 are uppercase letters, this is what we are testing for */
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        };
        hit = Lookup.findFirst(array, s -> s.charAt(0) > 32);
        assertThat(hit).isNotNull();
        assertThat(ArrayUtils.indexOf(array, hit)).isLessThan(26);

        List<String> list = Arrays.asList(array);
        hit = Lookup.findFirst(list, s -> s.charAt(0) > 32);
        assertThat(hit).isNotNull();
        assertThat(ArrayUtils.indexOf(array, hit)).isLessThan(26);
    }

    @Test
    public void testFindAll() {
        String[] array = {"a", "b", "c", "ab", "abc"};
        String[] str = Lookup.findAll(array, s -> s.length() == 1);
        assertThat(str).containsExactlyInAnyOrder("a", "b", "c");

        List<Number> list = Arrays.asList(1.3, 5.7f, 12L, 123, 34, 2.0, 0.04, 100);
        List<Number> num = Lookup.findAll(list, n -> n.intValue() > 10);
        assertThat(num).containsExactlyInAnyOrder(12L, 123, 34, 100);
    }

    @Test
    public void testNoNullPointer() {
        assertThat(Lookup.findAll((Object[]) null, s -> true)).isNull();
        assertThat(Lookup.findOne((Object[]) null, s -> true)).isNull();
        assertThat(Lookup.findFirst((Object[]) null, s -> true)).isNull();

        assertThat(Lookup.findAll((List<?>) null, n -> true)).isNotNull();
        assertThat(Lookup.findAll((List<?>) null, n -> true)).isEmpty();
        assertThat(Lookup.findOne((List<?>) null, s -> true)).isNull();
        assertThat(Lookup.findFirst((List<?>) null, s -> true)).isNull();
    }
}
