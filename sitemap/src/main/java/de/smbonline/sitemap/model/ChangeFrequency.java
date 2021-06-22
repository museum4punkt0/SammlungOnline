package de.smbonline.sitemap.model;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;
import java.util.Arrays;

@XmlType(name = "ChangeFrequency")
@XmlEnum
public enum ChangeFrequency {

    @XmlEnumValue("always")
    ALWAYS("always"),

    @XmlEnumValue("hourly")
    HOURLY("hourly"),

    @XmlEnumValue("daily")
    DAILY("daily"),

    @XmlEnumValue("weekly")
    WEEKLY("weekly"),

    @XmlEnumValue("monthly")
    MONTHLY("monthly"),

    @XmlEnumValue("yearly")
    YEARLY("yearly"),

    @XmlEnumValue("never")
    NEVER("never");

    private final String value;

    ChangeFrequency(final String frequency) {
        this.value = frequency;
    }

    public String value() {
        return this.value;
    }

    public static ChangeFrequency fromValue(final String frequency) {
        return Arrays.stream(values())
                .filter(cf -> cf.value.equals(frequency))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(frequency));
    }
}
