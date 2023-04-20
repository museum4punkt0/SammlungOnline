package de.smbonline.sitemap.generator;

import de.smbonline.sitemap.config.SitemapConfig;
import de.smbonline.sitemap.exc.SizeLimitExceededException;
import de.smbonline.sitemap.model.ChangeFrequency;
import de.smbonline.sitemap.model.SitemapUrl;
import de.smbonline.sitemap.service.DataService;
import de.smbonline.sitemap.service.GuideDataService;
import de.smbonline.sitemap.service.IslDataService;
import de.smbonline.sitemap.service.ResearchDataService;
import de.smbonline.sitemap.service.TopicDataService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Job that generates the sitemap
 */
@Component
public class SitemapGenerationJob {

    private static final Logger LOGGER = LoggerFactory.getLogger(SitemapGenerationJob.class);

    private final SitemapConfig sitemapConfig;
    private final ResearchDataService researchService;
    private final TopicDataService topicsService;
    private final GuideDataService guideService;
    private final IslDataService islDataService;

    @Autowired
    public SitemapGenerationJob(
            final SitemapConfig sitemapConfig,
            final ResearchDataService researchService,
            final TopicDataService topicsService,
            final GuideDataService guideService,
            final IslDataService islDataService) {
        this.sitemapConfig = sitemapConfig;
        this.researchService = researchService;
        this.topicsService = topicsService;
        this.guideService = guideService;
        this.islDataService = islDataService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initialGeneration() {
        CompletableFuture.runAsync(this::generateResearchSitemap);
        CompletableFuture.runAsync(this::generateTopicsSitemap);
        CompletableFuture.runAsync(this::generateGuideSitemap);
        CompletableFuture.runAsync(this::generateIslSitemap);
    }

    // Every Monday at 01:00
    @Scheduled(cron = "0 0 1 ? * MON *")
    public void generateGuideSitemap() {
        LOGGER.info("Generating GUIDE sitemap...");
        long start = System.currentTimeMillis();
        boolean created = execute(this.sitemapConfig.getGuideBaseUrl(), this.guideService, "guide");
        if (created) {
            long end = System.currentTimeMillis();
            LOGGER.info("GUIDE sitemap generation took {}s", (end - start) / 1000);
        } else {
            LOGGER.info("GUIDE sitemap not created.");
        }
    }

    // Every Monday at 01:05
    @Scheduled(cron = "0 5 1 ? * MON *")
    public void generateTopicsSitemap() {
        LOGGER.info("Generating TOPICS sitemap...");
        long start = System.currentTimeMillis();
        boolean created = execute(this.sitemapConfig.getTopicsBaseUrl(), this.topicsService, "topics");
        if (created) {
            long end = System.currentTimeMillis();
            LOGGER.info("TOPICS sitemap generation took {}s", (end - start) / 1000);
        } else {
            LOGGER.info("TOPICS sitemap not created.");
        }
    }

    // Every Monday at 01:10
    @Scheduled(cron = "0 10 1 ? * MON *")
    public void generateResearchSitemap() {
        LOGGER.info("Generating RESEARCH sitemap...");
        long start = System.currentTimeMillis();
        boolean created = execute(this.sitemapConfig.getResearchBaseUrl(), this.researchService, "research");
        if (created) {
            long end = System.currentTimeMillis();
            LOGGER.info("RESEARCH sitemap generation took {}m", (end - start) / 1000 / 60);
        } else {
            LOGGER.info("RESEARCH sitemap not created.");
        }
    }

    // Every Monday at 01:15
    @Scheduled(cron = "0 15 1 ? * MON *")
    public void generateIslSitemap() {
        LOGGER.info("Generating ISL sitemap...");
        long start = System.currentTimeMillis();
        boolean created = execute(this.sitemapConfig.getIslBaseUrl(), this.islDataService, "isl");
        if (created) {
            long end = System.currentTimeMillis();
            LOGGER.info("ISL sitemap generation took {}s", (end - start) / 1000);
        } else {
            LOGGER.info("ISL sitemap not created.");
        }
    }

    private boolean execute(final String publicUrl, final DataService dataService, final String suffix) {

        try {

            String xmlPath = StringUtils.appendIfMissing(sitemapConfig.getSitemapLocation(), "/") + suffix;
            Files.createDirectories(Path.of(xmlPath));

            LOGGER.debug("Fetching data for {} sitemap...", suffix.toUpperCase());
            List<String> ids = dataService.getPathSegments();
            LOGGER.info("{} {} entries fetched.", ids.size(), suffix);

            if (!ids.isEmpty()) {
                LOGGER.debug("Creating sitemap...");
                List<SitemapUrl> sitemapUrls = createSitemapUrls(ids, publicUrl);
                String sitemapUrl = StringUtils.appendIfMissing(publicUrl, "/") + "sitemaps/" + suffix;
                String xmlFile = createHierarchicalSitemap(sitemapUrls, sitemapUrl, xmlPath);
                LOGGER.info("{} sitemap created at {}.", suffix.toUpperCase(), xmlFile);
                return true;
            }

        } catch (IOException e) {
            LOGGER.error("Could not create sitemap.xml: ", e);
        } catch (SizeLimitExceededException e) {
            LOGGER.error("Size of url sets exceeded: ", e);
        } catch (SAXException | JAXBException e) {
            LOGGER.error("Error while creating the xml files: ", e);
        }
        return false;
    }

    private String createHierarchicalSitemap(
            final List<SitemapUrl> sitemapUrls,
            final String publicUrl,
            final String xmlPath) throws JAXBException, SAXException, MalformedURLException {
        String xmlFile = StringUtils.appendIfMissing(xmlPath, "/") + "sitemap.xml";
        String baseUrl = StringUtils.appendIfMissing(publicUrl, "/");
        HierarchicalSitemapGenerator hierarchicalSitemapGenerator = new HierarchicalSitemapGenerator(baseUrl);
        hierarchicalSitemapGenerator.addSitemapUrls(sitemapUrls);
        hierarchicalSitemapGenerator.marshal(xmlFile);
        return xmlFile;
    }

    private List<SitemapUrl> createSitemapUrls(final List<String> ids, final String publicUrl) {
        String sanitizedPublicUrl = StringUtils.appendIfMissing(publicUrl, "/");
        return ids.stream()
                .map(id -> createSitemapUrl(sanitizedPublicUrl + id))
                .toList();
    }

    private SitemapUrl createSitemapUrl(final String publicUrl) {
        SitemapUrl sitemapUrl = new SitemapUrl();
        sitemapUrl.setLocation(publicUrl);
        sitemapUrl.setLastModification(new Date());
        sitemapUrl.setChangeFrequency(ChangeFrequency.WEEKLY); // TBD how to determine frequency
        sitemapUrl.setPriority(0.5f); // TBD how to determine priority
        return sitemapUrl;
    }
}
