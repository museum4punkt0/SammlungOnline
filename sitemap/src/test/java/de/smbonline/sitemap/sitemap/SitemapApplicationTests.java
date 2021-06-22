package de.smbonline.sitemap.sitemap;

import de.smbonline.sitemap.config.SitemapConfig;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class SitemapApplicationTests {

    @Autowired
    SitemapConfig config;

    @Test
    void contextLoads() {
        // check against values from application-test.yml
        Assertions.assertThat(config.getGuideBaseUrl()).isEqualTo("http://guide");
        Assertions.assertThat(config.getTopicsBaseUrl()).isEqualTo("http://topics");
        Assertions.assertThat(config.getResearchBaseUrl()).isEqualTo("http://research");
    }
}
