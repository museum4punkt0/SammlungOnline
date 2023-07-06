package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.AssortmentData;
import de.smbonline.searchindexer.service.GraphQlService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.Arrays;

import static de.smbonline.searchindexer.norm.impl.Mockings.*;
import static org.assertj.core.api.Assertions.*;

public class AssortmentsNormalizerTest {

    @Test
    public void testAttributeKey() {
        AssortmentsNormalizer normalizer = new AssortmentsNormalizer(graphQlProvider(mockService()));
        assertThat(normalizer.getAttributeKey()).isEqualTo("assortments");
    }

    @Test
    public void testMapping1() {
        AssortmentsNormalizer normalizer = new AssortmentsNormalizer(graphQlProvider(mockService()));
        String[] assortmentGroups = normalizer.resolveAttributeValue(TestData.createObject(99L), "de");
        assertThat(assortmentGroups).isNull();
    }

    @Test
    public void testMapping2() {
        AssortmentsNormalizer normalizer = new AssortmentsNormalizer(graphQlProvider(mockService()));
        String[] assortmentGroups = normalizer.resolveAttributeValue(TestData.createObject(100L), "de");
        assertThat(assortmentGroups).containsExactlyInAnyOrder(/*"1",*/ "2", "3"); // TODO "1"
    }

    @Test
    public void testMapping3() {
        AssortmentsNormalizer normalizer = new AssortmentsNormalizer(graphQlProvider(mockService()));
        String[] assortmentGroups = normalizer.resolveAttributeValue(TestData.createObject(600L), "de");
        assertThat(assortmentGroups).containsExactly("3");
    }

    private static GraphQlService mockService() {
        GraphQlService service = Mockito.mock(GraphQlService.class);
        Mockito.when(service.fetchAssortments(Mockito.any())).thenReturn(Arrays.asList(
                new AssortmentData("__ass", 1L, "1", "?q=*", "SEARCH", new ArrayList<>(), new ArrayList<>()),
                new AssortmentData("__ass", 2L, "2", "", "OBJECT_GROUP", Arrays.asList(
                        new AssortmentData.Object("smb_assortments_objects", 100L),
                        new AssortmentData.Object("smb_assortments_objects", 200L),
                        new AssortmentData.Object("smb_assortments_objects", 300L),
                        new AssortmentData.Object("smb_assortments_objects", 400L),
                        new AssortmentData.Object("smb_assortments_objects", 500L)
                ), new ArrayList<>()),
                new AssortmentData("__ass", 3L, "3", "", "SPECIFIC", Arrays.asList(
                        new AssortmentData.Object("smb_assortments_objects", 100L),
                        new AssortmentData.Object("smb_assortments_objects", 200L),
                        new AssortmentData.Object("smb_assortments_objects", 300L),
                        new AssortmentData.Object("smb_assortments_objects", 400L),
                        new AssortmentData.Object("smb_assortments_objects", 500L),
                        new AssortmentData.Object("smb_assortments_objects", 600L),
                        new AssortmentData.Object("smb_assortments_objects", 700L),
                        new AssortmentData.Object("smb_assortments_objects", 800L)
                ), new ArrayList<>())
        ));
        return service;
    }
}
