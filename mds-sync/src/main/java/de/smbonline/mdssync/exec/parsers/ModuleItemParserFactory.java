package de.smbonline.mdssync.exec.parsers;

import de.smbonline.mdssync.dto.Exhibition;
import de.smbonline.mdssync.dto.MdsItem;
import de.smbonline.mdssync.dto.Media;
import de.smbonline.mdssync.dto.MediaType;
import de.smbonline.mdssync.dto.ParsedMdsItem;
import de.smbonline.mdssync.dto.Person;
import de.smbonline.mdssync.dto.PrincipalObject;
import org.apache.commons.lang3.NotImplementedException;

import java.util.function.LongFunction;

import static de.smbonline.mdssync.util.MdsConstants.*;

public class ModuleItemParserFactory {

    @SuppressWarnings("unchecked")
    public static <T extends MdsItem> ModuleItemParser<T> getParser(final String moduleName, final String language) {
        ModuleItemParser<? extends ParsedMdsItem> parser; // T must be ?
        switch (moduleName) {

            // main case
            case MODULE_OBJECTS -> {
                parser = newModuleItemParser(language, id -> new PrincipalObject(id, language));
            }

            // special cases for module references, for each reference, the back-references to the parent are ignored - and also the system fields "__*" are not required
            case MODULE_LITERATURE -> {
                parser = newModuleItemParser(language, id -> new ParsedMdsItem(id, MODULE_LITERATURE));
                parser.addIgnorableKeys("__*");
                parser.addIgnorableKeys("LitObjectRef*");
            }
            case MODULE_REGISTRAR -> {
                parser = newModuleItemParser(language, id -> new ParsedMdsItem(id, MODULE_REGISTRAR));
                parser.addIgnorableKeys("__*");
                parser.addIgnorableKeys("RegObjectRef*");
            }
            case MODULE_EXHIBITIONS -> {
                parser = newModuleItemParser(language, Exhibition::new);
                parser.addIgnorableKeys("__*");
                parser.addIgnorableKeys("ExhObjectRef*");
                parser.addIgnorableKeys("ExhRegistrarRef*");
            }
            case MODULE_OWNERSHIP -> {
                parser = newModuleItemParser(language, id -> new ParsedMdsItem(id, MODULE_OWNERSHIP));
                parser.addIgnorableKeys("__*");
                parser.addIgnorableKeys("OwnObject001Ref*");
                parser.addIgnorableKeys("OwnObjectRef*");
            }
            case MODULE_PERSON -> {
                parser = newModuleItemParser(language, Person::new);
                parser.addIgnorableKeys("__*");
                parser.addIgnorableKeys("PerOwnershipMNRef*");
                parser.addIgnorableKeys("PerObjectRef*");
                parser.addIgnorableKeys("PerLiteratureRef*");
                parser.addIgnorableKeys("PerObjectgroupRef*");
            }
            case MODULE_MULTIMEDIA -> {
                parser = newModuleItemParser(language, id -> new Media(id, MediaType.UNKNOWN));
            }
            default -> {
                throw new NotImplementedException("No known parser implementation for " + moduleName);
            }
        }
        parser.setSkipEmptyValues(true);
        parser.addBlacklistValues(DEFAULT_BLACKLISTED_VALUES);
        return (ModuleItemParser<T>) parser;
    }

    private static <T extends ParsedMdsItem> ModuleItemParser<T> newModuleItemParser(final String language, final LongFunction<T> producer) {
        return new ModuleItemParser<>(language) {
            @Override public T newDto(final Long id) {
                return producer.apply(id);
            }
        };
    }
}
