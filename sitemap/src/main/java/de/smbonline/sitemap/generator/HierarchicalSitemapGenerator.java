package de.smbonline.sitemap.generator;

import de.smbonline.sitemap.exc.SizeLimitExceededException;
import de.smbonline.sitemap.model.SitemapIndex;
import de.smbonline.sitemap.model.SitemapIndexList;
import de.smbonline.sitemap.model.SitemapUrl;
import de.smbonline.sitemap.model.SitemapUrlSet;
import org.apache.commons.lang3.StringUtils;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import java.io.File;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Generates multiple sitemap url sets if needed and a sitemap index directing to the url sets.
 * Validation will check the limit of site index entries, which is 50k.
 */
public class HierarchicalSitemapGenerator extends SitemapGenerator {

    private static final String PLAIN_SITEMAP_PREFIX = "PlainSitemap_";

    private final List<SitemapUrlSet> sitemapUrlSets;
    private final String publicPath;

    /**
     * Create an instance of HierarchicalSitemapGenerator to generate multiple sitemap url sets and a
     * single sitemap index.
     *
     * @param publicPath The public path which will be used to link to the single files containing a
     *                   url set.
     */
    public HierarchicalSitemapGenerator(final String publicPath) {
        this.sitemapUrlSets = new ArrayList<>();
        this.publicPath = StringUtils.appendIfMissing(publicPath, "/");
    }

    /**
     * Adds a list of sitemap urls to the existing url set.
     *
     * @param sitemapUrls
     * @throws SizeLimitExceededException
     */
    public synchronized void addSitemapUrls(final List<SitemapUrl> sitemapUrls) {
        validate(this.sitemapUrlSets.size() + sitemapUrls.size() / MAX_SITEMAP_URL_SIZE);

        // TODO weird code style

        SitemapUrlSet sitemapUrlSet = getLatestSitemapUrlSet();
        int maxSize = MAX_SITEMAP_URL_SIZE - sitemapUrlSet.getUrls().size();

        if (sitemapUrls.size() < maxSize) {
            sitemapUrlSet.addUrls(sitemapUrls);
        } else {
            int steps = (int) Math.ceil(sitemapUrls.size() / (float) MAX_SITEMAP_URL_SIZE);
            int offset;
            for (int i = 0; i < steps; i++) {
                sitemapUrlSet = getLatestSitemapUrlSet();
                maxSize = MAX_SITEMAP_URL_SIZE - sitemapUrlSet.getUrls().size();
                offset = MAX_SITEMAP_URL_SIZE * i;
                sitemapUrlSet.addUrls(getSubSet(sitemapUrls, offset, maxSize));
            }
        }
    }

    /**
     * @param sitemapUrlSetsSize
     * @throws SizeLimitExceededException
     */
    private void validate(final int sitemapUrlSetsSize) {
        if (sitemapUrlSetsSize > MAX_SITEMAP_URL_SIZE) {
            String message = "MaxSitemapUrlSize of HierarchicalSitemapGenerator exceeded. Value: " + sitemapUrlSetsSize;
            throw new SizeLimitExceededException(message);
        }
    }

    private List<SitemapUrl> getSubSet(final List<SitemapUrl> sitemapUrls, int offset, int size) {
        List<SitemapUrl> urls = new ArrayList<>(size);
        int stopIndex = Math.min(offset + size, sitemapUrls.size());
        for (int i = offset; i < stopIndex; i++) {
            urls.add(sitemapUrls.get(i));
        }
        return urls;
    }

    private SitemapUrlSet getLatestSitemapUrlSet() {
        if (this.sitemapUrlSets.isEmpty()) {
            return addNewSitemapUrlSet();
        }
        SitemapUrlSet sitemapUrlSet = this.sitemapUrlSets.get(this.sitemapUrlSets.size() - 1);
        if (sitemapUrlSet.getUrls().size() < MAX_SITEMAP_URL_SIZE) {
            return sitemapUrlSet;
        }
        return addNewSitemapUrlSet();
    }

    private SitemapUrlSet addNewSitemapUrlSet() {
        SitemapUrlSet sitemapUrlSet = new SitemapUrlSet();
        this.sitemapUrlSets.add(sitemapUrlSet);
        return sitemapUrlSet;
    }

    /**
     * See {@link SitemapGenerator#marshal(String)}
     *
     * @param xmlFile Path of the output XML file
     * @throws JAXBException
     * @throws SAXException
     * @throws MalformedURLException
     */
    @Override
    public synchronized void marshal(final String xmlFile) throws JAXBException, SAXException, MalformedURLException {
        String path = new File(xmlFile).getParent() + File.separator;

        List<SitemapIndex> sitemapIndices = marshalPlainSitemaps(path);
        SitemapIndexList sitemapIndexList = new SitemapIndexList();
        sitemapIndexList.addSitemapIndices(sitemapIndices);

        marshal(xmlFile, sitemapIndexList, true);
    }

    private synchronized List<SitemapIndex> marshalPlainSitemaps(final String path)
            throws JAXBException, SAXException, MalformedURLException {

        List<SitemapIndex> sitemapIndices = new ArrayList<>(this.sitemapUrlSets.size());
        for (int i = 0, n = this.sitemapUrlSets.size(); i < n; i++) {
            String sitemapFileName = PLAIN_SITEMAP_PREFIX + i + ".xml";
            new PlainSitemapGenerator(this.sitemapUrlSets.get(i)).marshal(path + sitemapFileName);
            SitemapIndex sitemapIndex = new SitemapIndex();
            sitemapIndex.setLocation(this.publicPath + sitemapFileName);
            sitemapIndex.setLastModification(new Date());
            sitemapIndices.add(sitemapIndex);
        }
        return sitemapIndices;
    }
}
