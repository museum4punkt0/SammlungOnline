
package de.smbonline.mdssync.jaxb.search.response;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ModuleItem complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ModuleItem">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="validationResult" type="{http://www.zetcom.com/ria/ws/module}ValidationResult" minOccurs="0"/>
 *         &lt;element name="formattedValue" type="{http://www.zetcom.com/ria/ws/module}FormattedValue" minOccurs="0"/>
 *         &lt;element name="systemField" type="{http://www.zetcom.com/ria/ws/module}SystemField" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="dataField" type="{http://www.zetcom.com/ria/ws/module}DataField" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="vocabularyReference" type="{http://www.zetcom.com/ria/ws/module}VocabularyReference" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="virtualField" type="{http://www.zetcom.com/ria/ws/module}VirtualField" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="repeatableGroup" type="{http://www.zetcom.com/ria/ws/module}RepeatableGroup" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="repeatableGroupReference" type="{http://www.zetcom.com/ria/ws/module}RepeatableGroupReference" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="moduleReference" type="{http://www.zetcom.com/ria/ws/module}ModuleReference" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="composite" type="{http://www.zetcom.com/ria/ws/module}Composite" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="attachment" type="{http://www.zetcom.com/ria/ws/module}Attachment" minOccurs="0"/>
 *         &lt;element name="thumbnails" type="{http://www.zetcom.com/ria/ws/module}Thumbnails" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}long" />
 *       &lt;attribute name="uuid" type="{http://www.zetcom.com/ria/ws/module}Uuid" />
 *       &lt;attribute name="hasAttachments" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ModuleItem", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "validationResult",
    "formattedValue",
    "systemField",
    "dataField",
    "vocabularyReference",
    "virtualField",
    "repeatableGroup",
    "repeatableGroupReference",
    "moduleReference",
    "composite",
    "attachment",
    "thumbnails"
})
public class ModuleItem {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected ValidationResult validationResult;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected FormattedValue formattedValue;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<SystemField> systemField;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<DataField> dataField;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<VocabularyReference> vocabularyReference;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<VirtualField> virtualField;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<RepeatableGroup> repeatableGroup;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<RepeatableGroupReference> repeatableGroupReference;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<ModuleReference> moduleReference;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<Composite> composite;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected Attachment attachment;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected Thumbnails thumbnails;
    @XmlAttribute(name = "id")
    protected Long id;
    @XmlAttribute(name = "uuid")
    protected String uuid;
    @XmlAttribute(name = "hasAttachments")
    protected Boolean hasAttachments;

    /**
     * Gets the value of the validationResult property.
     * 
     * @return
     *     possible object is
     *     {@link ValidationResult }
     *     
     */
    public ValidationResult getValidationResult() {
        return validationResult;
    }

    /**
     * Sets the value of the validationResult property.
     * 
     * @param value
     *     allowed object is
     *     {@link ValidationResult }
     *     
     */
    public void setValidationResult(ValidationResult value) {
        this.validationResult = value;
    }

    /**
     * Gets the value of the formattedValue property.
     * 
     * @return
     *     possible object is
     *     {@link FormattedValue }
     *     
     */
    public FormattedValue getFormattedValue() {
        return formattedValue;
    }

    /**
     * Sets the value of the formattedValue property.
     * 
     * @param value
     *     allowed object is
     *     {@link FormattedValue }
     *     
     */
    public void setFormattedValue(FormattedValue value) {
        this.formattedValue = value;
    }

    /**
     * Gets the value of the systemField property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the systemField property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSystemField().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link SystemField }
     * 
     * 
     */
    public List<SystemField> getSystemField() {
        if (systemField == null) {
            systemField = new ArrayList<SystemField>();
        }
        return this.systemField;
    }

    /**
     * Gets the value of the dataField property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the dataField property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDataField().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DataField }
     * 
     * 
     */
    public List<DataField> getDataField() {
        if (dataField == null) {
            dataField = new ArrayList<DataField>();
        }
        return this.dataField;
    }

    /**
     * Gets the value of the vocabularyReference property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the vocabularyReference property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getVocabularyReference().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link VocabularyReference }
     * 
     * 
     */
    public List<VocabularyReference> getVocabularyReference() {
        if (vocabularyReference == null) {
            vocabularyReference = new ArrayList<VocabularyReference>();
        }
        return this.vocabularyReference;
    }

    /**
     * Gets the value of the virtualField property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the virtualField property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getVirtualField().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link VirtualField }
     * 
     * 
     */
    public List<VirtualField> getVirtualField() {
        if (virtualField == null) {
            virtualField = new ArrayList<VirtualField>();
        }
        return this.virtualField;
    }

    /**
     * Gets the value of the repeatableGroup property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the repeatableGroup property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRepeatableGroup().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RepeatableGroup }
     * 
     * 
     */
    public List<RepeatableGroup> getRepeatableGroup() {
        if (repeatableGroup == null) {
            repeatableGroup = new ArrayList<RepeatableGroup>();
        }
        return this.repeatableGroup;
    }

    /**
     * Gets the value of the repeatableGroupReference property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the repeatableGroupReference property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRepeatableGroupReference().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RepeatableGroupReference }
     * 
     * 
     */
    public List<RepeatableGroupReference> getRepeatableGroupReference() {
        if (repeatableGroupReference == null) {
            repeatableGroupReference = new ArrayList<RepeatableGroupReference>();
        }
        return this.repeatableGroupReference;
    }

    /**
     * Gets the value of the moduleReference property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the moduleReference property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getModuleReference().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ModuleReference }
     * 
     * 
     */
    public List<ModuleReference> getModuleReference() {
        if (moduleReference == null) {
            moduleReference = new ArrayList<ModuleReference>();
        }
        return this.moduleReference;
    }

    /**
     * Gets the value of the composite property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the composite property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getComposite().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Composite }
     * 
     * 
     */
    public List<Composite> getComposite() {
        if (composite == null) {
            composite = new ArrayList<Composite>();
        }
        return this.composite;
    }

    /**
     * Gets the value of the attachment property.
     * 
     * @return
     *     possible object is
     *     {@link Attachment }
     *     
     */
    public Attachment getAttachment() {
        return attachment;
    }

    /**
     * Sets the value of the attachment property.
     * 
     * @param value
     *     allowed object is
     *     {@link Attachment }
     *     
     */
    public void setAttachment(Attachment value) {
        this.attachment = value;
    }

    /**
     * Gets the value of the thumbnails property.
     * 
     * @return
     *     possible object is
     *     {@link Thumbnails }
     *     
     */
    public Thumbnails getThumbnails() {
        return thumbnails;
    }

    /**
     * Sets the value of the thumbnails property.
     * 
     * @param value
     *     allowed object is
     *     {@link Thumbnails }
     *     
     */
    public void setThumbnails(Thumbnails value) {
        this.thumbnails = value;
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
     * Gets the value of the uuid property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUuid() {
        return uuid;
    }

    /**
     * Sets the value of the uuid property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUuid(String value) {
        this.uuid = value;
    }

    /**
     * Gets the value of the hasAttachments property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public boolean isHasAttachments() {
        if (hasAttachments == null) {
            return false;
        } else {
            return hasAttachments;
        }
    }

    /**
     * Sets the value of the hasAttachments property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setHasAttachments(Boolean value) {
        this.hasAttachments = value;
    }

}
