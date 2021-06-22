package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dto.HighlightDTO;
import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.ModuleReference;
import de.smbonline.mdssync.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.search.response.SystemField;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class HighlightsParser {

    private final HighlightsParser.Config config;

    public HighlightsParser() {
        this.config = new Config();
    }

    public @NotNull HighlightsParser.Config getConfig() {
        return this.config;
    }

    /**
     * Parses given module item. Returns null if there are no object references (=highlights) found in the item.
     *
     * @param moduleItem module item from MDS
     * @return parsed highlight dto or null
     */
    public HighlightDTO parseModuleItem(final @NotNull ModuleItem moduleItem) {

        // find objects in this group
        ModuleReference objectRefs = moduleItem.getModuleReference()
                .stream()
                .filter(r -> "Object".equals(r.getTargetModule()))
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
        List<Long> objIds = objectRefs.getModuleReferenceItem()
                .stream()
                .map(ModuleReferenceItem::getModuleItemId)
                .collect(Collectors.toList());

        // build the highlight
        HighlightDTO obj = new HighlightDTO();
        obj.setOrgUnitName(orgUnit);
        obj.setObjectIds(objIds);
        return obj;
    }

    public static class Config {
        private String undefinedOrgUnitName = "undef";
        private String orgUnitFieldName = "__orgUnit";

        public @NotNull String getOrgUnitFieldName() {
            return this.orgUnitFieldName;
        }

        public void setOrgUnitFieldName(final @NotNull String fieldName) {
            this.orgUnitFieldName = Objects.requireNonNull(fieldName);
        }

        public @NotNull String getUndefinedOrgUnitName() {
            return this.undefinedOrgUnitName;
        }

        public void setUndefinedOrgUnitName(final @NotNull String unitName) {
            this.undefinedOrgUnitName = Objects.requireNonNull(unitName);
        }
    }
}
