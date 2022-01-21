package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dto.CreditsDTO;
import de.smbonline.mdssync.exc.MdsApiConnectionException;
import de.smbonline.mdssync.api.MdsApiClient;
import de.smbonline.mdssync.api.MdsApiClientFactory;
import de.smbonline.mdssync.api.MdsApiConfig;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.util.Validations;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.Test;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.stream.Collectors;

import static de.smbonline.mdssync.test.TestData.*;
import static org.assertj.core.api.Assertions.*;

public class CreditsResolverTest {

    private static CreditsResolver testObject() {
        MdsApiClientFactory clientFactory = new MdsApiClientFactory(new MdsApiConfig(), null);
        clientFactory.registerApiClient(new MdsApiClient(null, "Person", null) {
            @Override
            public ModuleItem get(final Long mdsId, final @Nullable String lang) throws MdsApiConnectionException {
                if (mdsId == 1L) {
                    return createModuleItem(1L, Pair.of("PerNennformTxt", "Erster"));
                } else if (mdsId == 2L) {
                    return createModuleItem(2L, Pair.of("PerNennformTxt", "Zweiter"));
                } else {
                    throw new MdsApiConnectionException("No connection");
                }
            }
        });
        return new CreditsResolver(clientFactory);
    }

    @Test
    public void testBuildCreditsLineWithoutCollectionAndPhotographer() throws Exception {
        ModuleItem mediaItem = createMultimediaItem(null);
        CreditsDTO credits = testObject().apply(createObjectItem(false), mediaItem);

        assertThat(credits.getAdditionalCredits()).isNull();
        assertThat(credits.getArtist()).isNull();
        assertThat(credits.getCollection()).isNull();
        assertThat(credits.getLicenseKey()).isEqualTo("CC_BY_NC_SA_40");
        assertThat(credits.getOriginDate()).isNull();
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isNull();
        assertThat(credits.getTitle()).isNull();
    }

    @Test
    public void testBuildCreditsLineWithoutCollection() throws Exception {
        ModuleItem mediaItem = createMultimediaItem(null, "John Doe");
        CreditsDTO credits = testObject().apply(createObjectItem(false), mediaItem);

        assertThat(credits.getAdditionalCredits()).isNull();
        assertThat(credits.getArtist()).isNull();
        assertThat(credits.getCollection()).isNull();
        assertThat(credits.getLicenseKey()).isEqualTo("CC_BY_NC_SA_40");
        assertThat(credits.getOriginDate()).isNull();
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isEqualTo("John Doe");
        assertThat(credits.getTitle()).isNull();
    }

    @Test
    public void testBuildCreditsLineWithoutPhotographer() throws Exception {
        ModuleItem mediaItem = createMultimediaItem("Best-Of-SMB");
        CreditsDTO credits = testObject().apply(createObjectItem(false), mediaItem);

        assertThat(credits.getAdditionalCredits()).isNull();
        assertThat(credits.getArtist()).isNull();
        assertThat(credits.getCollection()).isEqualTo("Best-Of-SMB");
        assertThat(credits.getLicenseKey()).isEqualTo("CC_BY_NC_SA_40");
        assertThat(credits.getOriginDate()).isNull();
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isNull();
        assertThat(credits.getTitle()).isNull();
    }

    @Test
    public void testBuildCreditsLine() throws Exception {
        ModuleItem mediaItem = createMultimediaItem("Geile Sammlung", "Meister Eder");
        CreditsDTO credits = testObject().apply(createObjectItem(false), mediaItem);

        assertThat(credits.getAdditionalCredits()).isNull();
        assertThat(credits.getArtist()).isNull();
        assertThat(credits.getCollection()).isEqualTo("Geile Sammlung");
        assertThat(credits.getLicenseKey()).isEqualTo("CC_BY_NC_SA_40");
        assertThat(credits.getOriginDate()).isNull();
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isEqualTo("Meister Eder");
        assertThat(credits.getTitle()).isNull();
    }

    @Test
    public void testBuildCreditsLineWithMultiplePhotographers() throws Exception {
        ModuleItem mediaItem = createMultimediaItem(null, "Meister Eder", "Pumuckel", "Käpt'n Blaubär");
        CreditsDTO credits = testObject().apply(createObjectItem(false), mediaItem);

        assertThat(credits.getAdditionalCredits()).isNull();
        assertThat(credits.getArtist()).isNull();
        assertThat(credits.getCollection()).isNull();
        assertThat(credits.getLicenseKey()).isEqualTo("CC_BY_NC_SA_40");
        assertThat(credits.getOriginDate()).isNull();
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isEqualTo("Meister Eder, Pumuckel, Käpt'n Blaubär");
        assertThat(credits.getTitle()).isNull();
    }

