package de.smbonline.mdssync.exec.parser;

import de.smbonline.mdssync.dto.AttributeDTO;
import de.smbonline.mdssync.dto.ModuleItemDTO;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.DataType;
import de.smbonline.mdssync.jaxb.search.response.FormattedValue;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

public class ModuleItemParserTest {

    @Test
    public void parseVirtualField() {
        VirtualField field = new VirtualField();
        field.setName("vrt-field-name");
        field.setValue("vrt-field-value");

        AttributeDTO dto = new SimpleParser("cz").parseVirtualField(field, "root.path.[0]");
        assertThat(dto.getDatatype()).isIn("String", "string", "STRING", "Varchar", "varchar", "VARCHAR");
        assertThat(dto.getFqKey()).isEqualTo("root.path.[0].vrt-field-name");
        assertThat(dto.getKey()).isEqualTo("root.path.vrt-field-name");
        assertThat(dto.getLanguage()).isEqualTo("cz");
        assertThat(dto.getValue()).isEqualTo("vrt-field-value");
    }

    @Test
    public void parseDataField() {
        FormattedValue fValue = new FormattedValue();
        fValue.setLanguage("fr");
        fValue.setValue("je ne sais pas");

        DataField field = new DataField();
        field.setName("field-name");
        field.setValue("field-value");
        field.setDataType(DataType.LONG);
        field.setFormattedValue(fValue);

        AttributeDTO dto = new SimpleParser("cz").parseDataField(field, "parent.path.[foo]");
        assertThat(dto.getDatatype()).isIn(DataType.LONG.name(), DataType.LONG.value());
        assertThat(dto.getFqKey()).isEqualTo("parent.path.[foo].field-name");
        assertThat(dto.getKey()).isEqualTo("parent.path.field-name");
        assertThat(dto.getLanguage()).isEqualTo("fr");
        assertThat(dto.getValue()).isEqualTo("je ne sais pas");
    }

    @Test
    public void parseSystemField() {

        SystemField field = new SystemField();
        field.setName("field-name");
        field.setValue("field-value");
        field.setDataType(DataType.TIMESTAMP);
        field.setFormattedValue(null);

        AttributeDTO dto = new SimpleParser("cz").parseDataField(field, "[0]");
        assertThat(dto.getDatatype()).isIn(DataType.TIMESTAMP.name(), DataType.TIMESTAMP.value());
        assertThat(dto.getFqKey()).isEqualTo("[0].field-name");
        assertThat(dto.getKey()).isEqualTo("field-name");
        assertThat(dto.getLanguage()).isEqualTo("cz");
        assertThat(dto.getValue()).isEqualTo("field-value");
    }

    private static class SimpleParser extends ModuleItemParser<ModuleItemDTO> {
        public SimpleParser(final String lang) {
            super(lang);
        }

        @Override
        protected ModuleItemDTO newDto(final Long id) {
            return new ModuleItemDTO(id, "ModuleItem");
        }
    }
}
