package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import org.apache.commons.lang3.StringUtils;

import java.util.Map;

import static de.smbonline.mdssync.ruleset.Mappings.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

public class OwnerRule implements TransformationRule<String> {

    private static final String DEFAULT_OWNER = "Staatliche Museen zu Berlin";

    @Override
    public String apply(final ModuleItem item) {
        SystemField orgUnitField = findSysField(item.getSystemField(), FIELD_ORG_UNIT);
        String orgUnit = extractValue(orgUnitField);
        if (StringUtils.isBlank(orgUnit)) {
            return DEFAULT_OWNER;
        }
        return ownerMapping()
                .entrySet()
                .stream()
                .filter(entry -> orgUnit.startsWith(entry.getKey()))
                .findFirst()
                .map(Map.Entry::getValue)
                .orElse(DEFAULT_OWNER);
    }
}
