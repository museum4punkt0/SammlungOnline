
package de.smbonline.mdssync.search.response;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RepeatableGroupItem complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RepeatableGroupItem">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="formattedValue" type="{http://www.zetcom.com/ria/ws/module}FormattedValue" minOccurs="0"/>
 *         &lt;element name="dataField" type="{http://www.zetcom.com/ria/ws/module}DataField" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="virtualField" type="{http://www.zetcom.com/ria/ws/module}VirtualField" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="vocabularyReference" type="{http://www.zetcom.com/ria/ws/module}VocabularyReference" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="repeatableGroupReference" type="{http://www.zetcom.com/ria/ws/module}RepeatableGroupReference" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="moduleReference" type="{http://www.zetcom.com/ria/ws/module}ModuleReference" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}long" />
 *       &lt;attribute name="uuid" type="{http://www.zetcom.com/ria/ws/module}Uuid" />
 *       &lt;attribute name="seqNo" type="{http://www.w3.org/2001/XMLSchema}long" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RepeatableGroupItem", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "formattedValue",
    "dataField",
    "virtualField",
    "vocabularyReference",
    "repeatableGroupReference",
    "moduleReference"
})
public class RepeatableGroupItem {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected FormattedValue formattedValue;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<DataField> dataField;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<VirtualField> virtualField;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<VocabularyReference> vocabularyReference;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<RepeatableGroupReference> repeatableGroupReference;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected List<ModuleReference> moduleReference;
    @XmlAttribute(name = "id")
    protected Long id;
    @XmlAttribute(name = "uuid")
    protected String uuid;
    @XmlAttribute(name = "seqNo")
    protected Long seqNo;

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
     * Gets the value of the seqNo property.
     * 
     * @return
     *     possible object is
     *     {@link Long }
     *     
     */
    public Long getSeqNo() {
        return seqNo;
    }

    /**
     * Sets the value of the seqNo property.
     * 
     * @param value
     *     allowed object is
     *     {@link Long }
     *     
     */
    public void setSeqNo(Long value) {
        this.seqNo = value;
    }

}
