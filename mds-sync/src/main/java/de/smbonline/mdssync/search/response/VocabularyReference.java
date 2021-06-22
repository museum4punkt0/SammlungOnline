
package de.smbonline.mdssync.search.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for VocabularyReference complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="VocabularyReference">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="vocabularyReferenceItem" type="{http://www.zetcom.com/ria/ws/module}VocabularyReferenceItem" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" use="required" type="{http://www.zetcom.com/ria/ws/module}Name" />
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}long" />
 *       &lt;attribute name="instanceName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "VocabularyReference", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "vocabularyReferenceItem"
})
public class VocabularyReference {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected VocabularyReferenceItem vocabularyReferenceItem;
    @XmlAttribute(name = "name", required = true)
    protected String name;
    @XmlAttribute(name = "id")
    protected Long id;
    @XmlAttribute(name = "instanceName")
    protected String instanceName;

    /**
     * Gets the value of the vocabularyReferenceItem property.
     * 
     * @return
     *     possible object is
     *     {@link VocabularyReferenceItem }
     *     
     */
    public VocabularyReferenceItem getVocabularyReferenceItem() {
        return vocabularyReferenceItem;
    }

    /**
     * Sets the value of the vocabularyReferenceItem property.
     * 
     * @param value
     *     allowed object is
     *     {@link VocabularyReferenceItem }
     *     
     */
    public void setVocabularyReferenceItem(VocabularyReferenceItem value) {
        this.vocabularyReferenceItem = value;
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
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setId(Long value) {
        this.id = value;
    }

    /**
     * Gets the value of the instanceName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInstanceName() {
        return instanceName;
    }

    /**
     * Sets the value of the instanceName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInstanceName(String value) {
        this.instanceName = value;
    }

}
