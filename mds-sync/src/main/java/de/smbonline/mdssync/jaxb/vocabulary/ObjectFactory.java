//
// Diese Datei wurde mit der JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 generiert 
// Siehe <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Änderungen an dieser Datei gehen bei einer Neukompilierung des Quellschemas verloren. 
// Generiert: 2022.05.19 um 04:10:43 PM CEST 
//


package de.smbonline.mdssync.jaxb.vocabulary;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the de.smbonline.mdssync.jaxb.vocabulary package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _Node_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "node");
    private final static QName _TermClasses_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "termClasses");
    private final static QName _Term_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "term");
    private final static QName _Parents_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "parents");
    private final static QName _Relations_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "relations");
    private final static QName _Instance_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "instance");
    private final static QName _NodeClass_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "nodeClass");
    private final static QName _Parent_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "parent");
    private final static QName _Collection_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "collection");
    private final static QName _Label_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "label");
    private final static QName _TermClass_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "termClass");
    private final static QName _Relation_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "relation");
    private final static QName _Labels_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "labels");
    private final static QName _NodeClasses_QNAME = new QName("http://www.zetcom.com/ria/ws/vocabulary", "nodeClasses");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: de.smbonline.mdssync.jaxb.vocabulary
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link ParentNodeReferenceItem }
     * 
     */
    public ParentNodeReferenceItem createParentNodeReferenceItem() {
        return new ParentNodeReferenceItem();
    }

    /**
     * Create an instance of {@link Instance }
     * 
     */
    public Instance createInstance() {
        return new Instance();
    }

    /**
     * Create an instance of {@link NodeClass }
     * 
     */
    public NodeClass createNodeClass() {
        return new NodeClass();
    }

    /**
     * Create an instance of {@link Collection }
     * 
     */
    public Collection createCollection() {
        return new Collection();
    }

    /**
     * Create an instance of {@link Label }
     * 
     */
    public Label createLabel() {
        return new Label();
    }

    /**
     * Create an instance of {@link NodeClasses }
     * 
     */
    public NodeClasses createNodeClasses() {
        return new NodeClasses();
    }

    /**
     * Create an instance of {@link TermClass }
     * 
     */
    public TermClass createTermClass() {
        return new TermClass();
    }

    /**
     * Create an instance of {@link NodeRelation }
     * 
     */
    public NodeRelation createNodeRelation() {
        return new NodeRelation();
    }

    /**
     * Create an instance of {@link Labels }
     * 
     */
    public Labels createLabels() {
        return new Labels();
    }

    /**
     * Create an instance of {@link Node }
     * 
     */
    public Node createNode() {
        return new Node();
    }

    /**
     * Create an instance of {@link TermClasses }
     * 
     */
    public TermClasses createTermClasses() {
        return new TermClasses();
    }

    /**
     * Create an instance of {@link Term }
     * 
     */
    public Term createTerm() {
        return new Term();
    }

    /**
     * Create an instance of {@link NodeRelations }
     * 
     */
    public NodeRelations createNodeRelations() {
        return new NodeRelations();
    }

    /**
     * Create an instance of {@link ParentNodeReference }
     * 
     */
    public ParentNodeReference createParentNodeReference() {
        return new ParentNodeReference();
    }

    /**
     * Create an instance of {@link OrgUnit }
     * 
     */
    public OrgUnit createOrgUnit() {
        return new OrgUnit();
    }

    /**
     * Create an instance of {@link Status }
     * 
     */
    public Status createStatus() {
        return new Status();
    }

    /**
     * Create an instance of {@link InstanceSource }
     * 
     */
    public InstanceSource createInstanceSource() {
        return new InstanceSource();
    }

    /**
     * Create an instance of {@link Terms }
     * 
     */
    public Terms createTerms() {
        return new Terms();
    }

    /**
     * Create an instance of {@link VocabularyBaseType }
     * 
     */
    public VocabularyBaseType createVocabularyBaseType() {
        return new VocabularyBaseType();
    }

    /**
     * Create an instance of {@link TermCategory }
     * 
     */
    public TermCategory createTermCategory() {
        return new TermCategory();
    }

    /**
     * Create an instance of {@link NodeType }
     * 
     */
    public NodeType createNodeType() {
        return new NodeType();
    }

    /**
     * Create an instance of {@link InstanceType }
     * 
     */
    public InstanceType createInstanceType() {
        return new InstanceType();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Node }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "node")
    public JAXBElement<Node> createNode(Node value) {
        return new JAXBElement<Node>(_Node_QNAME, Node.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link TermClasses }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "termClasses")
    public JAXBElement<TermClasses> createTermClasses(TermClasses value) {
        return new JAXBElement<TermClasses>(_TermClasses_QNAME, TermClasses.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Term }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "term")
    public JAXBElement<Term> createTerm(Term value) {
        return new JAXBElement<Term>(_Term_QNAME, Term.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ParentNodeReference }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "parents")
    public JAXBElement<ParentNodeReference> createParents(ParentNodeReference value) {
        return new JAXBElement<ParentNodeReference>(_Parents_QNAME, ParentNodeReference.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link NodeRelations }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "relations")
    public JAXBElement<NodeRelations> createRelations(NodeRelations value) {
        return new JAXBElement<NodeRelations>(_Relations_QNAME, NodeRelations.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Instance }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "instance")
    public JAXBElement<Instance> createInstance(Instance value) {
        return new JAXBElement<Instance>(_Instance_QNAME, Instance.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link NodeClass }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "nodeClass")
    public JAXBElement<NodeClass> createNodeClass(NodeClass value) {
        return new JAXBElement<NodeClass>(_NodeClass_QNAME, NodeClass.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ParentNodeReferenceItem }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "parent")
    public JAXBElement<ParentNodeReferenceItem> createParent(ParentNodeReferenceItem value) {
        return new JAXBElement<ParentNodeReferenceItem>(_Parent_QNAME, ParentNodeReferenceItem.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Collection }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "collection")
    public JAXBElement<Collection> createCollection(Collection value) {
        return new JAXBElement<Collection>(_Collection_QNAME, Collection.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Label }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "label")
    public JAXBElement<Label> createLabel(Label value) {
        return new JAXBElement<Label>(_Label_QNAME, Label.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link TermClass }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "termClass")
    public JAXBElement<TermClass> createTermClass(TermClass value) {
        return new JAXBElement<TermClass>(_TermClass_QNAME, TermClass.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link NodeRelation }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "relation")
    public JAXBElement<NodeRelation> createRelation(NodeRelation value) {
        return new JAXBElement<NodeRelation>(_Relation_QNAME, NodeRelation.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Labels }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "labels")
    public JAXBElement<Labels> createLabels(Labels value) {
        return new JAXBElement<Labels>(_Labels_QNAME, Labels.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link NodeClasses }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/vocabulary", name = "nodeClasses")
    public JAXBElement<NodeClasses> createNodeClasses(NodeClasses value) {
        return new JAXBElement<NodeClasses>(_NodeClasses_QNAME, NodeClasses.class, null, value);
    }

}
