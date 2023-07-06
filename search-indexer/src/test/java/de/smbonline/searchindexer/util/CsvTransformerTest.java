package de.smbonline.searchindexer.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import de.smbonline.searchindexer.conf.CsvConfig;
import de.smbonline.searchindexer.dto.Data;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;


public class CsvTransformerTest {

    private final CsvConfig config = new CsvConfig();
    private final String separator = ",";
    private final String inlineSeparator = "<br>";
    private final String acquisition = "acquisition";
    private final String assortments = "assortments";
    private final String collection = "collection";

    private final String expectedHeader = "acquisition,assortments,collection,collectionKey,compilation,creditLine,culturalReferences,dateRange,dating,description,dimensionsAndWeight,exhibitions,exhibitionSpace,findSpot,geographicalReferences,attachments,iconclasses,iconography,id,identNumber,inscriptions,involvedParties,exhibit,highlight,keywords,literature,location,longDescription,materialAndTechnique,provenance,provenanceEvaluation,signatures,technicalTerm,titles,";

    private CsvTransformer testObject;

    @BeforeEach
    public void init() {
        config.setSeparator(separator);
        config.setInlineSeparator(inlineSeparator);
        // the config is a static variable of CsvTransformer
        this.testObject = new CsvTransformer(config);
    }

    @Test
    public void createHeader() {
        //when
        String header = testObject.createHeader();
        //then
        assertThat(header).matches(expectedHeader + System.lineSeparator());
    }

    @Test
    public void useHeaderOrder() throws IOException {
        //given
        String acquisitionValue1 = "acquisitionValue1";
        String assortmentsValue1 = "assortmentsValue1";
        String collectionValue1 = "collectionValue1";
        Data data = new Data()
                .setAttribute(assortments, assortmentsValue1)
                .setAttribute(acquisition, acquisitionValue1)
                .setAttribute(collection, collectionValue1);
        String expectedResultLine = acquisitionValue1 + separator
                + assortmentsValue1 + separator
                + collectionValue1 + separator
                + ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";
        //when
        File result = testObject.transform(data);
        //then
        try (BufferedReader reader = new BufferedReader(new FileReader(result))) {
            String header = reader.readLine();
            String line = reader.readLine();

            assertThat(line).matches(expectedResultLine);
        }
    }

    @Test
    public void filterOutNotRelevantAttributes() throws IOException {
        //given
        String acquisitionValue1 = "acquisitionValue1";
        String assortmentsValue1 = "assortmentsValue1";
        String collectionValue1 = "collectionValue1";
        Data data = new Data()
                .setAttribute(acquisition, acquisitionValue1)
                .setAttribute(assortments, assortmentsValue1)
                .setAttribute(collection, collectionValue1)
                .setAttribute("notRelevant", "someValue");
        String expectedResultLine = acquisitionValue1 + separator
                + assortmentsValue1 + separator
                + collectionValue1 + separator
                + ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";
        //when
        File result = testObject.transform(data);
        //then
        try (BufferedReader reader = new BufferedReader(new FileReader(result))) {
            String header = reader.readLine();
            String line = reader.readLine();

            assertThat(header).matches(expectedHeader);
            assertThat(line).matches(expectedResultLine);
        }
    }

    @Test
    public void escapeNewline() throws IOException {
        //given
        String acquisitionValue1 = "acquisition text with newline\n some more text";
        Data data = new Data()
                .setAttribute(acquisition, acquisitionValue1);
        //when
        File result = testObject.transform(data);
        //then
        try (BufferedReader reader = new BufferedReader(new FileReader(result))) {
            String header = reader.readLine();
            String line1 = reader.readLine();
            String line2 = reader.readLine();

            assertThat(line1).contains("\"acquisition text with newline");
            assertThat(line2).contains(" some more text\",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
        }
    }

    @Test
    public void escapeNewlineInCollection() throws IOException {
        //given
        List<String> listValue = new LinkedList<>();
        listValue.add("acquisition text with newline\n some more text");
        listValue.add("new list value text");
        Data data = new Data()
                .setAttribute(acquisition, listValue);
        //when
        File result = testObject.transform(data);
        //then
        try (BufferedReader reader = new BufferedReader(new FileReader(result))) {
            String header = reader.readLine();
            String line1 = reader.readLine();
            String line2 = reader.readLine();

            assertThat(line1).contains("\"acquisition text with newline");
            assertThat(line2).contains(" some more text" + inlineSeparator
                    + "new list value text\""
                    + ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
        }
    }

    @Test
    public void escapeSeparator() throws IOException {
        //given
        String acquisitionValue1 = "acquisition text with separator" + separator + "some more text";
        Data data = new Data()
                .setAttribute(acquisition, acquisitionValue1);
        //when
        File result = testObject.transform(data);
        //then
        try (BufferedReader reader = new BufferedReader(new FileReader(result))) {
            String header = reader.readLine();
            String line = reader.readLine();

            assertThat(line).contains("\"acquisition text with separator" + config.separator + "some more text\"");

        }
    }
}
