
package de.smbonline.mdssync.jaxb.search.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ValidationMessage complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ValidationMessage">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;all>
 *         &lt;element name="value" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/all>
 *       &lt;attribute name="fieldPath" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="key" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="moduleItemId" type="{http://www.w3.org/2001/XMLSchema}long" />
 *       &lt;attribute name="repeatableGroupItemId" type="{http://www.w3.org/2001/XMLSchema}long" />
 *       &lt;attribute name="moduleReferenceItemId" type="{http://www.w3.org/2001/XMLSchema}long" />
 *       &lt;attribute name="vocabularyReferenceItemId" type="{http://www.w3.org/2001/XMLSchema}long" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ValidationMessage", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {

})
public class ValidationMessage {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module", required = true)
    protected String value;
    @XmlAttribute(name = "fieldPath")
    protected String fieldPath;
    @XmlAttribute(name = "key")
    protected String key;
    @XmlAttribute(name = "moduleItemId")
    protected Long moduleItemId;
    @XmlAttribute(name = "repeatableGroupItemId")
    protected Long repeatableGroupItemId;
    @XmlAttribute(name = "moduleReferenceItemId")
    protected Long moduleReferenceItemId;
    @XmlAttribute(name = "vocabularyReferenceItemId")
    protected Long vocabularyReferenceItemId;

    /**
     * Gets the value of the value property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value of the value property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * Gets the value of the fieldPath property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFieldPath() {
        return fieldPath;
    }

    /**
     * Sets the value of the fieldPath property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFieldPath(String value) {
        this.fieldPath = value;
    }

    /**
     * Gets the value of the key property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getKey() {
        return key;
    }

    /**
     * Sets the value of the key property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setKey(String value) {
        this.key = value;
    }

    /**
     * Gets the value of the moduleItemId property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getModuleItemId() {
        return moduleItemId;
    }

    /**
     * Sets the value of the moduleItemId property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setModuleItemId(Long value) {
        this.moduleItemId = value;
    }

    /**
     * Gets the value of the repeatableGroupItemId property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getRepeatableGroupItemId() {
        return repeatableGroupItemId;
    }

    /**
     * Sets the value of the repeatableGroupItemId property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setRepeatableGroupItemId(Long value) {
        this.repeatableGroupItemId = value;
    }

    /**
     * Gets the value of the moduleReferenceItemId property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getModuleReferenceItemId() {
        return moduleReferenceItemId;
    }

    /**
     * Sets the value of the moduleReferenceItemId property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setModuleReferenceItemId(Long value) {
        this.moduleReferenceItemId = value;
    }

    /**
     * Gets the value of the vocabularyReferenceItemId property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getVocabularyReferenceItemId() {
        return vocabularyReferenceItemId;
    }

    /**
     * Sets the value of the vocabularyReferenceItemId property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setVocabularyReferenceItemId(Long value) {
        this.vocabularyReferenceItemId = value;
    }

}
