package de.smbonline.searchindexer.util;

import org.apache.commons.lang3.StringUtils;

public final class Misc {

    public static final char[] WORD_DELIMITERS = "\t /+-()[]{}<>.?!:;\"".toCharArray();

    public static String unwrapQuotes(final String str) {
        return StringUtils.unwrap(str, '"');
    }

    public static String wrapQuotes(final String str) {
        return StringUtils.containsAny(str, WORD_DELIMITERS) ? StringUtils.wrap(str, '"') : str;
    }

    public static String wrapBrackets(final String str) {
        return StringUtils.containsAny(str, WORD_DELIMITERS) ? "(" + str + ")" : str;
    }

    private Misc() {
        // no instances
    }
}
