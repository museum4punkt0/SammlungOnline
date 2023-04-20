package de.smbonline.mdssync.util;

import de.smbonline.mdssync.dto.Credits;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class LicensesTest {

    @Test
    void testIsRightsHolder() {
        assertThat(Licenses.isRightsHolder("VG Bild-Kunst")).isTrue();
    }

    @Test
    void testCCIsNotRightsHolder() {
        assertThat(Licenses.isRightsHolder("CC_BY_NC_SA_40")).isFalse();
    }


    @Test
    void testBuildCreditsLineWithoutCollectionAndPhotographer() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin /");
    }

    @Test
    void testBuildCreditsLineWithoutCollection() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setPhotographer("John Doe");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin / John Doe");
    }

    @Test
    void testBuildCreditsLineWithoutPhotographer() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setCollection("Best-Of-SMB");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin, Best-Of-SMB /");
    }

    @Test
    void testBuildCreditsLineWithPhotographer() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setCollection("Geile Sammlung");
        credits.setPhotographer("Meister Eder");
        credits.setLicenseKey("CC_BY_NC_SA_40");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo("Staatliche Museen zu Berlin, Geile Sammlung / Meister Eder");
    }

    @Test
    void testBuildCreditsLineWithRightsHolderAndAdditionalCredits() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setArtist("Erster, Zweiter");
        credits.setTitle("OBJEKTTITEL-1");
        credits.setOriginDate("2001-01-01");
        credits.setAdditionalCredits("Weitere Infos");
        credits.setLicenseKey("Bruce Lee");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo(
                "Staatliche Museen zu Berlin // Erster, Zweiter, OBJEKTTITEL-1, 2001-01-01 © Weitere Infos");
    }

    @Test
    void testBuildCreditsLineWithRightsHolder() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setArtist("Lurch");
        credits.setTitle("Titel25");
        credits.setOriginDate("1980-01-01");
        credits.setLicenseKey("NOT-CC");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo(
                "Staatliche Museen zu Berlin // Lurch, Titel25, 1980-01-01 ©");
    }

    @Test
    void testBuildFullCreditsLineWithVGBildkunst() {
        Credits credits = new Credits();
        credits.setOwner("Staatliche Museen zu Berlin");
        credits.setCollection("Nationalgalerie");
        credits.setPhotographer("Der Strunz");
        credits.setArtist("Erster, Zweiter");
        credits.setTitle("OBJEKTTITEL-1");
        credits.setOriginDate("2001-01-01");
        credits.setAdditionalCredits("Noch was extra");
        credits.setLicenseKey("VG Bild-Kunst");

        assertThat(Licenses.toCreditLine(credits)).isEqualTo(
                "Staatliche Museen zu Berlin, Nationalgalerie / Der Strunz // Erster, Zweiter, OBJEKTTITEL-1, 2001-01-01 © Noch was extra");
    }
}
