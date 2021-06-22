
package de.smbonline.mdssync.search.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for CompositeItem complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="CompositeItem">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice>
 *         &lt;element name="repeatableGroup" type="{http://www.zetcom.com/ria/ws/module}RepeatableGroup"/>
 *         &lt;element name="repeatableGroupReference" type="{http://www.zetcom.com/ria/ws/module}RepeatableGroupReference"/>
 *         &lt;element name="moduleReference" type="{http://www.zetcom.com/ria/ws/module}ModuleReference"/>
 *       &lt;/choice>
 *       &lt;attribute name="seqNo" type="{http://www.w3.org/2001/XMLSchema}long" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CompositeItem", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "repeatableGroup",
    "repeatableGroupReference",
    "moduleReference"
})
public class CompositeItem {

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected RepeatableGroup repeatableGroup;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected RepeatableGroupReference repeatableGroupReference;
    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected ModuleReference moduleReference;
    @XmlAttribute(name = "seqNo")
    protected Long seqNo;

    /**
     * Gets the value of the repeatableGroup property.
     * 
     * @return
     *     possible object is
     *     {@link RepeatableGroup }
     *     
     */
    public RepeatableGroup getRepeatableGroup() {
        return repeatableGroup;
    }

    /**
     * Sets the value of the repeatableGroup property.
     * 
     * @param value
     *     allowed object is
     *     {@link RepeatableGroup }
     *     
     */
    public void setRepeatableGroup(RepeatableGroup value) {
        this.repeatableGroup = value;
    }

    /**
     * Gets the value of the repeatableGroupReference property.
     * 
     * @return
     *     possible object is
     *     {@link RepeatableGroupReference }
     *     
     */
    public RepeatableGroupReference getRepeatableGroupReference() {
        return repeatableGroupReference;
    }

    /**
     * Sets the value of the repeatableGroupReference property.
     * 
     * @param value
     *     allowed object is
     *     {@link RepeatableGroupReference }
     *     
     */
    public void setRepeatableGroupReference(RepeatableGroupReference value) {
        this.repeatableGroupReference = value;
    }

    /**
     * Gets the value of the moduleReference property.
     * 
     * @return
     *     possible object is
     *     {@link ModuleReference }
     *     
     */
    public ModuleReference getModuleReference() {
        return moduleReference;
    }

    /**
     * Sets the value of the moduleReference property.
     * 
     * @param value
     *     allowed object is
     *     {@link ModuleReference }
     *     
     */
    public void setModuleReference(ModuleReference value) {
        this.moduleReference = value;
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
