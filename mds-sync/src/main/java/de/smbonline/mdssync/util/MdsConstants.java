package de.smbonline.mdssync.util;

import java.time.ZoneId;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public final class MdsConstants {

    public static final ZoneId MDS_DATE_ZONE = ZoneId.of("Europe/Berlin");

    public static final String ORGUNIT_TRASHBIN = "SysTrashBinOrgUnit_global";

    public static final String FIELD_ID = "__id";
    public static final String FIELD_LAST_MODIFIED = "__lastModified";
    public static final String FIELD_ORG_UNIT = "__orgUnit";
    public static final String FIELD_OBJECT_GROUP_NAME = "OgrNameTxt";

    // !Vocabulary/Thesaurus is not a module!
    public static final String VOCABULARY = "vocabulary";

    public static final String MODULE_EXHIBITIONS = "Exhibition";
    public static final String MODULE_LITERATURE = "Literature";
    public static final String MODULE_MULTIMEDIA = "Multimedia";
    public static final String MODULE_OBJECTS = "Object";
    public static final String MODULE_OBJECT_GROUPS = "ObjectGroup";
    public static final String MODULE_OWNERSHIP = "Ownership";
    public static final String MODULE_PERSON = "Person";
    public static final String MODULE_REGISTRAR = "Registrar";

    public static final String VOC_ROLE = "RoleVoc";
    public static final String VOC_TYPE = "TypeVoc";

    // Yeah, I know indexed values are not final - let's pretend anyways...
    public static final String[] DEFAULT_BLACKLISTED_VALUES = {"to do", "null"};

    public static final String[] BLACKLISTED_ROLE_NAMES = {"Leihgeber", "Mäzen", "Nachlasser", "Person", "Veräußerer", "Vorbesitzer"};

    public static final String[] BLACKLISTED_GEOREF_TYPE_NAMES = {
            "Statistischer Bezug",
            "Fundort Ausgabe",
            "Fundort aktuell", "Fundort (aktuell)", "Fundort (aktueller)",
            "Fundort normiert", "Fundort (normiert)",
            "Fundort Variante", "Fundort (Variante)",
            "Fundort historisch 1800", "Fundort (historisch 1800)",
            "Fundort historisch 1900", "Fundort (historisch 1900)",
            "Fundort historisch 2000", "Fundort (historisch 2000)"
    };

    public static Map<String, String> getSMBFilterValues(final String module) {
        Map<String, String> map = new LinkedHashMap<>();
        if (MODULE_OBJECTS.equals(module)) {
            map.put("ObjPublicationGrp.TypeVoc", "2600647"); // "Daten freigegeben für SMB-digital"
            map.put("ObjPublicationGrp.PublicationVoc", "1810139"); // "Ja"
        }
        if (MODULE_MULTIMEDIA.equals(module)) {
            map.put("MulApprovalGrp.TypeVoc", "1816002"); // "SMB-digital"
            map.put("MulApprovalGrp.ApprovalVoc", "4160027"); // "Ja" (test system: "3585543")
        }
        if (MODULE_OWNERSHIP.equals(module)) {
            map.put("OwnApprovalVoc", "1813607"); // "Provenienzschritt freigegeben für SMB-digital"
        }
        if (MODULE_REGISTRAR.equals(module)) {
            map.put("RegDecisionVoc", "1062604"); // "Positiv"
        }
        return Collections.unmodifiableMap(map);
    }

    private MdsConstants() {
        // no instances
    }
}
