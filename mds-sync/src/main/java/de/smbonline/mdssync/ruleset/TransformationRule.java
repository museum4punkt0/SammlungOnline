package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import org.springframework.lang.Nullable;

public interface TransformationRule<T> {
    @Nullable T apply(final ModuleItem item);
}
