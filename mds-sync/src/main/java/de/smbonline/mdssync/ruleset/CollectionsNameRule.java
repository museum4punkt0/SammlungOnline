package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.util.Map;

import static de.smbonline.mdssync.ruleset.Mappings.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

/**
 * Transformation rule for the collections attribute. Takes into account the OrgUnit and fetches
 * a user-friendly representation of the technical value from a lookup table.
 */
public class CollectionsNameRule {

    private static final Logger LOGGER = LoggerFactory.getLogger(CollectionsNameRule.class);

    /**
     * Calculates a user-friendly representation of the OrgUnit, which is considered the parent collection.
     *
     * @param item source item
     * @return collection
     */
    public @Nullable String apply(final ModuleItem item) {
        SystemField orgUnitField = findSysField(item.getSystemField(), FIELD_ORG_UNIT);
        String orgUnit = extractValue(orgUnitField);
        if (StringUtils.isBlank(orgUnit)) {
            return null;
        }
        for (Map.Entry<String, String> entry : collectionMapping().entrySet()) {
            if (orgUnit.startsWith(entry.getKey())) {
                return entry.getValue();
            }
        }
        LOGGER.warn("No collection mapping found for org-unit {}", orgUnit);
        return orgUnit; // whatever we have here, we use it
    }
}
