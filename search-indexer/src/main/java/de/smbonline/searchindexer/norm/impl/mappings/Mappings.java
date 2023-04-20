package de.smbonline.searchindexer.norm.impl.mappings;

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class Mappings {

    private static final Map<String, String> BUILDING_ABBREV_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> SECTOR_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> LEVEL_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> ROOM_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> ORGUNIT_COLLECTION_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> ORGUNIT_COMPILATION_MAPPING = new LinkedHashMap<>();
    private static final Map<String, Pair<Integer, Integer>> EPOCH_DATERANGE_MAPPING = new LinkedHashMap<>();

    public static Map<String, Pair<Integer, Integer>> epochMapping() {
        return Collections.unmodifiableMap(EPOCH_DATERANGE_MAPPING);
    }

    public static Map<String, String> buildingMapping() {
        return Collections.unmodifiableMap(BUILDING_ABBREV_MAPPING);
    }
    public static Map<String, String> sectorMapping() {
        return Collections.unmodifiableMap(SECTOR_MAPPING);
    }

    public static Map<String, String> collectionMapping() {
        return Collections.unmodifiableMap(ORGUNIT_COLLECTION_MAPPING);
    }

    public static Map<String, String> roomMapping() {
        return Collections.unmodifiableMap(ROOM_MAPPING);
    }

    public static Map<String, String> levelMapping() {
        return Collections.unmodifiableMap(LEVEL_MAPPING);
    }

    public static Map<String, String> compilationMapping() {
        return Collections.unmodifiableMap(ORGUNIT_COMPILATION_MAPPING);
    }

    static {
        ORGUNIT_COLLECTION_MAPPING.put("AKu", "Museum für Asiatische Kunst");
        ORGUNIT_COLLECTION_MAPPING.put("AMP", "Ägyptisches Museum und Papyrussammlung");
        ORGUNIT_COLLECTION_MAPPING.put("AEMP", ORGUNIT_COLLECTION_MAPPING.get("AMP"));
        ORGUNIT_COLLECTION_MAPPING.put("ÄMP", ORGUNIT_COLLECTION_MAPPING.get("AMP"));
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
        ORGUNIT_COLLECTION_MAPPING.put("SBM", ORGUNIT_COLLECTION_MAPPING.get("MSB"));
        ORGUNIT_COLLECTION_MAPPING.put("SKS", ORGUNIT_COLLECTION_MAPPING.get("MSB"));
        ORGUNIT_COLLECTION_MAPPING.put("VAM", "Vorderasiatisches Museum");
        ORGUNIT_COLLECTION_MAPPING.put("ZA", "Zentralarchiv");

        // --

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
        ORGUNIT_COMPILATION_MAPPING.put("NGHamburgerBahnhofMuseumfurGegenwart", "Hamburger Bahnhof - Nationalgalerie der Gegenwart");
        ORGUNIT_COMPILATION_MAPPING.put("NGMuseumBerggruen", "Museum Berggruen");
        ORGUNIT_COMPILATION_MAPPING.put("NGNeueNationalgalerie", "Neue Nationalgalerie");
        ORGUNIT_COMPILATION_MAPPING.put("NGSammlungScharfGerstenberg", "Sammlung Scharf-Gerstenberg");
        ORGUNIT_COMPILATION_MAPPING.put("SBMKFMV", "Skulpturensammlung");
        ORGUNIT_COMPILATION_MAPPING.put("SKSSkulpturen", "Skulpturensammlung");
        ORGUNIT_COMPILATION_MAPPING.put("ZAFotosammlung2", "Fotosammlung");

        // --

        BUILDING_ABBREV_MAPPING.put("ANG", "Alte Nationalgalerie");
        BUILDING_ABBREV_MAPPING.put("AM", "Altes Museum");
        BUILDING_ABBREV_MAPPING.put("BM", "Bode-Museum");
        BUILDING_ABBREV_MAPPING.put("Bodemuseum", BUILDING_ABBREV_MAPPING.get("BM"));
        BUILDING_ABBREV_MAPPING.put("FWK", "Friedrichswerdersche Kirche");
        BUILDING_ABBREV_MAPPING.put("FWK (NG)", BUILDING_ABBREV_MAPPING.get("FWK"));
        BUILDING_ABBREV_MAPPING.put("GG", "Gemäldegalerie");
        BUILDING_ABBREV_MAPPING.put("HBF", "Hamburger Bahnhof - Nationalgalerie der Gegenwart");
        BUILDING_ABBREV_MAPPING.put("HUF", "Humboldt Forum");
        BUILDING_ABBREV_MAPPING.put("JSG", "James-Simon-Galerie");
        BUILDING_ABBREV_MAPPING.put("KB", "Kunstbibliothek");
        BUILDING_ABBREV_MAPPING.put("KGM", "Kunstgewerbemuseum");
        BUILDING_ABBREV_MAPPING.put("KGM##Tiergarten", BUILDING_ABBREV_MAPPING.get("KGM"));
        BUILDING_ABBREV_MAPPING.put("KGM Köpenick", "Schloss Köpenick");
        BUILDING_ABBREV_MAPPING.put("KGM##Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("KGM Schloss Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("KGM im Schloss Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("KGM Schloß Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("KGM im Schloß Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("KGM/Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("KK", "Kupferstichkabinett");
        BUILDING_ABBREV_MAPPING.put("MB", "Museum Berggruen");
        BUILDING_ABBREV_MAPPING.put("MEK", "Museum Europäischer Kulturen");
        BUILDING_ABBREV_MAPPING.put("MIM", "Musikinstrumenten-Museum");
        BUILDING_ABBREV_MAPPING.put("MfF", "Museum für Fotografie");
        BUILDING_ABBREV_MAPPING.put("NNG", "Neue Nationalgalerie");
        BUILDING_ABBREV_MAPPING.put("NMU", "Neues Museum");
        BUILDING_ABBREV_MAPPING.put("PMU", "Pergamonmuseum");
        BUILDING_ABBREV_MAPPING.put("PMU vor GuE", BUILDING_ABBREV_MAPPING.get("PMU"));
        BUILDING_ABBREV_MAPPING.put("PMI", "Pergamonmuseum. Das Panorama");
        BUILDING_ABBREV_MAPPING.put("SMB - KGM/Köpenick", BUILDING_ABBREV_MAPPING.get("KGM Köpenick"));
        BUILDING_ABBREV_MAPPING.put("SSG", "Sammlung Scharf-Gerstenberg");

        // --

        // PMU
        SECTOR_MAPPING.put("AS", "Südflügel");
        SECTOR_MAPPING.put("AN", "Nordflügel");

        // GG
        SECTOR_MAPPING.put("Kulturforum", "Gemäldegalerie");

        // --

        LEVEL_MAPPING.put("AG", "Ausstellungsgeschoss");
        LEVEL_MAPPING.put("EG", "Erdgeschoss");
        LEVEL_MAPPING.put("HG", "Hauptgeschoss");
        LEVEL_MAPPING.put("OG", "Obergeschoss");
        LEVEL_MAPPING.put("UG", "Untergeschoss");
        LEVEL_MAPPING.put("ZG", "Zentralgeschoss");

        // GG
        LEVEL_MAPPING.put("GG_2.OG_Ausstellung", LEVEL_MAPPING.get("HG"));

        // PMU
        LEVEL_MAPPING.put("Pergamon-Saal (RuB ANT 2)", "Ebene 1, " +ORGUNIT_COLLECTION_MAPPING.get("ANT"));

        // --

        // GG
        ROOM_MAPPING.put("GG_402", "Raum I");
        ROOM_MAPPING.put("GG_404", "Raum II");
        ROOM_MAPPING.put("GG_405", "Raum 1");
        ROOM_MAPPING.put("GG_406", "Raum 2");
        ROOM_MAPPING.put("GG_407", "Raum III");
        ROOM_MAPPING.put("GG_408", "Raum 3");
        ROOM_MAPPING.put("GG_409", "Raum IV");
        ROOM_MAPPING.put("GG_410", "Raum 4");
        ROOM_MAPPING.put("GG_412", "Raum V");
        ROOM_MAPPING.put("GG_411", "Raum 5");
        ROOM_MAPPING.put("GG_414", "Raum VI");
        ROOM_MAPPING.put("GG_415", "Raum 6");
        ROOM_MAPPING.put("GG_416", "Raum 7");
        ROOM_MAPPING.put("GG_417", "Raum VII");
        ROOM_MAPPING.put("GG_418", "Raum 8");
        ROOM_MAPPING.put("GG_419", "Raum 9");
        ROOM_MAPPING.put("GG_420", "Raum VIII");
        ROOM_MAPPING.put("GG_422", "Raum IX");
        ROOM_MAPPING.put("GG_422a", "Raum IX");
        ROOM_MAPPING.put("GG_423", "Raum 11");
        ROOM_MAPPING.put("GG_424", "Raum 12");
        ROOM_MAPPING.put("GG_425", "Raum 13");
        ROOM_MAPPING.put("GG_426", "Raum 14");
        ROOM_MAPPING.put("GG_427", "Raum 15");
        ROOM_MAPPING.put("GG_428", "Raum 16");
        ROOM_MAPPING.put("GG_430", "Raum X");
        ROOM_MAPPING.put("GG_432", "Raum XI");
        ROOM_MAPPING.put("GG_432a", "Raum XI");
        ROOM_MAPPING.put("GG_433", "Raum 17");
        ROOM_MAPPING.put("GG_434", "Raum 18");
        ROOM_MAPPING.put("GG_435", "Raum 20");
        ROOM_MAPPING.put("GG_436", "Raum 21");
        ROOM_MAPPING.put("GG_437", "Raum 22");
        ROOM_MAPPING.put("GG_439", "Raum XII");
        ROOM_MAPPING.put("GG_440", "Raum 23");
        ROOM_MAPPING.put("GG_441", "Raum 24");
        ROOM_MAPPING.put("GG_442", "Raum XIII");
        ROOM_MAPPING.put("GG_443", "Raum XIV");
        ROOM_MAPPING.put("GG_444", "Raum 25");
        ROOM_MAPPING.put("GG_445", "Raum 26");
        ROOM_MAPPING.put("GG_446", "Raum 28");
        ROOM_MAPPING.put("GG_447", "Raum 29");
        ROOM_MAPPING.put("GG_448", "Raum XV");
        ROOM_MAPPING.put("GG_450", "Raum XVI");
        ROOM_MAPPING.put("GG_451", "Raum 30");
        ROOM_MAPPING.put("GG_452", "Raum 31");
        ROOM_MAPPING.put("GG_453", "Raum 32");
        ROOM_MAPPING.put("GG_454", "Raum XVII");
        ROOM_MAPPING.put("GG_455", "Raum 35");
        ROOM_MAPPING.put("GG_457", "Raum 34");
        ROOM_MAPPING.put("GG_457a", "Raum 33");
        ROOM_MAPPING.put("GG_458", "Raum 36");
        ROOM_MAPPING.put("GG_459", "Raum 37");
        ROOM_MAPPING.put("GG_460", "Raum 38");
        ROOM_MAPPING.put("GG_461", "Raum 39");
        ROOM_MAPPING.put("GG_462", "Raum 40");
        ROOM_MAPPING.put("GG_463", "Raum 41");
        ROOM_MAPPING.put("GG_464", "Raum XVIII");

        // HUF 2.OG
        ROOM_MAPPING.put("E17", "Raum 200");
        ROOM_MAPPING.put("E35", "Raum 213");
        ROOM_MAPPING.put("E36", "Raum 214");
        ROOM_MAPPING.put("E13", "Raum 215");
        ROOM_MAPPING.put("E14", "Raum 215");
        ROOM_MAPPING.put("E37", "Raum 216");
        ROOM_MAPPING.put("E38", "Raum 216");
        ROOM_MAPPING.put("E39", "Raum 217");
        ROOM_MAPPING.put("E40", "Raum 217");
        ROOM_MAPPING.put("E15", "Raum 218");
        ROOM_MAPPING.put("E16", "Raum 219");
        // HUF 3.OG
        ROOM_MAPPING.put("O3.125.02.B2", "Raum 314");
        ROOM_MAPPING.put("O3.014.B2", "Raum 316");
        ROOM_MAPPING.put("O3.126.P3", "Raum 317");
        ROOM_MAPPING.put("O3.021.B3", "Raum 318");
        ROOM_MAPPING.put("O3.127.01.B3", "Raum 319");
        ROOM_MAPPING.put("O3.097.K2", "Raum 320");
        ROOM_MAPPING.put("O3.124.B1", ""); // TODO more Ostflügel mappings here

        // PMU
        ROOM_MAPPING.put("Milet-Saal", "Raum 1");
        ROOM_MAPPING.put("Altarsaal", "Raum 2");
        ROOM_MAPPING.put("Privatgruft", "Raum 10b");

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
