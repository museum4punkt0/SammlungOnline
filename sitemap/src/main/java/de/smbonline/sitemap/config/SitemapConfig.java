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
    private String islBaseUrl;
    private final StrapiPlatform strapiPlatform = new StrapiPlatform();

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

    public String getIslBaseUrl() {
        return islBaseUrl;
    }

    public void setIslBaseUrl(String islStoryUrl) {
        this.islBaseUrl = islStoryUrl;
    }

    public StrapiPlatform getStrapiPlatform() {
        return strapiPlatform;
    }

    public final class StrapiPlatform {

        private String smb;
        private String hbf;
        private String kgm;

        public String getSmb() {
            return smb;
        }

        public void setSmb(String smb) {
            this.smb = smb;
        }

        public String getHbf() {
            return hbf;
        }

        public void setHbf(String hbf) {
            this.hbf = hbf;
        }

        public String getKgm() {
            return kgm;
        }

        public void setKgm(String kgm) {
            this.kgm = kgm;
        }
    }
}
