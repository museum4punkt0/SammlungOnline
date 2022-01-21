
package de.smbonline.mdssync.jaxb.search.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Thumbnail complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Thumbnail">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.zetcom.com/ria/ws/module}Attachment">
 *       &lt;attribute name="size" type="{http://www.zetcom.com/ria/ws/module}ThumbnailSize" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Thumbnail", namespace = "http://www.zetcom.com/ria/ws/module")
public class Thumbnail
    extends Attachment
{

    @XmlAttribute(name = "size")
    protected ThumbnailSize size;

    /**
     * Gets the value of the size property.
     * 
     * @return
     *     possible object is
     *     {@link ThumbnailSize }
     *     
     */
    public ThumbnailSize getSize() {
        return size;
    }

    /**
     * Sets the value of the size property.
     * 
     * @param value
     *     allowed object is
     *     {@link ThumbnailSize }
     *     
     */
    public void setSize(ThumbnailSize value) {
        this.size = value;
    }

}
