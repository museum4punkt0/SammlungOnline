package de.smbonline.sitemap.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@EnableWebMvc
@Configuration
public class ResourceHandlerConfiguration implements WebMvcConfigurer {

    private final SitemapConfig sitemapConfig;

    @Autowired
    public ResourceHandlerConfiguration(final SitemapConfig config) {
        this.sitemapConfig = config;
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/sitemaps/**")
                .addResourceLocations("file:" + this.sitemapConfig.getSitemapLocation())
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());
    }
}
