package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.SystemField;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.Map;

import static de.smbonline.mdssync.ruleset.Mappings.*;
import static de.smbonline.mdssync.util.Lookup.*;

/**
 * Transformation rule for the collections attribute. Takes into account the OrgUnit and fetches
 * a user-friendly representation of the technical value from a lookup table.
 */
public class CollectionsNameRule implements TransformationRule {

    private static final Logger LOGGER = LoggerFactory.getLogger(CollectionsNameRule.class);

    /**
     * Calculates a user-friendly representation of the OrgUnit, which is considered the parent collection.
     *
     * @param item source item
     * @return collection
     */
    @Override
    public @Nullable String apply(final ModuleItem item) {
        SystemField orgUnitField = findFirst(item.getSystemField(), f -> "__orgUnit".equals(f.getName()));
        if (orgUnitField == null || StringUtils.isBlank(orgUnitField.getValue())) {
            return null;
        }
        String orgUnit = orgUnitField.getValue().trim();
        for (Map.Entry<String, String> entry : COLLECTION_MAPPING.entrySet()) {
            if (orgUnit.startsWith(entry.getKey())) {
                return entry.getValue();
            }
        }
        LOGGER.warn("No collection mapping found for org-unit {}", orgUnit);
        return orgUnit; // whatever we have here, we use it
    }
}
