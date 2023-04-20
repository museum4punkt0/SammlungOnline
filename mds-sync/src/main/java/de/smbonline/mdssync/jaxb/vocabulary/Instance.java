//
// Diese Datei wurde mit der JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 generiert 
// Siehe <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Änderungen an dieser Datei gehen bei einer Neukompilierung des Quellschemas verloren. 
// Generiert: 2022.05.19 um 04:10:43 PM CEST 
//


package de.smbonline.mdssync.jaxb.vocabulary;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java-Klasse für Instance complex type.
 * 
 * <p>Das folgende Schemafragment gibt den erwarteten Content an, der in dieser Klasse enthalten ist.
 * 
 * <pre>
 * &lt;complexType name="Instance">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.zetcom.com/ria/ws/vocabulary}VocabularyBaseType">
 *       &lt;sequence>
 *         &lt;element name="orgUnit" type="{http://www.zetcom.com/ria/ws/vocabulary}OrgUnit" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.zetcom.com/ria/ws/vocabulary}InstanceType" minOccurs="0"/>
 *         &lt;element name="versionInfo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="comment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="instanceSource" type="{http://www.zetcom.com/ria/ws/vocabulary}InstanceSource" minOccurs="0"/>
 *         &lt;element name="nodeClasses" type="{http://www.zetcom.com/ria/ws/vocabulary}NodeClasses" minOccurs="0"/>
 *         &lt;element name="termClasses" type="{http://www.zetcom.com/ria/ws/vocabulary}TermClasses" minOccurs="0"/>
 *         &lt;element name="labels" type="{http://www.zetcom.com/ria/ws/vocabulary}Labels" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="logicalName" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Instance", propOrder = {
    "orgUnit",
    "type",
    "versionInfo",
    "comment",
    "instanceSource",
    "nodeClasses",
    "termClasses",
    "labels"
})
public class Instance
    extends VocabularyBaseType
{

    protected OrgUnit orgUnit;
    protected InstanceType type;
    protected String versionInfo;
    protected String comment;
    protected InstanceSource instanceSource;
    protected NodeClasses nodeClasses;
    protected TermClasses termClasses;
    protected Labels labels;
    @XmlAttribute(name = "logicalName")
    protected String logicalName;

    /**
     * Ruft den Wert der orgUnit-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link OrgUnit }
     *     
     */
    public OrgUnit getOrgUnit() {
        return orgUnit;
    }

    /**
     * Legt den Wert der orgUnit-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link OrgUnit }
     *     
     */
    public void setOrgUnit(OrgUnit value) {
        this.orgUnit = value;
    }

    /**
     * Ruft den Wert der type-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link InstanceType }
     *     
     */
    public InstanceType getType() {
        return type;
    }

    /**
     * Legt den Wert der type-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link InstanceType }
     *     
     */
    public void setType(InstanceType value) {
        this.type = value;
    }

    /**
     * Ruft den Wert der versionInfo-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getVersionInfo() {
        return versionInfo;
    }

    /**
     * Legt den Wert der versionInfo-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setVersionInfo(String value) {
        this.versionInfo = value;
    }

    /**
     * Ruft den Wert der comment-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getComment() {
        return comment;
    }

    /**
     * Legt den Wert der comment-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setComment(String value) {
        this.comment = value;
    }

    /**
     * Ruft den Wert der instanceSource-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link InstanceSource }
     *     
     */
    public InstanceSource getInstanceSource() {
        return instanceSource;
    }

    /**
     * Legt den Wert der instanceSource-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link InstanceSource }
     *     
     */
    public void setInstanceSource(InstanceSource value) {
        this.instanceSource = value;
    }

    /**
     * Ruft den Wert der nodeClasses-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link NodeClasses }
     *     
     */
    public NodeClasses getNodeClasses() {
        return nodeClasses;
    }

    /**
     * Legt den Wert der nodeClasses-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link NodeClasses }
     *     
     */
    public void setNodeClasses(NodeClasses value) {
        this.nodeClasses = value;
    }

    /**
     * Ruft den Wert der termClasses-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link TermClasses }
     *     
     */
    public TermClasses getTermClasses() {
        return termClasses;
    }

    /**
     * Legt den Wert der termClasses-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link TermClasses }
     *     
     */
    public void setTermClasses(TermClasses value) {
        this.termClasses = value;
    }

    /**
     * Ruft den Wert der labels-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link Labels }
     *     
     */
    public Labels getLabels() {
        return labels;
    }

    /**
     * Legt den Wert der labels-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link Labels }
     *     
     */
    public void setLabels(Labels value) {
        this.labels = value;
    }

    /**
     * Ruft den Wert der logicalName-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLogicalName() {
        return logicalName;
    }

    /**
     * Legt den Wert der logicalName-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLogicalName(String value) {
        this.logicalName = value;
    }

}
