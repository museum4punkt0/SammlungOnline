package de.smbonline.mdssync.exec.parser;

import de.smbonline.mdssync.dto.HighlightDTO;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import org.springframework.lang.Nullable;

import java.util.Objects;

import static de.smbonline.mdssync.util.MdsConstants.*;

public class HighlightsParser {

    private final HighlightsParser.Config config;

    public HighlightsParser() {
        this.config = new Config();
    }

    public HighlightsParser.Config getConfig() {
        return this.config;
    }

    /**
     * Parses given module item. Returns null if there are no object references (=highlights) found in the item.
     *
     * @param moduleItem module item from MDS
     * @return parsed highlight dto or null
     */
    public @Nullable HighlightDTO parseModuleItem(final ModuleItem moduleItem) {

        // find objects in this group
        ModuleReference objectRefs = moduleItem.getModuleReference()
                .stream()
                .filter(r -> MODULE_OBJECTS.equals(r.getTargetModule()))
                .findFirst()
                .orElse(null);

        if (objectRefs == null) {
            // no highlights in this group
            return null;
        }

        // determine org-unit name
        SystemField orgUnitField = moduleItem.getSystemField()
                .stream()
                .filter(f -> this.config.getOrgUnitFieldName().equals(f.getName()))
                .findFirst()
                .orElse(null);
        String orgUnit = orgUnitField == null || orgUnitField.getValue() == null
                ? this.config.getUndefinedOrgUnitName() : orgUnitField.getValue();

        // collect MDS ids of referenced objects
        Long[] objIds = objectRefs.getModuleReferenceItem()
                .stream()
                .map(ModuleReferenceItem::getModuleItemId)
                .toArray(Long[]::new);

        // build the highlight
        HighlightDTO obj = new HighlightDTO();
        obj.setOrgUnitName(orgUnit);
        obj.setObjectIds(objIds);
        return obj;
    }

    public static class Config {
        private String undefinedOrgUnitName = "undef";
        private String orgUnitFieldName = "__orgUnit";

        public String getOrgUnitFieldName() {
            return this.orgUnitFieldName;
        }

        public void setOrgUnitFieldName(final String fieldName) {
            this.orgUnitFieldName = Objects.requireNonNull(fieldName);
        }

        public String getUndefinedOrgUnitName() {
            return this.undefinedOrgUnitName;
        }

        public void setUndefinedOrgUnitName(final String unitName) {
            this.undefinedOrgUnitName = Objects.requireNonNull(unitName);
        }
    }
}
