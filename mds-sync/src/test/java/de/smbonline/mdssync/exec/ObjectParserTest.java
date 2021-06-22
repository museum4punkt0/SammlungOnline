package de.smbonline.mdssync.exec;

import de.smbonline.mdssync.dto.AttributeDTO;
import de.smbonline.mdssync.search.response.*;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ObjectParserTest {

    @Test
    public void buildKey() throws Exception {
        String expected;

        expected = "one.two.three";
        assertThat(ObjectParser.toKey("one.two.[123].three")).isEqualTo(expected);

        expected = "one.two.three.four";
        assertThat(ObjectParser.toKey("one.[1].two.[12].three.[123].four")).isEqualTo(expected);

        expected = "one.two.three.four.five.six";
        assertThat(ObjectParser.toKey("[foobar].one.two.[123].three.[*].four.five.six.[abc]")).isEqualTo(expected);
    }

    @Test
    public void buildFqKey() throws Exception {

        assertThat(ObjectParser.joinFqKey(null, null, "0")).isEqualTo("[0]");
        assertThat(ObjectParser.joinFqKey("[0]", null, null)).isEqualTo("[0]");

        assertThat(ObjectParser.joinFqKey(null, "one.two", "12")).isEqualTo("one.two[12]");
        assertThat(ObjectParser.joinFqKey("one.two", null, "12")).isEqualTo("one.two.[12]");
        assertThat(ObjectParser.joinFqKey("one.two.[12]", null, null)).isEqualTo("one.two.[12]");

        assertThat(ObjectParser.joinFqKey(null, "one.two.[12].three", "123")).isEqualTo("one.two.[12].three[123]");
        assertThat(ObjectParser.joinFqKey("one.two.[12]", "three", "123")).isEqualTo("one.two.[12].three[123]");
        assertThat(ObjectParser.joinFqKey("one.two.[12].three", null, "123")).isEqualTo("one.two.[12].three.[123]");
        assertThat(ObjectParser.joinFqKey("one.two.[12].three.[123]", null, null)).isEqualTo("one.two.[12].three.[123]");
    }

    @Test
    public void parseVirtualField() throws Exception {
        VirtualField field =new VirtualField();
        field.setName("vrt-field-name");
        field.setValue("vrt-field-value");

        AttributeDTO dto = new ObjectParser("cz").parseVirtualField(field, "root.path.[0]");
        assertThat(dto.getDatatype()).isIn("String", "string","STRING", "Varchar","varchar", "VARCHAR");
        assertThat(dto.getFqKey()).isEqualTo("root.path.[0].vrt-field-name");
        assertThat(dto.getKey()).isEqualTo("root.path.vrt-field-name");
        assertThat(dto.getLanguage()).isEqualTo("cz");
        assertThat(dto.getValue()).isEqualTo("vrt-field-value");
    }

    @Test
    public void parseDataField() throws Exception {
        FormattedValue fValue = new FormattedValue();
        fValue.setLanguage("fr");
        fValue.setValue("je ne sais pas");

        DataField field =new DataField();
        field.setName("field-name");
        field.setValue("field-value");
        field.setDataType(DataType.LONG);
        field.setFormattedValue(fValue);

        AttributeDTO dto = new ObjectParser("cz").parseDataField(field, "parent.path.[foo]");
        assertThat(dto.getDatatype()).isIn(DataType.LONG.name(), DataType.LONG.value());
        assertThat(dto.getFqKey()).isEqualTo("parent.path.[foo].field-name");
        assertThat(dto.getKey()).isEqualTo("parent.path.field-name");
        assertThat(dto.getLanguage()).isEqualTo("fr");
        assertThat(dto.getValue()).isEqualTo("je ne sais pas");
    }

    @Test
    public void parseSystemField() throws Exception {

        SystemField field =new SystemField();
        field.setName("field-name");
        field.setValue("field-value");
        field.setDataType(DataType.TIMESTAMP);
        field.setFormattedValue(null);

        AttributeDTO dto = new ObjectParser("cz").parseDataField(field, "[0]");
        assertThat(dto.getDatatype()).isIn(DataType.TIMESTAMP.name(), DataType.TIMESTAMP.value());
        assertThat(dto.getFqKey()).isEqualTo("[0].field-name");
        assertThat(dto.getKey()).isEqualTo("field-name");
        assertThat(dto.getLanguage()).isEqualTo("cz");
        assertThat(dto.getValue()).isEqualTo("field-value");
    }
}
