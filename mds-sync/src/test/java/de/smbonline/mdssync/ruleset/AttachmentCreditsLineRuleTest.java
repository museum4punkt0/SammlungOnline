package de.smbonline.mdssync.ruleset;

import de.smbonline.mdssync.search.response.FormattedValue;
import de.smbonline.mdssync.search.response.ModuleItem;
import de.smbonline.mdssync.search.response.ModuleReference;
import de.smbonline.mdssync.search.response.ModuleReferenceItem;
import de.smbonline.mdssync.search.response.SystemField;
import de.smbonline.mdssync.util.Validations;
import org.junit.jupiter.api.Test;
import org.springframework.lang.Nullable;

import java.util.Arrays;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;

public class AttachmentCreditsLineRuleTest {

    private final AttachmentCreditsLineRule rule = new AttachmentCreditsLineRule();

    @Test
    public void testBuildCreditsLineWithoutCollectionAndPhotographer() {
        ModuleItem item = createMultimediaItem(null);
        String line = rule.apply(item);
        assertThat(line).isEqualTo("Staatliche Museen zu Berlin / CC BY-NC-SA 4.0");
    }

    @Test
    public void testBuildCreditsLineWithoutCollection() {
        ModuleItem item = createMultimediaItem(null, "John Doe");
        String line = rule.apply(item);
        assertThat(line).isEqualTo("Staatliche Museen zu Berlin / John Doe CC BY-NC-SA 4.0");
    }

    @Test
    public void testBuildCreditsLineWithoutPhotographer() {
        ModuleItem item = createMultimediaItem("Best-Of-SMB");
        String line = rule.apply(item);
        assertThat(line).isEqualTo("Staatliche Museen zu Berlin, Best-Of-SMB / CC BY-NC-SA 4.0");
    }

    @Test
    public void testBuildCreditsLine() {
        ModuleItem item = createMultimediaItem("Geile Sammlung", "Meister Eder");
        String line = rule.apply(item);
        assertThat(line).isEqualTo("Staatliche Museen zu Berlin, Geile Sammlung / Meister Eder CC BY-NC-SA 4.0");
    }

    @Test
    public void testBuildCreditsLineWithMultiplePhotograhers() {
        ModuleItem item = createMultimediaItem(null, "Meister Eder", "Pumuckel", "Käpt'n Blaubär");
        String line = rule.apply(item);
        assertThat(line).isEqualTo("Staatliche Museen zu Berlin / Meister Eder, Pumuckel, Käpt'n Blaubär CC BY-NC-SA 4.0");
    }

    @Test
    public void testBuildCreditsLineWithMappedCollection() {
        ModuleItem item = createMultimediaItem("GG-bedeutet-Gemäldegalerie");
        String line = rule.apply(item);
        assertThat(line).isEqualTo("Staatliche Museen zu Berlin, Gemäldegalerie / CC BY-NC-SA 4.0");
    }

    private ModuleItem createMultimediaItem(final @Nullable String collection, final @Nullable String... photographers) {
        ModuleItem item = new ModuleItem();
        if (Validations.isVarArgsDefined(photographers)) {
            ModuleReference photographerReference = new ModuleReference();
            photographerReference.setName(AttachmentCreditsLineRule.PHOTOGRAPHER_MODULE_NAME);
            photographerReference.getModuleReferenceItem().addAll(Arrays.stream(photographers).map(p -> {
                FormattedValue value = new FormattedValue();
                value.setValue(p);
                ModuleReferenceItem refItem = new ModuleReferenceItem();
                refItem.setFormattedValue(value);
                return refItem;
            }).collect(Collectors.toList()));
            item.getModuleReference().add(photographerReference);
        }
        if (collection != null) {
            SystemField orgUnit = new SystemField();
            orgUnit.setName("__orgUnit");
            orgUnit.setValue(collection);
            item.getSystemField().add(orgUnit);
        }
        return item;
    }
}
