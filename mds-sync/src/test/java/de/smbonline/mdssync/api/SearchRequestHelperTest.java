package de.smbonline.mdssync.api;

import de.smbonline.mdssync.jaxb.search.request.Application;
import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.request.SelectField;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import java.io.StringWriter;

import static org.assertj.core.api.Assertions.*;

class SearchRequestHelperTest {

    @Test
    void testBuildSearchNotApprovedPayload() throws Exception {
        SearchRequestHelper helper = new SearchRequestHelper(new MdsApiConfig(), "Object");
        Search search = helper.buildSearchNotApprovedPayload();
        Application envelope = SearchRequestHelper.createEnvelope("Object", search);
        Marshaller marshaller = JAXBContext.newInstance(envelope.getClass()).createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.FALSE);
        StringWriter out = new StringWriter();
        marshaller.marshal(envelope, out);
        String xml = out.toString();
        assertThat(StringUtils.substringBetween(xml, "<modules>", "</modules>")).isEqualTo("" +
                "<module name=\"Object\">" +
                "<search>" +
                "<select>" +
                "<field fieldPath=\"__id\"/>" +
                "</select>" +
                "<sort>" +
                "<field fieldPath=\"__id\" direction=\"Ascending\"/>" +
                "</sort>" +
                "<expert module=\"Object\">" +
                "<and>" +
                "<equalsField fieldPath=\"ObjPublicationGrp.TypeVoc\" operand=\"2600647\"/>" +
                "<notEqualsField fieldPath=\"ObjPublicationGrp.PublicationVoc\" operand=\"1810139\"/>" +
                "<isNotNull fieldPath=\"ObjPublicationGrp.PublicationVoc\"/>" +
                "</and>" +
                "</expert>" +
                "</search>" +
                "</module>"
        );
    }

    @Test
    void testLoadModuleRequestConfig() {
        SearchRequestHelper helper = new SearchRequestHelper(new MdsApiConfig(), "Literature");
        Search search = helper.buildSearchPayload();

        assertThat(search.getOffset()).isZero();
        assertThat(search.getSelect()).isNotNull();
        assertThat(search.getSelect().getField().stream().map(SelectField::getFieldPath).toArray(String[]::new))
                .containsExactly("__id",
                        "__lastModified",
                        "LitReferenceShortTxt",
                        "LitPublicationDateLnu",
                        "LitCitationClb");
    }

}
