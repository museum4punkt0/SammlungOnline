package de.smbonline.sitemap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Objects;

@Configuration
@ConfigurationProperties(prefix = "sitemap")
public class SitemapConfig {

    private String sitemapLocation;
    private String researchBaseUrl;
    private String topicsBaseUrl;
    private String guideBaseUrl;

    public String getSitemapLocation() {
        return this.sitemapLocation;
    }

    public void setSitemapLocation(final String loc) {
        this.sitemapLocation = Objects.requireNonNull(loc);
    }

    public String getResearchBaseUrl() {
        return this.researchBaseUrl;
    }

    public void setResearchBaseUrl(final String loc) {
        this.researchBaseUrl = Objects.requireNonNull(loc);
    }

    public String getTopicsBaseUrl() {
        return this.topicsBaseUrl;
    }

    public void setTopicsBaseUrl(final String loc) {
        this.topicsBaseUrl = Objects.requireNonNull(loc);
    }

    public String getGuideBaseUrl() {
        return this.guideBaseUrl;
    }

    public void setGuideBaseUrl(final String loc) {
        this.guideBaseUrl = Objects.requireNonNull(loc);
    }
}
