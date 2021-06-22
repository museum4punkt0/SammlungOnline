
package de.smbonline.mdssync.search.response;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for DataType.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="DataType">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="Varchar"/>
 *     &lt;enumeration value="Clob"/>
 *     &lt;enumeration value="Date"/>
 *     &lt;enumeration value="Time"/>
 *     &lt;enumeration value="Timestamp"/>
 *     &lt;enumeration value="Long"/>
 *     &lt;enumeration value="Numeric"/>
 *     &lt;enumeration value="Boolean"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "DataType", namespace = "http://www.zetcom.com/ria/ws/module")
@XmlEnum
public enum DataType {

    @XmlEnumValue("Varchar")
    VARCHAR("Varchar"),
    @XmlEnumValue("Clob")
    CLOB("Clob"),
    @XmlEnumValue("Date")
    DATE("Date"),
    @XmlEnumValue("Time")
    TIME("Time"),
    @XmlEnumValue("Timestamp")
    TIMESTAMP("Timestamp"),
    @XmlEnumValue("Long")
    LONG("Long"),
    @XmlEnumValue("Numeric")
    NUMERIC("Numeric"),
    @XmlEnumValue("Boolean")
    BOOLEAN("Boolean");
    private final String value;

    DataType(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static DataType fromValue(String v) {
        for (DataType c: DataType.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
