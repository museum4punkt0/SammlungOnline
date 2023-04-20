package de.smbonline.sitemap.controller;

import de.smbonline.sitemap.generator.SitemapGenerationJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.concurrent.CompletableFuture;

@Controller
public class SitemapController {

    private final SitemapGenerationJob sitemapGenerationJob;

    @Autowired
    public SitemapController(final SitemapGenerationJob job) {
        this.sitemapGenerationJob = job;
    }

    @PostMapping("/research")
    public ResponseEntity<String> generateResearch() {
        CompletableFuture.runAsync( this.sitemapGenerationJob::generateResearchSitemap);
        return ResponseEntity.ok("Started");
    }

    @PostMapping("/topics")
    public ResponseEntity<String> generateTopics() {
        CompletableFuture.runAsync( this.sitemapGenerationJob::generateTopicsSitemap);
        return ResponseEntity.ok("Started");
    }

    @PostMapping("/guide")
    public ResponseEntity<String> generateGuide() {
        CompletableFuture.runAsync( this.sitemapGenerationJob::generateGuideSitemap);
        return ResponseEntity.ok("Started");
    }

    @PostMapping("/isl")
    public ResponseEntity<String> generateIsl() {
        CompletableFuture.runAsync( this.sitemapGenerationJob::generateIslSitemap);
        return ResponseEntity.ok("Started");
    }
}
