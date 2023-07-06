package de.smbonline.searchindexer.rest;


import de.smbonline.searchindexer.conf.PlaceholderConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class PlaceholderReplacementFilter extends OncePerRequestFilter {

    private final PlaceholderConfig config;

    @Autowired
    public PlaceholderReplacementFilter(final PlaceholderConfig config) {
        this.config = config;
    }

    @Override
    protected boolean shouldNotFilter(final HttpServletRequest request) {
        return !request.getServletPath().startsWith("/search");
    }

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain chain) throws IOException, ServletException {

        ContentCachingResponseWrapper wrapper = new ContentCachingResponseWrapper(response);
        super.doFilter(request, wrapper, chain);

        // fetch old body
        String body = new String(wrapper.getContentAsByteArray(), StandardCharsets.UTF_8);
        // build new body
        for (Map.Entry<String, String> placeholder : this.config.getPlaceholders().entrySet()) {
            body = body.replace("{" + placeholder.getKey() + "}", placeholder.getValue());
        }
        // write new body
        wrapper.resetBuffer();
        wrapper.getOutputStream().write(body.getBytes(StandardCharsets.UTF_8));
        wrapper.copyBodyToResponse();
    }
}
