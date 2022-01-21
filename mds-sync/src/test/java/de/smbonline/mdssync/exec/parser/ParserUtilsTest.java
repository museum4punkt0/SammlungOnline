package de.smbonline.mdssync.exec.parser;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class ParserUtilsTest {

    @Test
    public void buildKey() {
        String expected;

        expected = "one.two.three";
        assertThat(ParserUtils.toKey("one.two.[123].three")).isEqualTo(expected);

        expected = "one.two.three.four";
        assertThat(ParserUtils.toKey("one.[1].two.[12].three.[123].four")).isEqualTo(expected);

        expected = "one.two.three.four.five.six";
        assertThat(ParserUtils.toKey("[foobar].one.two.[123].three.[*].four.five.six.[abc]")).isEqualTo(expected);
    }

    @Test
    public void buildFqKey() {

        assertThat(ParserUtils.joinFqKey(null, null, "0")).isEqualTo("[0]");
        assertThat(ParserUtils.joinFqKey("[0]", null, null)).isEqualTo("[0]");

        assertThat(ParserUtils.joinFqKey(null, "one.two", "12")).isEqualTo("one.two[12]");
        assertThat(ParserUtils.joinFqKey("one.two", null, "12")).isEqualTo("one.two.[12]");
        assertThat(ParserUtils.joinFqKey("one.two.[12]", null, null)).isEqualTo("one.two.[12]");

        assertThat(ParserUtils.joinFqKey(null, "one.two.[12].three", "123")).isEqualTo("one.two.[12].three[123]");
        assertThat(ParserUtils.joinFqKey("one.two.[12]", "three", "123")).isEqualTo("one.two.[12].three[123]");
        assertThat(ParserUtils.joinFqKey("one.two.[12].three", null, "123")).isEqualTo("one.two.[12].three.[123]");
        assertThat(ParserUtils.joinFqKey("one.two.[12].three.[123]", null, null)).isEqualTo("one.two.[12].three.[123]");
    }

}
