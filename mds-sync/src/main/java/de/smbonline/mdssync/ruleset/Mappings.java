package de.smbonline.mdssync.ruleset;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class Mappings {

    public static final Map<String, String> COLLECTION_MAPPING = Collections.unmodifiableMap(
            new LinkedHashMap<>() {{
                put("AKu", "Museum für Asiatische Kunst");
                put("AMP", "Ägyptisches Museum und Papyrussammlung");
                put("ÄMP", "Ägyptisches Museum und Papyrussammlung");
                put("ANT", "Antikensammlung");
                put("EM", "Ethnologisches Museum");
                put("GF", "Gipsformerei");
                put("GG", "Gemäldegalerie");
                put("IFM", "Institut für Museumsforschung");
                put("ISL", "Museum für Islamische Kunst");
                put("KB", "Kunstbibliothek");
                put("KGM", "Kunstgewerbemuseum");
                put("KK", "Kupferstichkabinett");
                put("MEK", "Museum Europäischer Kulturen");
                put("MIM", "SIM | Musikinstrumenten-Museum");
                put("MK", "Münzkabinett");
                put("MSB", "Skulpturensammlung und Museum für Byzantinische Kunst");
                put("MVF", "Museum für Vor- und Frühgeschichte");
                put("NG", "Nationalgalerie");
                put("RaO", "Rathgen Forschungslabor");
                put("SKS", "Skulpturensammlung und Museum für Byzantinische Kunst");
                put("VAM", "Vorderasiatisches Museum");
                put("ZA", "Zentralarchiv");
            }}
    );

    private Mappings() {
        // no instances
    }
}
