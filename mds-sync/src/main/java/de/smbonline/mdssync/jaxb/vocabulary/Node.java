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
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;


/**
 * <p>Java-Klasse für Node complex type.
 * 
 * <p>Das folgende Schemafragment gibt den erwarteten Content an, der in dieser Klasse enthalten ist.
 * 
 * <pre>
 * &lt;complexType name="Node">
 *   &lt;complexContent>
 *     &lt;extension base="{http://www.zetcom.com/ria/ws/vocabulary}VocabularyBaseType">
 *       &lt;sequence>
 *         &lt;element name="lastHierarchyChange" type="{http://www.w3.org/2001/XMLSchema}dateTime" minOccurs="0"/>
 *         &lt;element name="sortCriteria" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="orgUnit" type="{http://www.zetcom.com/ria/ws/vocabulary}OrgUnit" minOccurs="0"/>
 *         &lt;element name="status" type="{http://www.zetcom.com/ria/ws/vocabulary}Status" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.zetcom.com/ria/ws/vocabulary}NodeType" minOccurs="0"/>
 *         &lt;element name="parents" type="{http://www.zetcom.com/ria/ws/vocabulary}ParentNodeReference" minOccurs="0"/>
 *         &lt;element ref="{http://www.zetcom.com/ria/ws/vocabulary}instance" minOccurs="0"/>
 *         &lt;element name="terms" type="{http://www.zetcom.com/ria/ws/vocabulary}Terms" minOccurs="0"/>
 *         &lt;element name="comment" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="relations" type="{http://www.zetcom.com/ria/ws/vocabulary}NodeRelations" minOccurs="0"/>
 *         &lt;element name="nodeClass" type="{http://www.zetcom.com/ria/ws/vocabulary}NodeClass" minOccurs="0"/>
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
@XmlType(name = "Node", propOrder = {
    "lastHierarchyChange",
    "sortCriteria",
    "orgUnit",
    "status",
    "type",
    "parents",
    "instance",
    "terms",
    "comment",
    "relations",
    "nodeClass"
})
public class Node
    extends VocabularyBaseType
{

    @XmlSchemaType(name = "dateTime")
    protected XMLGregorianCalendar lastHierarchyChange;
    protected String sortCriteria;
    protected OrgUnit orgUnit;
    protected Status status;
    protected NodeType type;
    protected ParentNodeReference parents;
    protected Instance instance;
    protected Terms terms;
    protected String comment;
    protected NodeRelations relations;
    protected NodeClass nodeClass;
    @XmlAttribute(name = "logicalName")
    protected String logicalName;

    /**
     * Ruft den Wert der lastHierarchyChange-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getLastHierarchyChange() {
        return lastHierarchyChange;
    }

    /**
     * Legt den Wert der lastHierarchyChange-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setLastHierarchyChange(XMLGregorianCalendar value) {
        this.lastHierarchyChange = value;
    }

    /**
     * Ruft den Wert der sortCriteria-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSortCriteria() {
        return sortCriteria;
    }

    /**
     * Legt den Wert der sortCriteria-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSortCriteria(String value) {
        this.sortCriteria = value;
    }

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
     * Ruft den Wert der status-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link Status }
     *     
     */
    public Status getStatus() {
        return status;
    }

    /**
     * Legt den Wert der status-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link Status }
     *     
     */
    public void setStatus(Status value) {
        this.status = value;
    }

    /**
     * Ruft den Wert der type-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link NodeType }
     *     
     */
    public NodeType getType() {
        return type;
    }

    /**
     * Legt den Wert der type-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link NodeType }
     *     
     */
    public void setType(NodeType value) {
        this.type = value;
    }

    /**
     * Ruft den Wert der parents-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link ParentNodeReference }
     *     
     */
    public ParentNodeReference getParents() {
        return parents;
    }

    /**
     * Legt den Wert der parents-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link ParentNodeReference }
     *     
     */
    public void setParents(ParentNodeReference value) {
        this.parents = value;
    }

    /**
     * Ruft den Wert der instance-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link Instance }
     *     
     */
    public Instance getInstance() {
        return instance;
    }

    /**
     * Legt den Wert der instance-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link Instance }
     *     
     */
    public void setInstance(Instance value) {
        this.instance = value;
    }

    /**
     * Ruft den Wert der terms-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link Terms }
     *     
     */
    public Terms getTerms() {
        return terms;
    }

    /**
     * Legt den Wert der terms-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link Terms }
     *     
     */
    public void setTerms(Terms value) {
        this.terms = value;
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
     * Ruft den Wert der relations-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link NodeRelations }
     *     
     */
    public NodeRelations getRelations() {
        return relations;
    }

    /**
     * Legt den Wert der relations-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link NodeRelations }
     *     
     */
    public void setRelations(NodeRelations value) {
        this.relations = value;
    }

    /**
     * Ruft den Wert der nodeClass-Eigenschaft ab.
     * 
     * @return
     *     possible object is
     *     {@link NodeClass }
     *     
     */
    public NodeClass getNodeClass() {
        return nodeClass;
    }

    /**
     * Legt den Wert der nodeClass-Eigenschaft fest.
     * 
     * @param value
     *     allowed object is
     *     {@link NodeClass }
     *     
     */
    public void setNodeClass(NodeClass value) {
        this.nodeClass = value;
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
