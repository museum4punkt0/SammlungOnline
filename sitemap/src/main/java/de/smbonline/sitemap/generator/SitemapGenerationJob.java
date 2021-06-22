package de.smbonline.sitemap.generator;

import de.smbonline.sitemap.config.SitemapConfig;
import de.smbonline.sitemap.exc.SizeLimitExceededException;
import de.smbonline.sitemap.model.SitemapUrl;
import de.smbonline.sitemap.service.DataService;
import de.smbonline.sitemap.service.GuideDataService;
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
import java.util.stream.Collectors;

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

    @Autowired
    public SitemapGenerationJob(
            final SitemapConfig sitemapConfig,
            final ResearchDataService researchService,
            final TopicDataService topicsService,
            final GuideDataService guideService) {
        this.sitemapConfig = sitemapConfig;
        this.researchService = researchService;
        this.topicsService = topicsService;
        this.guideService = guideService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initialGeneration() {
        CompletableFuture.runAsync(this::generateResearchSitemap);
        CompletableFuture.runAsync(this::generateTopicsSitemap);
        CompletableFuture.runAsync(this::generateGuideSitemap);
    }

    // Every Monday at 01:00
    @Scheduled(cron = "0 0 1 ? * MON *")
    public void generateGuideSitemap() {
        LOGGER.info("Generating Guide Sitemap...");
        long start = System.currentTimeMillis();
        execute(sitemapConfig.getGuideBaseUrl(), this.guideService, "guide");
        long end = System.currentTimeMillis();
        LOGGER.info("Guide Sitemap Generation took {}s", (end - start) / 1000);
    }

    // Every Monday at 01:05
    @Scheduled(cron = "0 5 1 ? * MON *")
    public void generateTopicsSitemap() {
        LOGGER.info("Generating Topics Sitemap...");
        long start = System.currentTimeMillis();
        execute(sitemapConfig.getTopicsBaseUrl(), this.topicsService, "topics");
        long end = System.currentTimeMillis();
        LOGGER.info("Topics Sitemap Generation took {}s", (end - start) / 1000);
    }

    // Every Monday at 01:10
    @Scheduled(cron = "0 10 1 ? * MON *")
    public void generateResearchSitemap() {
        LOGGER.info("Generating Research Sitemap...");
        long start = System.currentTimeMillis();
        execute(sitemapConfig.getResearchBaseUrl(), this.researchService, "research");
        long end = System.currentTimeMillis();
        LOGGER.info("Research Sitemap Generation took {}s", (end - start) / 1000);
    }

    private void execute(final String publicUrl, final DataService dataService, final String suffix) {
        try {
            String sitemapUrl = StringUtils.appendIfMissing(publicUrl, "/") + "sitemaps/" + suffix;
            String xmlPath = StringUtils.appendIfMissing(sitemapConfig.getSitemapLocation(), "/") + suffix;
            String xmlFile = StringUtils.appendIfMissing(xmlPath, "/") + "sitemap.xml";
            Files.createDirectories(Path.of(xmlPath));
            List<String> ids = dataService.getIds();
            List<SitemapUrl> sitemapUrls = createSitemapUrls(ids, publicUrl);
            createHierarchicalSitemap(sitemapUrls, sitemapUrl, xmlFile);
        } catch (IOException e) {
            LOGGER.error("Could not create sitemap.xml", e);
        } catch (SizeLimitExceededException e) {
            LOGGER.error("Size of url sets exceeded", e);
        } catch (SAXException | JAXBException e) {
            LOGGER.error("Error while creating the xml files", e);
        }
    }

    /**
     * Creates the hierarchical sitemap.
     *
     * @param sitemapUrls
     * @return the path to the generated file
     * @throws SizeLimitExceededException
     * @throws JAXBException
     * @throws SAXException
     * @throws MalformedURLException
     */
    private String createHierarchicalSitemap(
            final List<SitemapUrl> sitemapUrls,
            final String publicUrl,
            final String xmlFile) throws JAXBException, SAXException, MalformedURLException {
        String sanitizedPublicUrl = StringUtils.appendIfMissing(publicUrl, "/");
        HierarchicalSitemapGenerator hierarchicalSitemapGenerator = new HierarchicalSitemapGenerator(sanitizedPublicUrl);
        hierarchicalSitemapGenerator.addSitemapUrls(sitemapUrls);
        hierarchicalSitemapGenerator.marshal(xmlFile);
        return xmlFile;
    }

    /**
     * Creates a list of {@code SitemapUrl} based on the given ids.
     * <p>
     * The urls will be generated
     * </p>
     *
     * @param ids
     * @return
     */
    private List<SitemapUrl> createSitemapUrls(final List<String> ids, final String publicUrl) {
        String sanitizedPublicUrl = StringUtils.appendIfMissing(publicUrl, "/");
        return ids.stream()
                .map(id -> createSitemapUrl(sanitizedPublicUrl + id))
                .collect(Collectors.toList());
    }

    private SitemapUrl createSitemapUrl(final String publicUrl) {
        SitemapUrl sitemapUrl = new SitemapUrl();
        sitemapUrl.setLocation(publicUrl);
        sitemapUrl.setLastModification(new Date());
        return sitemapUrl;
    }
}
