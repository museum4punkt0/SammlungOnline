package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.search.response.ModuleItem;
import org.springframework.lang.Nullable;

/**
 * Simple definition of a transformation rule. Receives a ModuleItem and
 * creates an attribute value by applying business logic.
 */
@FunctionalInterface
public interface TransformationRule {

    /**
     * Build an attribute value for the given ModuleItem.
     * Implementors decide which attributes are relevant for the calculation of the outcome.
     *
     * @param item source item
     * @return calculated attribute value
     */
    @Nullable String apply(final ModuleItem item);
}
