
package de.smbonline.mdssync.jaxb.search.response;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the de.smbonline.mdssync.jaxb.search.response package.
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

    private final static QName _Application_QNAME = new QName("http://www.zetcom.com/ria/ws/module", "application");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: de.smbonline.mdssync.jaxb.search.response
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link VirtualField }
     * 
     */
    public VirtualField createVirtualField() {
        return new VirtualField();
    }

    /**
     * Create an instance of {@link Thumbnail }
     * 
     */
    public Thumbnail createThumbnail() {
        return new Thumbnail();
    }

    /**
     * Create an instance of {@link DataField }
     * 
     */
    public DataField createDataField() {
        return new DataField();
    }

    /**
     * Create an instance of {@link Thumbnails }
     * 
     */
    public Thumbnails createThumbnails() {
        return new Thumbnails();
    }

    /**
     * Create an instance of {@link RepeatableGroup }
     * 
     */
    public RepeatableGroup createRepeatableGroup() {
        return new RepeatableGroup();
    }

    /**
     * Create an instance of {@link VocabularyReference }
     * 
     */
    public VocabularyReference createVocabularyReference() {
        return new VocabularyReference();
    }

    /**
     * Create an instance of {@link SystemField }
     * 
     */
    public SystemField createSystemField() {
        return new SystemField();
    }

    /**
     * Create an instance of {@link ModuleReferenceItem }
     * 
     */
    public ModuleReferenceItem createModuleReferenceItem() {
        return new ModuleReferenceItem();
    }

    /**
     * Create an instance of {@link RepeatableGroupItem }
     * 
     */
    public RepeatableGroupItem createRepeatableGroupItem() {
        return new RepeatableGroupItem();
    }

    /**
     * Create an instance of {@link RepeatableGroupReferenceItem }
     * 
     */
    public RepeatableGroupReferenceItem createRepeatableGroupReferenceItem() {
        return new RepeatableGroupReferenceItem();
    }

    /**
     * Create an instance of {@link Module }
     * 
     */
    public Module createModule() {
        return new Module();
    }

    /**
     * Create an instance of {@link ModuleReference }
     * 
     */
    public ModuleReference createModuleReference() {
        return new ModuleReference();
    }

    /**
     * Create an instance of {@link Application }
     * 
     */
    public Application createApplication() {
        return new Application();
    }

    /**
     * Create an instance of {@link Composite }
     * 
     */
    public Composite createComposite() {
        return new Composite();
    }

    /**
     * Create an instance of {@link Attachment }
     * 
     */
    public Attachment createAttachment() {
        return new Attachment();
    }

    /**
     * Create an instance of {@link RepeatableGroupReference }
     * 
     */
    public RepeatableGroupReference createRepeatableGroupReference() {
        return new RepeatableGroupReference();
    }

    /**
     * Create an instance of {@link CompositeItem }
     * 
     */
    public CompositeItem createCompositeItem() {
        return new CompositeItem();
    }

    /**
     * Create an instance of {@link ValidationResult }
     * 
     */
    public ValidationResult createValidationResult() {
        return new ValidationResult();
    }

    /**
     * Create an instance of {@link ValidationMessage }
     * 
     */
    public ValidationMessage createValidationMessage() {
        return new ValidationMessage();
    }

    /**
     * Create an instance of {@link SelectField }
     * 
     */
    public SelectField createSelectField() {
        return new SelectField();
    }

    /**
     * Create an instance of {@link Modules }
     * 
     */
    public Modules createModules() {
        return new Modules();
    }

    /**
     * Create an instance of {@link FormattedValue }
     * 
     */
    public FormattedValue createFormattedValue() {
        return new FormattedValue();
    }

    /**
     * Create an instance of {@link Select }
     * 
     */
    public Select createSelect() {
        return new Select();
    }

    /**
     * Create an instance of {@link VocabularyReferenceItem }
     * 
     */
    public VocabularyReferenceItem createVocabularyReferenceItem() {
        return new VocabularyReferenceItem();
    }

    /**
     * Create an instance of {@link ModuleItem }
     * 
     */
    public ModuleItem createModuleItem() {
        return new ModuleItem();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link Application }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.zetcom.com/ria/ws/module", name = "application")
    public JAXBElement<Application> createApplication(Application value) {
        return new JAXBElement<Application>(_Application_QNAME, Application.class, null, value);
    }

}
