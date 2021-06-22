
package de.smbonline.mdssync.search.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DataField complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="DataField">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.zetcom.com/ria/ws/module}Field">
 *       &lt;sequence>
 *         &lt;element name="formattedValue" type="{http://www.zetcom.com/ria/ws/module}FormattedValue" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="dataType" type="{http://www.zetcom.com/ria/ws/module}DataType" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "DataField", namespace = "http://www.zetcom.com/ria/ws/module", propOrder = {
    "formattedValue"
})
@XmlSeeAlso({
    SystemField.class
})
public class DataField
    extends Field
{

    @XmlElement(namespace = "http://www.zetcom.com/ria/ws/module")
    protected FormattedValue formattedValue;
    @XmlAttribute(name = "dataType")
    protected DataType dataType;

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
     * Gets the value of the dataType property.
     * 
     * @return
     *     possible object is
     *     {@link DataType }
     *     
     */
    public DataType getDataType() {
        return dataType;
    }

    /**
     * Sets the value of the dataType property.
     * 
     * @param value
     *     allowed object is
     *     {@link DataType }
     *     
     */
    public void setDataType(DataType value) {
        this.dataType = value;
    }

}
