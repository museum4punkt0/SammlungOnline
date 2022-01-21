
package de.smbonline.mdssync.jaxb.search.response;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Thumbnails complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Thumbnails">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="thumbnail" type="{http://www.zetcom.com/ria/ws/module}Thumbnail" maxOccurs="unbounded"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Thumbnails", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "thumbnail"
})
public class Thumbnails {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module", required = true)
    protected List<Thumbnail> thumbnail;

    /**
     * Gets the value of the thumbnail property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the thumbnail property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getThumbnail().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Thumbnail }
     * 
     * 
     */
    public List<Thumbnail> getThumbnail() {
        if (thumbnail == null) {
            thumbnail = new ArrayList<Thumbnail>();
        }
        return this.thumbnail;
    }

}