    @Test
    public void testBuildCreditsLineWithMappedCollection() throws Exception {
        ModuleItem mediaItem = createMultimediaItem("GG-bedeutet-Gemäldegalerie");
        CreditsDTO credits = testObject().apply(createObjectItem(false), mediaItem);

        assertThat(credits.getAdditionalCredits()).isNull();
        assertThat(credits.getArtist()).isNull();
        assertThat(credits.getCollection()).isEqualTo("Gemäldegalerie");
        assertThat(credits.getLicenseKey()).isEqualTo("CC_BY_NC_SA_40");
        assertThat(credits.getOriginDate()).isNull();
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isNull();
        assertThat(credits.getTitle()).isNull();
    }

    @Test
    public void testBuildCreditsLineWithRightsHolder() throws Exception {
        ModuleItem objectItem = createObjectItem(true);
        ModuleItem mediaItem = enrichWithLicenseInfo(createMultimediaItem(null), "Weitere Infos", "Bruce Lee");
        CreditsDTO credits = testObject().apply(objectItem, mediaItem);

        assertThat(credits.getAdditionalCredits()).isEqualTo("Weitere Infos");
        assertThat(credits.getArtist()).isEqualTo("Erster, Zweiter");
        assertThat(credits.getCollection()).isNull();
        assertThat(credits.getLicenseKey()).isEqualTo("Bruce Lee");
        assertThat(credits.getOriginDate()).isEqualTo("2001-01-01");
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isNull();
        assertThat(credits.getTitle()).isEqualTo("OBJEKTTITEL-1");
    }

    @Test
    public void testBuildCreditsLineWithVGBildkunst() throws Exception {
        ModuleItem objectItem = createObjectItem(true);
        ModuleItem mediaItem = enrichWithLicenseInfo(
                createMultimediaItem("NG", "Der Strunz"), "Noch was extra", "VG Bild-Kunst"
        );

        CreditsDTO credits = testObject().apply(objectItem, mediaItem);
        assertThat(credits.getAdditionalCredits()).isEqualTo("Noch was extra");
        assertThat(credits.getArtist()).isEqualTo("Erster, Zweiter");
        assertThat(credits.getCollection()).isEqualTo("Nationalgalerie");
        assertThat(credits.getLicenseKey()).isEqualTo("VG Bild-Kunst");
        assertThat(credits.getOriginDate()).isEqualTo("2001-01-01");
        assertThat(credits.getOwner()).isEqualTo("Staatliche Museen zu Berlin");
        assertThat(credits.getPhotographer()).isEqualTo("Der Strunz");
        assertThat(credits.getTitle()).isEqualTo("OBJEKTTITEL-1");

    }

    private ModuleItem enrichWithLicenseInfo(
            final ModuleItem mediaItem, final @Nullable String additionalCredits, final @Nullable String rightsHolder) {
        mediaItem.getDataField().add(createDataField("MulPhotocreditTxt", additionalCredits));
        mediaItem.getRepeatableGroup().add(createRepeatableGroup("MulRightsGrp",
                createRepeatableGroupItem(999L,
                        Pair.of("TypeVoc", "Bildrechte"),
                        Pair.of("HolderVoc", rightsHolder)
                )
        ));
        return mediaItem;
    }

    private ModuleItem createObjectItem(final boolean full) throws Exception {
        ModuleItem objectItem = createModuleItem(123L);
        if (full) {
            objectItem.getRepeatableGroup().add(createRepeatableGroup("ObjObjectTitleGrp",
                    createRepeatableGroupItem(2L, Pair.of("TitleTxt", "OBJEKTTITEL-2")),
                    createRepeatableGroupItem(1L, Pair.of("TitleTxt", "OBJEKTTITEL-1"))
            ));
            objectItem.getRepeatableGroup().add(createRepeatableGroup("ObjDateGrp",
                    createRepeatableGroupItem(2L, Pair.of("PreviewVrt", "2002-02-02")),
                    createRepeatableGroupItem(1L, Pair.of("PreviewVrt", "2001-01-01"))
            ));
            objectItem.getModuleReference().add(createModuleReference("ObjPerAssociationRef", "Person",
                    createModuleReferenceItem(1L, "Maler", Pair.of("NotesClb", "Urheberrecht")), // 1 mocked by personClient
                    createModuleReferenceItem(2L, "Künstler", Pair.of("NotesClb", "Urheberrecht")), // 2 mocked by personClient
                    createModuleReferenceItem(3L, "Sammler", Pair.of("NotesClb", "keine Rechte"))
            ));
        }
        return objectItem;
    }

    private ModuleItem createMultimediaItem(final @Nullable String collection, final @Nullable String... photographers) {
        ModuleItem mediaItem = createModuleItem(456L, Pair.of("__orgUnit", collection));
        if (Validations.isVarArgsDefined(photographers)) {
            ModuleReference photographerReference = new ModuleReference();
            photographerReference.setName("MulPhotographerPerRef");
            photographerReference.getModuleReferenceItem().addAll(Arrays.stream(photographers).map(p -> {
                ModuleReferenceItem refItem = new ModuleReferenceItem();
                refItem.setFormattedValue(createFormattedValue(p));
                return refItem;
            }).collect(Collectors.toList()));
            mediaItem.getModuleReference().add(photographerReference);
        }
        return mediaItem;
    }
}
