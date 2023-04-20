package de.smbonline.mdssync.exec.resolvers;

import de.smbonline.mdssync.dto.PrincipalObject;
import de.smbonline.mdssync.exec.parsers.ModuleItemParser;
import de.smbonline.mdssync.exec.parsers.ModuleItemParserFactory;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;

import static de.smbonline.mdssync.test.TestData.*;
import static org.assertj.core.api.Assertions.*;

class ObjectsResolverTest {

    @Test
    void testIsApproved() {
        ModuleItem item = createModuleItem(123L);
        item.getRepeatableGroup().add(createRepeatableGroup("ObjPublicationGrp",
                createRepeatableGroupItem(1L,
                        Pair.of("TypeVoc", "2600647"), // Daten freigegeben für SMB-digital
                        Pair.of("PublicationVoc", "1810139"))
        )); // Ja
        PrincipalObject obj = ModuleItemParserFactory.<PrincipalObject>getParser("Object", "de").parseModuleItem(item);
        assertThat(ObjectsResolver.isApproved(obj)).isTrue();
    }

    @Test
    void testIsNotApproved() {

        PrincipalObject obj;
        ModuleItemParser<PrincipalObject> parser = ModuleItemParserFactory.getParser("Object", "de");
        ModuleItem item = createModuleItem(123L);

        // there is no approval setting in the object
        obj = parser.parseModuleItem(item);
        assertThat(ObjectsResolver.isApproved(obj)).isFalse();

        // "SMB-digital" type is there, but publication is not
        item.getRepeatableGroup().add(createRepeatableGroup("ObjPublicationGrp",
                createRepeatableGroupItem(1L,
                        Pair.of("TypeVoc", "2600647") // Daten freigegeben für SMB-digital
                )));
        obj = parser.parseModuleItem(item);
        assertThat(ObjectsResolver.isApproved(obj)).isFalse();

        // "SMB-digital" is not "Ja
        item.getRepeatableGroup().get(0).getRepeatableGroupItem().get(0).getVocabularyReference().add(
                createVocabularyReference("PublicationVoc", "111")); // not "Ja"
        obj = parser.parseModuleItem(item);
        assertThat(ObjectsResolver.isApproved(obj)).isFalse();

        // there is a "Ja", but still not for "SMB-digital"
        item.getRepeatableGroup().get(0).getRepeatableGroupItem().add(createRepeatableGroupItem(2L,
                Pair.of("TypeVoc", "12243"), // not SMB-digital
                Pair.of("PublicationVoc", "1810139"))); // Ja
        obj = parser.parseModuleItem(item);
        assertThat(ObjectsResolver.isApproved(obj)).isFalse();

        // just to ensure our test-data is correct, we have a success case at the end
        item.getRepeatableGroup().get(0).getRepeatableGroupItem().get(0).getVocabularyReference().get(1).getVocabularyReferenceItem().setId("1810139");
        obj = parser.parseModuleItem(item);
        assertThat(ObjectsResolver.isApproved(obj)).isTrue();
    }
}
