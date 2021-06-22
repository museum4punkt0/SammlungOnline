package de.smbonline.sitemap.generator;

import de.smbonline.sitemap.exc.SizeLimitExceededException;
import de.smbonline.sitemap.model.SitemapUrl;
import de.smbonline.sitemap.model.SitemapUrlSet;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import java.net.MalformedURLException;

/**
 * Generates a sitemap XML file based on the provided list of {@link SitemapUrl}. Validation will
 * check the limit of sitemap urls, which is 50k.
 */
public class PlainSitemapGenerator extends SitemapGenerator {

    private final SitemapUrlSet sitemapUrlSet;

    /**
     * Create an instance of PlainSitemapGenerator to generate a single XML file containing url set
     * of a sitemap.
     *
     * @param sitemapUrlSet
     * @throws SizeLimitExceededException If size of sitemapUrls > 50000
     */
    public PlainSitemapGenerator(final SitemapUrlSet sitemapUrlSet) {
        validate(sitemapUrlSet);
        this.sitemapUrlSet = sitemapUrlSet;
    }

    /**
     * @param sitemapUrlSet
     * @throws SizeLimitExceededException
     */
    private void validate(final SitemapUrlSet sitemapUrlSet) {
        if (sitemapUrlSet != null && sitemapUrlSet.getUrls().size() > MAX_SITEMAP_URL_SIZE) {
            String message = "MaxSitemapUrlSize of PlainSitemapGenerator exceeded. Value: " + sitemapUrlSet.getUrls().size();
            throw new SizeLimitExceededException(message);
        }
    }

    /**
     * See {@link SitemapGenerator#marshal(String)}
     *
     * @param xmlFile
     * @throws JAXBException
     * @throws SAXException
     * @throws MalformedURLException
     */
    @Override
    public void marshal(final String xmlFile) throws JAXBException, SAXException, MalformedURLException {
        marshal(xmlFile, this.sitemapUrlSet, false);
    }
}
