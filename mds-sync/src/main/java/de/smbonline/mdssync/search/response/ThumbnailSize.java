
package de.smbonline.mdssync.search.response;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for ThumbnailSize.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="ThumbnailSize">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="extraSmall"/>
 *     &lt;enumeration value="small"/>
 *     &lt;enumeration value="medium"/>
 *     &lt;enumeration value="large"/>
 *     &lt;enumeration value="extraLarge"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "ThumbnailSize", namespace = "http://www.zetcom.com/ria/ws/module")
@XmlEnum
public enum ThumbnailSize {

    @XmlEnumValue("extraSmall")
    EXTRA_SMALL("extraSmall"),
    @XmlEnumValue("small")
    SMALL("small"),
    @XmlEnumValue("medium")
    MEDIUM("medium"),
    @XmlEnumValue("large")
    LARGE("large"),
    @XmlEnumValue("extraLarge")
    EXTRA_LARGE("extraLarge");
    private final String value;

    ThumbnailSize(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static ThumbnailSize fromValue(String v) {
        for (ThumbnailSize c: ThumbnailSize.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
