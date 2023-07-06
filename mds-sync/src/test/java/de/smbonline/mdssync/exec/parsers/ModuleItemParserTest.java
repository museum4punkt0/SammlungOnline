package de.smbonline.mdssync.exec.parsers;

import de.smbonline.mdssync.dto.AttributeValue;
import de.smbonline.mdssync.dto.ParsedMdsItem;
import de.smbonline.mdssync.jaxb.search.response.DataField;
import de.smbonline.mdssync.jaxb.search.response.DataType;
import de.smbonline.mdssync.jaxb.search.response.FormattedValue;
import de.smbonline.mdssync.jaxb.search.response.SystemField;
import de.smbonline.mdssync.jaxb.search.response.VirtualField;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import de.smbonline.mdssync.jaxb.search.response.DataType;

class ModuleItemParserTest {

    @Test
    void normalizeValues() {
        String input = " <html><BODY><html><body style=\"foo\">0008.A.01618 <1></body></html></body></htML> ";
        String output;

        output = ModuleItemParser.normalizedValue(DataType.VARCHAR, input); // only here html is removed
        assertThat(output).isEqualTo("0008.A.01618 <1>");
        output = ModuleItemParser.normalizedValue(DataType.CLOB, input);
        assertThat(output).isEqualTo(input.trim());
        output = ModuleItemParser.normalizedValue(DataType.DATE, input);
        assertThat(output).isEqualTo(input.trim());
        output = ModuleItemParser.normalizedValue(DataType.TIME, input);
        assertThat(output).isEqualTo(input.trim());
        output = ModuleItemParser.normalizedValue(DataType.TIMESTAMP, input);
        assertThat(output).isEqualTo(input.trim());
        output = ModuleItemParser.normalizedValue(DataType.LONG, input); // here dots are removed
        assertThat(output).isEqualTo("<html><BODY><html><body style=\"foo\">0008A01618 <1></body></html></body></htML>");
        output = ModuleItemParser.normalizedValue(DataType.NUMERIC, input);
        assertThat(output).isEqualTo(input.trim());
        output = ModuleItemParser.normalizedValue(DataType.BOOLEAN, input);
        assertThat(output).isEqualTo(input.trim());
    }

    @Test
    void parseVirtualField() {
        VirtualField field = new VirtualField();
        field.setName("vrt-field-name");
        field.setValue("vrt-field-value");

        AttributeValue dto = new SimpleParser("cz").parseVirtualField(field, "root.path.[0]");
        assertThat(dto.getDatatype()).isIn("String", "string", "STRING", "Varchar", "varchar", "VARCHAR");
        assertThat(dto.getFqKey()).isEqualTo("root.path.[0].vrt-field-name");
        assertThat(dto.getKey()).isEqualTo("root.path.vrt-field-name");
        assertThat(dto.getLanguage()).isEqualTo("cz");
        assertThat(dto.getValue()).isEqualTo("vrt-field-value");
    }

    @Test
    void parseDataField() {
        FormattedValue fValue = new FormattedValue();
        fValue.setLanguage("fr");
        fValue.setValue("formatted-value");

        DataField field = new DataField();
        field.setName("field-name");
        field.setValue("actual-value");
        field.setDataType(DataType.LONG); // long does not use formatted value, but the actual field value
        field.setFormattedValue(fValue);

        AttributeValue dto = new SimpleParser("cz").parseDataField(field, "parent.path.[foo]");
        assertThat(dto.getDatatype()).isIn(DataType.LONG.name(), DataType.LONG.value());
        assertThat(dto.getFqKey()).isEqualTo("parent.path.[foo].field-name");
        assertThat(dto.getKey()).isEqualTo("parent.path.field-name");
        assertThat(dto.getLanguage()).isEqualTo("fr");
        assertThat(dto.getValue()).isEqualTo("actual-value");
    }

    @Test
    void parseSystemField() {

        SystemField field = new SystemField();
        field.setName("field-name");
        field.setValue("actual-value");
        field.setDataType(DataType.TIMESTAMP); // timestamp does not use formatted value, but the actual field value
        field.setFormattedValue(null);

        AttributeValue dto = new SimpleParser("cz").parseDataField(field, "[0]");
        assertThat(dto.getDatatype()).isIn(DataType.TIMESTAMP.name(), DataType.TIMESTAMP.value());
        assertThat(dto.getFqKey()).isEqualTo("[0].field-name");
        assertThat(dto.getKey()).isEqualTo("field-name");
        assertThat(dto.getLanguage()).isEqualTo("cz");
        assertThat(dto.getValue()).isEqualTo("actual-value");
    }

    private static class SimpleParser extends ModuleItemParser<ParsedMdsItem> {
        SimpleParser(final String lang) {
            super(lang);
        }

        @Override
        public ParsedMdsItem newDto(final Long id) {
            return new ParsedMdsItem(id, "ModuleItem");
        }
    }
}
