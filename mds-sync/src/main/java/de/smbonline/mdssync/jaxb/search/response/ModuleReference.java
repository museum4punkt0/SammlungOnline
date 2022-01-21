
package de.smbonline.mdssync.jaxb.search.response;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ModuleReference complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ModuleReference">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="moduleReferenceItem" type="{http://www.zetcom.com/ria/ws/module}ModuleReferenceItem" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" use="required" type="{http://www.zetcom.com/ria/ws/module}Name" />
 *       &lt;attribute name="targetModule" type="{http://www.zetcom.com/ria/ws/module}Name" />
 *       &lt;attribute name="multiplicity" type="{http://www.zetcom.com/ria/ws/module}ReferenceMultiplicity" />
 *       &lt;attribute name="size" type="{http://www.w3.org/2001/XMLSchema}long" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ModuleReference", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "moduleReferenceItem"
})
public class ModuleReference {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<ModuleReferenceItem> moduleReferenceItem;
    @XmlAttribute(name = "name", required = true)
    protected String name;
    @XmlAttribute(name = "targetModule")
    protected String targetModule;
    @XmlAttribute(name = "multiplicity")
    protected String multiplicity;
    @XmlAttribute(name = "size")
    protected Long size;

    /**
     * Gets the value of the moduleReferenceItem property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the moduleReferenceItem property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getModuleReferenceItem().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ModuleReferenceItem }
     * 
     * 
     */
    public List<ModuleReferenceItem> getModuleReferenceItem() {
        if (moduleReferenceItem == null) {
            moduleReferenceItem = new ArrayList<ModuleReferenceItem>();
        }
        return this.moduleReferenceItem;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the targetModule property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTargetModule() {
        return targetModule;
    }

    /**
     * Sets the value of the targetModule property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTargetModule(String value) {
        this.targetModule = value;
    }

    /**
     * Gets the value of the multiplicity property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMultiplicity() {
        return multiplicity;
    }

    /**
     * Sets the value of the multiplicity property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMultiplicity(String value) {
        this.multiplicity = value;
    }

    /**
     * Gets the value of the size property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getSize() {
        return size;
    }

    /**
     * Sets the value of the size property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setSize(Long value) {
        this.size = value;
    }

}
