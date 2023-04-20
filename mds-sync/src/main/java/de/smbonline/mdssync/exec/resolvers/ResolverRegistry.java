package de.smbonline.mdssync.exec.resolvers;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

import static de.smbonline.mdssync.util.MdsConstants.*;

@Component
public class ResolverRegistry {

    private final Map<String, ObjectProvider<? extends ModuleItemResolver>> registry = new LinkedHashMap<>();

    @Autowired
    public ResolverRegistry(
            final ObjectProvider<ObjectsResolver> objectsResolver,
            final ObjectProvider<AssortmentsResolver> assortmentsResolver,
            final ObjectProvider<ExhibitionsResolver> exhibitionsResolver,
            final ObjectProvider<PersonsResolver> personsResolver,
            final ObjectProvider<AttachmentsResolver> attachmentsResolver) {
        this.registry.put(MODULE_OBJECTS, objectsResolver);
        this.registry.put(MODULE_OBJECT_GROUPS, assortmentsResolver);
        this.registry.put(MODULE_MULTIMEDIA, attachmentsResolver);
        this.registry.put(MODULE_PERSON, personsResolver);
        this.registry.put(MODULE_EXHIBITIONS, exhibitionsResolver);
    }

    @SuppressWarnings("unchecked")
    public <T extends ModuleItemResolver> T getResolver(final String moduleName) {
        if (this.registry.containsKey(moduleName)) {
            return (T) this.registry.get(moduleName).getObject();
        }
        throw new IllegalStateException("No resolver registered for module " + moduleName);
    }
}
