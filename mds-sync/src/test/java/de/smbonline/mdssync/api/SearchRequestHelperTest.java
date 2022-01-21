package de.smbonline.mdssync.api;

import de.smbonline.mdssync.jaxb.search.request.Search;
import de.smbonline.mdssync.jaxb.search.request.SelectField;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class SearchRequestHelperTest {

    @Test
    public void testLoadModuleRequestConfig() {
        SearchRequestHelper helper = new SearchRequestHelper(new MdsApiConfig(), "Literature");
        Search search = helper.buildSearchPayload();

        assertThat(search.getOffset()).isEqualTo(0);
        assertThat(search.getSelect()).isNotNull();
        assertThat(search.getSelect().getField().stream().map(SelectField::getFieldPath).toArray(String[]::new))
                .containsExactly("__id",
                        "__lastModified",
                        "LitReferenceShortTxt",
                        "LitPublicationDateLnu",
                        "LitCitationClb");
    }

}
