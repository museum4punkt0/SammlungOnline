package de.smbonline.mdssync.util;

import java.util.LinkedHashMap;
import java.util.Map;

public final class MdsConstants {

    public static final String ORGUNIT_TRASHBIN = "SysTrashBinOrgUnit_global";

    public static final String FIELD_ID = "__id";
    public static final String FIELD_LAST_MODIFIED = "__lastModified";
    public static final String FIELD_ORG_UNIT = "__orgUnit";

    public static final String MODULE_EXHIBITIONS = "Exhibition";
    public static final String MODULE_LITERATURE = "Literature";
    public static final String MODULE_MULTIMEDIA = "Multimedia";
    public static final String MODULE_OBJECTS = "Object";
    public static final String MODULE_OBJECT_GROUPS = "ObjectGroup";
    public static final String MODULE_OWNERSHIP = "Ownership";
    public static final String MODULE_PERSON = "Person";
    public static final String MODULE_REGISTRAR = "Registrar";

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
        return map;
    }
    private MdsConstants() {
        // no instances
    }
}
