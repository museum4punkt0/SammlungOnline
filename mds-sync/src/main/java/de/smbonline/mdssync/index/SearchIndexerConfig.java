package de.smbonline.mdssync.index;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Objects;

@Configuration
@ConfigurationProperties(prefix = "search-indexer")
public class SearchIndexerConfig {

    private boolean shouldUpdate = true;

    private String baseUrl = "SEARCH_INDEXER_URL_NOT_SET";

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(final String baseUrl) {
        this.baseUrl = Objects.requireNonNull(baseUrl);
    }

    public void setShouldUpdate(final boolean shouldUpdate) {
        this.shouldUpdate = shouldUpdate;
    }

    public boolean isShouldUpdate() {
        return shouldUpdate;
    }
}
