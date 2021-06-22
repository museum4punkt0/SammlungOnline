package de.smbonline.searchindexer.norm.impl;

import de.smbonline.searchindexer.norm.AttributeMappingNormalizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static de.smbonline.searchindexer.conf.ConstKt.*;
import static de.smbonline.searchindexer.norm.impl.mappings.Mappings.*;

public class CompilationNormalizer extends AttributeMappingNormalizer<String> {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompilationNormalizer.class);

    public CompilationNormalizer() {
        super("__orgUnit", COMPILATION_ATTRIBUTE, orgUnit -> {
            String mapping = compilationMapping().get(orgUnit);
            if (mapping == null) {
                LOGGER.debug("No compilation mapping found for org-unit {}", orgUnit);
            }
            return mapping;
        });
    }
}