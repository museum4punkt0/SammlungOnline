package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.apache.commons.lang3.tuple.Pair;

public class PersonNormdataRule implements TransformationRule<Pair<String, String>[]> {

    @Override
    public Pair<String, String>[] apply(final ModuleItem item) {
        // TODO
        return null;
    }
}
