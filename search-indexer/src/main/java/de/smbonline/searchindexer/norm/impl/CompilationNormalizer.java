package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.graphql.queries.fragment.CompilationData;
import de.smbonline.searchindexer.norm.AttributeMappingNormalizer;
import de.smbonline.searchindexer.norm.impl.mappings.MappingSupplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.Nullable;

import static de.smbonline.searchindexer.conf.ConstKt.COMPILATION_ATTRIBUTE;

public class CompilationNormalizer extends AttributeMappingNormalizer<String> {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompilationNormalizer.class);

    public CompilationNormalizer(final ObjectProvider<? extends MappingSupplier> graphQl) {
        super("__orgUnit", COMPILATION_ATTRIBUTE, (orgUnit) -> resolveCompilation(orgUnit, graphQl));
    }

    private static @Nullable String resolveCompilation(final String orgUnit, final ObjectProvider<? extends MappingSupplier> graphQl) {
        CompilationData compilation = graphQl.getObject().fetchCompilation(orgUnit);
        if (compilation == null) {
            LOGGER.warn("No compilation mapping found for org-unit {}", orgUnit);
            return null;
        }
        return compilation.getTitle();
    }
}