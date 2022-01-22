package de.smbonline.searchindexer.norm.impl.mappings;

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class Mappings {

    private static final Map<String, String> BUILDING_ABBREV_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> ORGUNIT_COLLECTION_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> ORGUNIT_COMPILATION_MAPPING = new LinkedHashMap<>();
    private static final Map<String, Pair<Integer, Integer>> EPOCH_DATERANGE_MAPPING = new LinkedHashMap<>();

    public static Map<String, Pair<Integer, Integer>> epochMapping() {
        return Collections.unmodifiableMap(EPOCH_DATERANGE_MAPPING);
    }

    public static Map<String, String> buildingMapping() {
        return Collections.unmodifiableMap(BUILDING_ABBREV_MAPPING);
    }

    public static Map<String, String> collectionMapping() {
        return Collections.unmodifiableMap(ORGUNIT_COLLECTION_MAPPING);
    }

    public static Map<String, String> compilationMapping() {
        return Collections.unmodifiableMap(ORGUNIT_COMPILATION_MAPPING);
    }

    static {
        ORGUNIT_COLLECTION_MAPPING.put("AKu", "Museum für Asiatische Kunst");
        ORGUNIT_COLLECTION_MAPPING.put("AMP", "Ägyptisches Museum und Papyrussammlung");
        ORGUNIT_COLLECTION_MAPPING.put("ÄMP", "Ägyptisches Museum und Papyrussammlung");
        ORGUNIT_COLLECTION_MAPPING.put("ANT", "Antikensammlung");
        ORGUNIT_COLLECTION_MAPPING.put("EM", "Ethnologisches Museum");
        ORGUNIT_COLLECTION_MAPPING.put("GF", "Gipsformerei");
        ORGUNIT_COLLECTION_MAPPING.put("GG", "Gemäldegalerie");
        ORGUNIT_COLLECTION_MAPPING.put("IFM", "Institut für Museumsforschung");
        ORGUNIT_COLLECTION_MAPPING.put("ISL", "Museum für Islamische Kunst");
        ORGUNIT_COLLECTION_MAPPING.put("KB", "Kunstbibliothek");
        ORGUNIT_COLLECTION_MAPPING.put("KGM", "Kunstgewerbemuseum");
        ORGUNIT_COLLECTION_MAPPING.put("KK", "Kupferstichkabinett");
        ORGUNIT_COLLECTION_MAPPING.put("MEK", "Museum Europäischer Kulturen");
        ORGUNIT_COLLECTION_MAPPING.put("MIM", "SIM | Musikinstrumenten-Museum");
        ORGUNIT_COLLECTION_MAPPING.put("MK", "Münzkabinett");
        ORGUNIT_COLLECTION_MAPPING.put("MSB", "Skulpturensammlung und Museum für Byzantinische Kunst");
        ORGUNIT_COLLECTION_MAPPING.put("MVF", "Museum für Vor- und Frühgeschichte");
        ORGUNIT_COLLECTION_MAPPING.put("NG", "Nationalgalerie");
        ORGUNIT_COLLECTION_MAPPING.put("RaO", "Rathgen Forschungslabor");
        ORGUNIT_COLLECTION_MAPPING.put("SBM", "Skulpturensammlung und Museum für Byzantinische Kunst");
        ORGUNIT_COLLECTION_MAPPING.put("SKS", "Skulpturensammlung und Museum für Byzantinische Kunst");
        ORGUNIT_COLLECTION_MAPPING.put("VAM", "Vorderasiatisches Museum");
        ORGUNIT_COLLECTION_MAPPING.put("ZA", "Zentralarchiv");

        ORGUNIT_COMPILATION_MAPPING.put("AKuArchiv", "Fotoarchiv");
        ORGUNIT_COMPILATION_MAPPING.put("AKuOstasiatischeKunst", "Ostasien");
        ORGUNIT_COMPILATION_MAPPING.put("AKuSudSudostundZentralasien", "Süd-, Südost- und Zentralasien");
        ORGUNIT_COMPILATION_MAPPING.put("AMPAgyptischesMuseum", "Ägyptisches Museum");
        ORGUNIT_COMPILATION_MAPPING.put("AMPPapyrussammlung", "Papyrussammlung");
        ORGUNIT_COMPILATION_MAPPING.put("EMAfrika1", "Afrika");
        ORGUNIT_COMPILATION_MAPPING.put("EMAllgemein", "Allgemeiner Sammlungsbereich");
        ORGUNIT_COMPILATION_MAPPING.put("EMAmArchaologie", "Amerika");
        ORGUNIT_COMPILATION_MAPPING.put("EMAmEthnologie", "Amerika");
        ORGUNIT_COMPILATION_MAPPING.put("EMArchiv", "Archiv");
        ORGUNIT_COMPILATION_MAPPING.put("EMIslamischerOrient", "Nordafrika, West- und Zentralasien");
        ORGUNIT_COMPILATION_MAPPING.put("EMMedienarchiv", "Medienarchiv");
        ORGUNIT_COMPILATION_MAPPING.put("EMMusikethnologie", "Musikethnologie");
        ORGUNIT_COMPILATION_MAPPING.put("EMOstundNordasien", "Ost- und Nordasien");
        ORGUNIT_COMPILATION_MAPPING.put("EMPhonogrammArchiv", "Phonogramm-Archiv");
        ORGUNIT_COMPILATION_MAPPING.put("EMSudseeAustralien", "Ozeanien");
        ORGUNIT_COMPILATION_MAPPING.put("EMSudundSudostasien", "Süd- und Südostasien");
        ORGUNIT_COMPILATION_MAPPING.put("KBArchitekturzeichnung", "Sammlung Architektur");
        ORGUNIT_COMPILATION_MAPPING.put("KBBuchkunstundNeueMedien", "Sammlung Buchkunst und Neue Medien");
        ORGUNIT_COMPILATION_MAPPING.put("KBModekarikatur", "Sammlung Modebild");
        ORGUNIT_COMPILATION_MAPPING.put("KBMuseumfurFotografie", "Sammlung Fotografie");
        ORGUNIT_COMPILATION_MAPPING.put("KBOSKatalog", "Ornamentstichsammlung");
        ORGUNIT_COMPILATION_MAPPING.put("KBPlakat", "Sammlung Grafikdesign");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeGriechenArchaikundKlassik650bis336", "Antike | Griechen, Archaik und Klassik (-650 bis -336)");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeGriechenHellenismus336bis30", "Antike | Griechen, Hellenismus (-336 bis -30)");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeGriechenRomischeKaiserzeit30bis283", "Antike | Griechen, Römische Kaiserzeit (-30 bis 283)");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeRomischeKaiserzeit30bis283", "Antike | Römische Kaiserzeit (-30 bis 283)");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeRomischeRepublik280bis30", "Antike | Römische Republik (-280 bis -30)");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeRomischeSpatantike284bis476", "Antike | Römische Spätantike (284 bis 476)");
        ORGUNIT_COMPILATION_MAPPING.put("MKAntikeRomischeSpatantike476bis900", "Mittelalter | Frühmittelalter (476 bis 900)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMedaillen19Jhnach18301830bis1900", "Medaillen | 19. Jh. nach 1830 (1830 bis 1900)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMedaillen20Jhbisheute1900bisheute", "Medaillen | 20. Jh. bis heute (1900 bis heute)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMedaillenBarockundRokoko1600bis1770", "Medaillen | Barock und Rokoko (1600 bis 1770)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMedaillenBrandenburgPreuszen1500bis1918", "Medaillen | Brandenburg-Preußen (1500 bis 1918)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMedaillenKlassizismus1770bis1830", "Medaillen | Klassizismus (1770 bis 1830)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMedaillenRenaissance1435bis1550", "Medaillen | Renaissance (1435 bis 1550)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMittelalterHochmittelalter900bis1250", "Mittelalter | Hochmittelalter (900 bis 1250)");
        ORGUNIT_COMPILATION_MAPPING.put("MKMittelalterSpatmittelalter1251bis1500", "Mittelalter | Spätmittelalter (1251 bis 1500)");
        ORGUNIT_COMPILATION_MAPPING.put("MKNeuzeit16Jh", "Neuzeit | 16. Jh. (1501 bis 1600)");
        ORGUNIT_COMPILATION_MAPPING.put("MKNeuzeit17Jh", "Neuzeit | 17. Jh. (1601 bis 1700)");
        ORGUNIT_COMPILATION_MAPPING.put("MKNeuzeit18Jh", "Neuzeit | 18. Jh. (1701 bis 1800)");
        ORGUNIT_COMPILATION_MAPPING.put("MKNeuzeit19Jh", "Neuzeit | 19. Jh. (1801 bis 1900)");
        ORGUNIT_COMPILATION_MAPPING.put("MKNeuzeitDeutschlandGedenkmunzen2021Jh1901bisheute", "Neuzeit | Deutschland Gedenkmünzen 20.-21. Jh. (1901 bis heute)");
        ORGUNIT_COMPILATION_MAPPING.put("MKNeuzeitModerneseit19001900bisheute", "Neuzeit | Moderne seit 1900 (1900 bis heute)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldAltdeutscheStaaten1700bis1871", "Papiergeld | Altdeutsche Staaten (1700 bis 1871)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldAuslandischeGeldscheine1300bisheute", "Papiergeld | Ausländische Geldscheine (1300 bis heute)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldAuslandischesNotgeld1800bisheute", "Papiergeld | Ausländisches Notgeld (1800 bis heute)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldBundesrepublikDeutschland1948bisheute", "Papiergeld | Bundesrepublik Deutschland (1948 bis 2011)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldDeutscheDemokratischeRepublik1948bis1990", "Papiergeld | Deutsche Demokratische Republik (1948 bis 1990)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldDeutschesNotgeld1914bis1924", "Papiergeld | Deutsches Notgeld (1914 bis 1924)");
        ORGUNIT_COMPILATION_MAPPING.put("MKPapiergeldDeutschesReich1871bis1948", "Papiergeld | Deutsches Reich (1871 bis 1948)");
        ORGUNIT_COMPILATION_MAPPING.put("MSBNichtdefiniert", "Museum für Byzantinische Kunst");
        ORGUNIT_COMPILATION_MAPPING.put("MVFArvBArchivischeSammlungen", "Archiv");
        ORGUNIT_COMPILATION_MAPPING.put("MVFArvBOrtsarchivPrussiaMuseum", "Prussia-Ortsarchiv");
        ORGUNIT_COMPILATION_MAPPING.put("MVFMusBEuropa", "Europa");
        ORGUNIT_COMPILATION_MAPPING.put("MVFMusBKaukasusundVordererOrient", "Kaukasus und Vorderer Orient");
        ORGUNIT_COMPILATION_MAPPING.put("MVFMusSBerlinerBodenfunde", "Berliner Bodenfunde");
        ORGUNIT_COMPILATION_MAPPING.put("MVFMusSMarkischesMuseum", "Altbestand Märkisches Museum");
        ORGUNIT_COMPILATION_MAPPING.put("MVFMusSPrussia2", "Prussia-Sammlung");
        ORGUNIT_COMPILATION_MAPPING.put("MVFMusSSchliemann", "Schliemann-Sammlung");
        ORGUNIT_COMPILATION_MAPPING.put("NGAlteNationalgalerie", "Alte Nationalgalerie");
        ORGUNIT_COMPILATION_MAPPING.put("NGHamburgerBahnhofMuseumfurGegenwart", "Hamburger Bahnhof - Museum für Gegenwart");
        ORGUNIT_COMPILATION_MAPPING.put("NGMuseumBerggruen", "Museum Berggruen");
        ORGUNIT_COMPILATION_MAPPING.put("NGNeueNationalgalerie", "Neue Nationalgalerie");
        ORGUNIT_COMPILATION_MAPPING.put("NGSammlungScharfGerstenberg", "Sammlung Scharf-Gerstenberg");
        ORGUNIT_COMPILATION_MAPPING.put("SBMKFMV", "Skulpturensammlung");
        ORGUNIT_COMPILATION_MAPPING.put("SKSSkulpturen", "Skulpturensammlung");
        ORGUNIT_COMPILATION_MAPPING.put("ZAFotosammlung2", "Fotosammlung");

        BUILDING_ABBREV_MAPPING.put("ANG", "Alte Nationalgalerie");
        BUILDING_ABBREV_MAPPING.put("AM", "Altes Museum");
        BUILDING_ABBREV_MAPPING.put("BM", "Bode-Museum");
        BUILDING_ABBREV_MAPPING.put("FWK", "Friedrichswerdersche Kirche");
        BUILDING_ABBREV_MAPPING.put("FWK (NG)", "Friedrichswerdersche Kirche");
        BUILDING_ABBREV_MAPPING.put("GG", "Gemäldegalerie");
        BUILDING_ABBREV_MAPPING.put("HBF", "Hamburger Bahnhof - Museum für Gegenwart - Berlin");
        BUILDING_ABBREV_MAPPING.put("HUF", "Humboldt Forum");
        BUILDING_ABBREV_MAPPING.put("JSG", "James-Simon-Galerie");
        BUILDING_ABBREV_MAPPING.put("KB", "Kunstbibliothek");
        BUILDING_ABBREV_MAPPING.put("KGM", "Kunstgewerbemuseum");
        BUILDING_ABBREV_MAPPING.put("KGM Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KGM Schloss Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KGM im Schloss Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KGM Schloß Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KGM im Schloß Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KGM/Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KK", "Kupferstichkabinett");
        BUILDING_ABBREV_MAPPING.put("MB", "Museum Berggruen");
        BUILDING_ABBREV_MAPPING.put("MEK", "Museum Europäischer Kulturen");
        BUILDING_ABBREV_MAPPING.put("MfF", "Museum für Fotografie");
        BUILDING_ABBREV_MAPPING.put("NNG", "Neue Nationalgalerie");
        BUILDING_ABBREV_MAPPING.put("NMU", "Neues Museum");
        BUILDING_ABBREV_MAPPING.put("PMU", "Pergamonmuseum");
        BUILDING_ABBREV_MAPPING.put("PMI", "Pergamonmuseum. Das Panorama");
        BUILDING_ABBREV_MAPPING.put("SMB - KGM/Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("SSG", "Sammlung Scharf-Gerstenberg");

        // --

        EPOCH_DATERANGE_MAPPING.put("Präklassik", ImmutablePair.of(-3000, 250));
        EPOCH_DATERANGE_MAPPING.put("Späte Präklassik", ImmutablePair.of(-400, 250));
        EPOCH_DATERANGE_MAPPING.put("Frühe Postklassik", ImmutablePair.of(900, 1200));
        EPOCH_DATERANGE_MAPPING.put("Postklassik", ImmutablePair.of(900, 1697));

        EPOCH_DATERANGE_MAPPING.put("kolonial", ImmutablePair.of(1500, 1945));

        EPOCH_DATERANGE_MAPPING.put("Ming-Dynastie", ImmutablePair.of(1368, 1644));
        EPOCH_DATERANGE_MAPPING.put("Späte Ming-Dynastie", ImmutablePair.of(1580, 1644));
    }

    private Mappings() {
        // no instances
    }
}
