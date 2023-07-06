package de.smbonline.mdssync.ruleset;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class Mappings {

    private static final Map<String, String> COLLECTION_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> ROOM_MAPPING = new LinkedHashMap<>();
    private static final Map<String, String> OWNER_MAPPING = new LinkedHashMap<>();

    static {
        COLLECTION_MAPPING.put("AKu", "Museum für Asiatische Kunst");
        COLLECTION_MAPPING.put("AMP", "Ägyptisches Museum und Papyrussammlung");
        COLLECTION_MAPPING.put("ÄMP", COLLECTION_MAPPING.get("AMP"));
        COLLECTION_MAPPING.put("ANT", "Antikensammlung");
        COLLECTION_MAPPING.put("EM", "Ethnologisches Museum");
        COLLECTION_MAPPING.put("GF", "Gipsformerei");
        COLLECTION_MAPPING.put("GG", "Gemäldegalerie");
        COLLECTION_MAPPING.put("IFM", "Institut für Museumsforschung");
        COLLECTION_MAPPING.put("ISL", "Museum für Islamische Kunst");
        COLLECTION_MAPPING.put("KB", "Kunstbibliothek");
        COLLECTION_MAPPING.put("KGM", "Kunstgewerbemuseum");
        COLLECTION_MAPPING.put("KK", "Kupferstichkabinett");
        COLLECTION_MAPPING.put("MEK", "Museum Europäischer Kulturen");
        COLLECTION_MAPPING.put("MIM", "Musikinstrumenten-Museum");
        COLLECTION_MAPPING.put("MK", "Münzkabinett");
        COLLECTION_MAPPING.put("MSB", "Skulpturensammlung und Museum für Byzantinische Kunst");
        COLLECTION_MAPPING.put("MVF", "Museum für Vor- und Frühgeschichte");
        COLLECTION_MAPPING.put("NG", "Nationalgalerie");
        COLLECTION_MAPPING.put("NGAlte", COLLECTION_MAPPING.get("NG"));
        COLLECTION_MAPPING.put("NGNeue", COLLECTION_MAPPING.get("NG"));
        COLLECTION_MAPPING.put("RaO", "Rathgen Forschungslabor");
        COLLECTION_MAPPING.put("SBM", COLLECTION_MAPPING.get("MSB"));
        COLLECTION_MAPPING.put("SKS", COLLECTION_MAPPING.get("MSB"));
        COLLECTION_MAPPING.put("VAM", "Vorderasiatisches Museum");
        COLLECTION_MAPPING.put("ZA", "Zentralarchiv");

        OWNER_MAPPING.put("MIM", "Staatliches Institut für Musikforschung");


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
        // ROOM_MAPPING.put("O3.124.B1", ""); // TODO more Ostflügel mappings here

        // PMU
        ROOM_MAPPING.put("Milet-Saal", "Raum 1");
        ROOM_MAPPING.put("Altarsaal", "Raum 2");
        ROOM_MAPPING.put("Privatgruft", "Raum 10b");
    }

    public static Map<String, String> collectionMapping() {
        return Collections.unmodifiableMap(COLLECTION_MAPPING);
    }

    public static Map<String, String> ownerMapping() {
        return Collections.unmodifiableMap(OWNER_MAPPING);
    }

    public static Map<String, String> roomMapping() {
        return Collections.unmodifiableMap(ROOM_MAPPING);
    }

    private Mappings() {
        // no instances
    }
}
