package de.smbonline.sitemap.service;

import org.apache.commons.lang3.StringUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

public interface DataService {

    List<String> getPathSegments();

    static String toSlug(final String something) {
        // try best possible normalization
        String sluggy = something
                .replace("ß", "ss")
                .replaceAll("[ /.+=]", "-")
                .replaceAll("[`´'\"?!:,;()\\[\\]{}]", "")
                .toLowerCase()
                .trim();
        sluggy = StringUtils.stripAccents(sluggy);
        sluggy = StringUtils.stripEnd(sluggy, "-");
        // whatever remains needs to be url encoded
        return URLEncoder.encode(sluggy, StandardCharsets.UTF_8);
    }
}
