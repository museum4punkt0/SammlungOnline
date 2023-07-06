package de.smbonline.mdssync.util;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class MiscTest {

    @Test
    public void sizeToMegaBytes() {
        int value;

        value = Misc.sizeToMegaBytes("");
        assertThat(value).isEqualTo(-1);
        value = Misc.sizeToMegaBytes("foo");
        assertThat(value).isEqualTo(-1);
        value = Misc.sizeToMegaBytes("0");
        assertThat(value).isEqualTo(0);
        value = Misc.sizeToMegaBytes("1000");
        assertThat(value).isEqualTo(1);
        value = Misc.sizeToMegaBytes("2000");
        assertThat(value).isEqualTo(2);
        value = Misc.sizeToMegaBytes("2001");
        assertThat(value).isEqualTo(3);
        value = Misc.sizeToMegaBytes("20000 KB");
        assertThat(value).isEqualTo(20);
        value = Misc.sizeToMegaBytes("20100KB");
        assertThat(value).isEqualTo(21);
        value = Misc.sizeToMegaBytes("5MB");
        assertThat(value).isEqualTo(5);
        value = Misc.sizeToMegaBytes("10.001 MB");
        assertThat(value).isEqualTo(11);
    }
}
