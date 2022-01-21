package de.smbonline.mdssync.util;

import de.smbonline.mdssync.dto.CreditsDTO;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class CreditsTest {

    @Test
    public void testIsRightsHolder() {
        assertThat(Credits.isRightsHolder("VG Bild-Kunst")).isTrue();
    }

    @Test
    public void testCCIsNotRightsHolder() {
        assertThat(Credits.isRightsHolder("CC_BY_NC_SA_40")).isFalse();
    }


    @Test
    public void testBuildCreditsLineWithoutCollectionAndPhotographer() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Credits.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin /");
    }

    @Test
    public void testBuildCreditsLineWithoutCollection() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setPhotographer("John Doe");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Credits.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin / John Doe");
    }

    @Test
    public void testBuildCreditsLineWithoutPhotographer() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setCollection("Best-Of-SMB");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Credits.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin, Best-Of-SMB /");
    }

    @Test
    public void testBuildCreditsLineWithPhotographer() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setCollection("Geile Sammlung");
        credits.setPhotographer("Meister Eder");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Credits.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin, Geile Sammlung / Meister Eder");
    }

    @Test
    public void testBuildCreditsLineWithRightsHolderAndAdditionalCredits() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setArtist("Erster, Zweiter");
        credits.setTitle("OBJEKTTITEL-1");
        credits.setOriginDate("2001-01-01");
        credits.setAdditionalCredits("Weitere Infos");
        credits.setLicenseKey("Bruce Lee");

        assertThat(Credits.toCreditLine(credits)).isEqualTo(
                "Staatliche Museen zu Berlin // Erster, Zweiter, OBJEKTTITEL-1, 2001-01-01 © Weitere Infos");
    }

    @Test
    public void testBuildCreditsLineWithRightsHolder() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setArtist("Lurch");
        credits.setTitle("Titel25");
        credits.setOriginDate("1980-01-01");
        credits.setLicenseKey("NOT-CC");

        assertThat(Credits.toCreditLine(credits)).isEqualTo(
                "Staatliche Museen zu Berlin // Lurch, Titel25, 1980-01-01 ©");
    }

    @Test
    public void testBuildFullCreditsLineWithVGBildkunst() {
        CreditsDTO credits = new CreditsDTO();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setCollection("Nationalgalerie");
        credits.setPhotographer("Der Strunz");
        credits.setArtist("Erster, Zweiter");
        credits.setTitle("OBJEKTTITEL-1");
        credits.setOriginDate("2001-01-01");
        credits.setAdditionalCredits("Noch was extra");
        credits.setLicenseKey("VG Bild-Kunst");

        assertThat(Credits.toCreditLine(credits)).isEqualTo(
                "Staatliche Museen zu Berlin, Nationalgalerie / Der Strunz // Erster, Zweiter, OBJEKTTITEL-1, 2001-01-01 © Noch was extra");
    }
}
