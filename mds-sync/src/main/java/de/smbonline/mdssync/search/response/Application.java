
package de.smbonline.mdssync.search.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for Application complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="Application">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="modules" type="{http://www.zetcom.com/ria/ws/module}Modules" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Application", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "modules"
})
public class Application {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected Modules modules;

    /**
     * Gets the value of the modules property.
     * 
     * @return
     *     possible object is
     *     {@link Modules }
     *     
     */
    public Modules getModules() {
        return modules;
    }

    /**
     * Sets the value of the modules property.
     * 
     * @param value
     *     allowed object is
     *     {@link Modules }
     *     
     */
    public void setModules(Modules value) {
        this.modules = value;
    }

}
