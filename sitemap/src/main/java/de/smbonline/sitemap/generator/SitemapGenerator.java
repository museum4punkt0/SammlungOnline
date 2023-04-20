package de.smbonline.sitemap.generator;

import org.xml.sax.SAXException;

import javax.xml.bind.JAXBException;
import java.io.File;
import java.net.MalformedURLException;

/**
 * Abstraction for sitemap generators to marshal plain sitemaps or sitemap-index.
 */
public abstract class SitemapGenerator {

    /**
     * Maximum size of url entries of a sitemap XML file.
     */
    public static final int MAX_SITEMAP_URL_SIZE = 50000;

    /**
     * Marshals the provided data to the xmlFile. A concrete implementation should be provided by
     * the extending class.
     *
     * @param xmlFile Path of the output XML file
     * @throws JAXBException
     * @throws SAXException
     * @throws MalformedURLException
     */
    public abstract void marshal(final String xmlFile) throws JAXBException, SAXException, MalformedURLException;

    /**
     * Marshals the sitemap relevant files.
     * <p>
     * If a sitemap index XML file should be generated sitemapIndex has to be true. For a plain
     * sitemap XML file, containing an url set, sitemapIndex should be false. Otherwise validation of
     * the schema will fail with {@link SAXException}.
     * </p>
     *
     * @param xmlFile      Path of the output XML file
     * @param jaxbElement  Object containing the url set of a sitemap
     * @param sitemapIndex TRUE if an index file should be generated, FALSE otherwise
     * @throws JAXBException
     * @throws SAXException
     * @throws MalformedURLException
     */
    protected File marshal(final String xmlFile, final Object jaxbElement, final boolean sitemapIndex)
            throws JAXBException, SAXException, MalformedURLException {
        SitemapMarshallingUtil.marshal(xmlFile, jaxbElement, sitemapIndex);
        return new File(xmlFile);
    }
}
