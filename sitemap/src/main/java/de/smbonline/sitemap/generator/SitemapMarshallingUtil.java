package de.smbonline.sitemap.generator;

import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Utils to marshal or unmarshal sitemaps.
 */
public final class SitemapMarshallingUtil {

    /**
     * Default encoding of the marshal of this class.
     */
    public static final String MARSHAL_ENCODING = "ISO-8859-1";

    /**
     * Location of the sitemap schema.
     */
    public static final String SITEMAP_SCHEMA_LOCATION = "https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd";

    /**
     * Location of the sitemap-index schema.
     */
    public static final String SITEMAP_INDEX_SCHEMA_LOCATION = "https://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd";

    /**
     * Unmarshal a XML file.
     * <p>
     * This method differentiates between a urlset or a sitemapindex. Therefore the specific schema
     * will be used. The decision is based on the sitemapIndex param.
     * </p>
     *
     * @param xmlFile
     * @param clazz
     * @param jaxbContext
     * @param sitemapIndex
     * @param <T>
     * @return
     * @throws JAXBException
     * @throws MalformedURLException
     * @throws SAXException
     */
    public static <T> T unmarshal(
            final String xmlFile,
            final Class<T> clazz,
            final JAXBContext jaxbContext,
            final boolean sitemapIndex) throws JAXBException, MalformedURLException, SAXException {
        Schema schema = sitemapIndex ? getSitemapIndexSchema() : getSitemapSchema();
        return unmarshal(xmlFile, clazz, jaxbContext, schema);
    }

    /**
     * Unmarshal a XML file.
     * <p>
     * This method is independent of the schema or object of sitemaps. Every provided XML file can
     * be unmarshalled providing the context, the schema and class.
     * </p>
     * <p>
     * This method gives the most flexibility in unmarshalling a Jaxb based XML file.
     * </p>
     *
     * @param xmlFile
     * @param clazz
     * @param jaxbContext
     * @param schema
     * @param <T>
     * @return
     * @throws JAXBException
     */
    public static synchronized <T> T unmarshal(
            final String xmlFile,
            final Class<T> clazz,
            final JAXBContext jaxbContext,
            final Schema schema) throws JAXBException {
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        unmarshaller.setSchema(schema);
        return clazz.cast(unmarshaller.unmarshal(new File(xmlFile)));
    }

    /**
     * Marshals an XML file.
     * <p>
     * This method differentiates between a url-set or a sitemap-index.
     * Therefore the specific schema will be used.
     * </p>
     * <p>
     * The context will be instantiated automatically.
     * </p>
     *
     * @param xmlFile
     * @param jaxbElement
     * @param sitemapIndex true for sitemap-index, false for url-set
     * @throws MalformedURLException
     * @throws JAXBException
     * @throws SAXException
     */
    public static synchronized void marshal(
            final String xmlFile,
            final Object jaxbElement,
            final boolean sitemapIndex) throws JAXBException, MalformedURLException, SAXException {
        marshal(xmlFile, jaxbElement, getJaxbContext(jaxbElement), sitemapIndex);
    }

    /**
     * Marshals an XML file.
     * <p>
     * This method differentiates between a url-set or a sitemap-index.
     * Therefore the specific schema will be used.
     * </p>
     *
     * @param xmlFile
     * @param jaxbElement
     * @param jaxbContext
     * @param sitemapIndex
     * @throws JAXBException
     * @throws MalformedURLException
     * @throws SAXException
     */
    public static synchronized void marshal(
            final String xmlFile,
            final Object jaxbElement,
            final JAXBContext jaxbContext,
            final boolean sitemapIndex) throws JAXBException, MalformedURLException, SAXException {
        Schema schema = sitemapIndex ? getSitemapIndexSchema() : getSitemapSchema();
        marshal(xmlFile, jaxbElement, jaxbContext, schema);
    }

    /**
     * Marshals an XML file.
     * <p>
     * This method is independent of the schema or object of sitemaps. Every provided object can be
     * marshaled providing the context and the schema.
     * </p>
     * <p>
     * The encoding will be the default encoding of this class. See
     * {@link SitemapMarshallingUtil#MARSHAL_ENCODING}.
     * </p>
     *
     * @param xmlFile
     * @param jaxbElement
     * @param jaxbContext
     * @param schema
     * @throws JAXBException
     */
    public static synchronized void marshal(
            final String xmlFile,
            final Object jaxbElement,
            final JAXBContext jaxbContext,
            final Schema schema) throws JAXBException {
        marshal(xmlFile, jaxbElement, jaxbContext, schema, MARSHAL_ENCODING);
    }

    /**
     * Marshals an XML file.
     * <p>
     * This method is independent of the schema or object of sitemaps. Every provided object can be
     * marshaled providing the context and the schema.
     * </p>
     * <p>
     * This method gives the most flexibility in marshaling a Jaxb based XML file.
     * </p>
     *
     * @param xmlFile
     * @param jaxbElement
     * @param jaxbContext
     * @param schema
     * @param encoding
     * @throws JAXBException
     */
    public static synchronized void marshal(
            final String xmlFile,
            final Object jaxbElement,
            final JAXBContext jaxbContext,
            final Schema schema,
            final String encoding) throws JAXBException {
        Marshaller marshaller = jaxbContext.createMarshaller();
        marshaller.setSchema(schema);
        marshaller.setProperty(Marshaller.JAXB_ENCODING, encoding);
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        marshaller.marshal(jaxbElement, new File(xmlFile));
    }

    /**
     * Creates a new schema for a urlset of a sitemap.
     *
     * @return
     * @throws MalformedURLException
     * @throws SAXException
     */
    public static Schema getSitemapSchema() throws MalformedURLException, SAXException {
        SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
        schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
        return schemaFactory.newSchema(new URL(SITEMAP_SCHEMA_LOCATION));
    }

    /**
     * Creates a new schema for a sitemapindex.
     *
     * @return
     * @throws MalformedURLException
     * @throws SAXException
     */
    public static Schema getSitemapIndexSchema() throws MalformedURLException, SAXException {
        SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
        schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
        return schemaFactory.newSchema(new URL(SITEMAP_INDEX_SCHEMA_LOCATION));
    }

    /**
     * Creates a new instance of a JaxbContext of the given object.
     *
     * @param jaxbElement
     * @return
     * @throws JAXBException
     */
    public static JAXBContext getJaxbContext(final Object jaxbElement) throws JAXBException {
        return getJaxbContext(jaxbElement.getClass());
    }

    /**
     * Creates a new instance of a JaxbContext of the given class.
     *
     * @param jaxbElement
     * @return
     * @throws JAXBException
     */
    public static JAXBContext getJaxbContext(final Class<?> jaxbElement) throws JAXBException {
        return JAXBContext.newInstance(jaxbElement);
    }

    private SitemapMarshallingUtil() {
        // no instances
    }
}
