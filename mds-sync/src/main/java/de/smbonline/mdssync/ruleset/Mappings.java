package de.smbonline.mdssync.ruleset;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class Mappings {

    private static final Map<String, String> COLLECTION_MAPPING = new LinkedHashMap<>();
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
    }

    public static Map<String, String> collectionMapping() {
        return Collections.unmodifiableMap(COLLECTION_MAPPING);
    }

    public static Map<String, String> ownerMapping() {
        return Collections.unmodifiableMap(OWNER_MAPPING);
    }

    private Mappings() {
        // no instances
    }
}
