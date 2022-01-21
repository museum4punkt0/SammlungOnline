package de.smbonline.mdssync.exec.parser;

import de.smbonline.mdssync.dto.MdsObject;
import de.smbonline.mdssync.dto.ModuleItemDTO;
import de.smbonline.mdssync.dto.ObjectDTO;
import org.apache.commons.lang3.NotImplementedException;

import java.util.function.Function;

import static de.smbonline.mdssync.util.MdsConstants.*;

public class ModuleItemParserFactory {

    @SuppressWarnings("unchecked")
    public static <T extends MdsObject> ModuleItemParser<T> getParser(final String moduleName, final String language) {
        ModuleItemParser<T> parser;
        switch (moduleName) {
            // main case
            case MODULE_OBJECTS:
                parser = (ModuleItemParser<T>) new ModuleItemParser<ObjectDTO>(language) {
                    @Override
                    protected ObjectDTO newDto(final Long id) {
                        return new ObjectDTO(id, language);
                    }
                };
                break;

            // special cases for module references, for each reference, the back-references to the parent are ignored
            case MODULE_LITERATURE:
                parser = (ModuleItemParser<T>) newModuleItemParser(language, (id) -> new ModuleItemDTO(id, MODULE_LITERATURE));
                parser.addIgnorableKeys("LitObjectRef*");
                break;

            case MODULE_REGISTRAR:
                parser = (ModuleItemParser<T>) newModuleItemParser(language, (id) -> new ModuleItemDTO(id, MODULE_REGISTRAR));
                parser.addIgnorableKeys("RegObjectRef*");
                break;
            case MODULE_EXHIBITIONS:
                parser = (ModuleItemParser<T>) newModuleItemParser(language, (id) -> new ModuleItemDTO(id, MODULE_EXHIBITIONS));
                parser.addIgnorableKeys("ExhObjectRef*");
                parser.addIgnorableKeys("ExhRegistrarRef*");
                break;

            case MODULE_OWNERSHIP:
                parser = (ModuleItemParser<T>) newModuleItemParser(language, (id) -> new ModuleItemDTO(id, MODULE_OWNERSHIP));
                parser.addIgnorableKeys("OwnObject001Ref*");
                parser.addIgnorableKeys("OwnObjectRef*");
                break;
            case MODULE_PERSON:
                parser = (ModuleItemParser<T>) newModuleItemParser(language, (id) -> new ModuleItemDTO(id, MODULE_PERSON));
                parser.addIgnorableKeys("PerOwnershipMNRef*");
                parser.addIgnorableKeys("PerObjectRef*");
                break;

            default:
                throw new NotImplementedException("No known parser implementation for " + moduleName);
        }
        parser.setSkipEmptyValues(true);
        parser.addBlacklistValues("to do", "null");
        return parser;
    }

    private static ModuleItemParser<ModuleItemDTO> newModuleItemParser(final String language, final Function<Long, ModuleItemDTO> producer) {
        ModuleItemParser<ModuleItemDTO> parser = new ModuleItemParser<>(language) {
            @Override
            protected ModuleItemDTO newDto(final Long id) {
                return producer.apply(id);
            }
        };
        parser.addIgnorableKeys("__*");
        return parser;
    }
}
