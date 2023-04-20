package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.springframework.lang.Nullable;

import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.ValueExtractor.*;

public class PersonNameRule implements TransformationRule<String> {

    @Override
    public @Nullable String apply(final ModuleItem moduleItem) {
        return extractValue(findDataField(moduleItem.getDataField(), "PerNennformTxt"));
    }
}
