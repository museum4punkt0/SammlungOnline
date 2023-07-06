package de.smbonline.searchindexer.norm.impl.shared;

import de.smbonline.searchindexer.dto.SearchObject;
import de.smbonline.searchindexer.rest.Params;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.*;

public final class Links {

    private static final String TMPL_SEARCH_INTERNAL =
            "<span><a href=\"{search-base-url}?q=%s\" data-link-type=\"internal\">%s</a>%s</span>";
    private static final String TMPL_EXTERNAL =
            "<span><a href=\"%s\" data-link-type=\"external\" target=\"_blank\">%s</a>%s</span>";
    private static final String TMPL_PERMALINK =
            "<span><a href=\"{permalink-base-url}/%d/%s\" data-link-type=\"permalink\">{permalink-base-url}/%d</a></span>";

    public static String lookup(final String type, final Long id) {
        return "{lookup-base-url}/%s/%d".formatted(type, id);
    }

    public static String internal(final String searchParams) {
        return "{search-base-url}?q=%s".formatted(searchParams);
    }

    public static String permalink(final SearchObject obj) {
        return "{permalink-base-url}/%d/%s".formatted(obj.getId(), sluggyTitle(obj));
    }

    // -- Markup --

    public static String internalHTML(final String searchParams, final String displayText) {
        return TMPL_SEARCH_INTERNAL.formatted(searchParams, displayText, "");
    }

    public static String externalHTML(final String uri, final String displayText) {
        return TMPL_EXTERNAL.formatted(uri, displayText, "");
    }

    public static String permalinkHTML(final SearchObject obj) {
        return TMPL_PERMALINK.formatted(obj.getId(), sluggyTitle(obj), obj.getId());
    }

    // -- private helpers --

    private static String sluggyTitle(final SearchObject obj) {
        String text = "";
        if (obj.hasAttribute(TITLE_ATTRIBUTE)) {
            text = obj.getTypedAttribute(TITLE_ATTRIBUTE);
        } else if (obj.hasAttribute(TECHNICAL_TERM_ATTRIBUTE)) {
            text = obj.getNestedTypedAttribute(TECHNICAL_TERM_ATTRIBUTE + "." + FORMATTED_VALUE_ATTRIBUTE);
        } else if (obj.hasAttribute(IDENT_NUMBER_ATTRIBUTE)) {
            text = obj.getTypedAttribute(IDENT_NUMBER_ATTRIBUTE);
        }
        return sluggy(text);
    }

    private static String sluggy(final @Nullable String text) {
        // try best possible normalization
        String sluggy = StringUtils.defaultString(text)
                .replace("ß", "ss")
                .replaceAll("[ /.+=]", "-")
                .replaceAll("[`´'\"?!:,;()\\[\\]{}]", "")
                .toLowerCase()
                .trim();
        sluggy = StringUtils.stripAccents(sluggy);
        sluggy = StringUtils.strip(sluggy, "-");
        while (sluggy.length() > 80 && sluggy.indexOf('-') > -1) {
            sluggy = StringUtils.substringBeforeLast(sluggy, "-");
        }
        // whatever remains needs to be url encoded
        return Params.urlEncode(sluggy);
    }
}
