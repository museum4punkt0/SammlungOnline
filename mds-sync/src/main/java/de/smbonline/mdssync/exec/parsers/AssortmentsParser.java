package de.smbonline.mdssync.exec.parsers;

import de.smbonline.mdssync.dto.Assortment;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.ModuleReference;
import de.smbonline.mdssync.jaxb.search.response.ModuleReferenceItem;
import org.springframework.lang.Nullable;

import static de.smbonline.mdssync.util.MdsConstants.*;

public class AssortmentsParser {

    /**
     * Parses given module item. Returns null if there are no object references found in the item.
     *
     * @param moduleItem module item from MDS
     * @return parsed assortments dto or null
     */
    public @Nullable Assortment parseModuleItem(final ModuleItem moduleItem, final String key) {

        // find objects in this group
        ModuleReference objectRefs = moduleItem.getModuleReference()
                .stream()
                .filter(r -> MODULE_OBJECTS.equals(r.getTargetModule()))
                .findFirst()
                .orElse(null);

        if (objectRefs == null) {
            // no objects in this group
            return null;
        }


        // collect MDS ids of referenced objects
        Long[] objIds = objectRefs.getModuleReferenceItem()
                .stream()
                .map(ModuleReferenceItem::getModuleItemId)
                .toArray(Long[]::new);

        // build the DTO
        Assortment obj = new Assortment(key, moduleItem.getId());
        obj.setObjectIds(objIds);
        return obj;
    }

}
