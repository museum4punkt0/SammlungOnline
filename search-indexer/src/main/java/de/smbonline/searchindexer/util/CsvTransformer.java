package de.smbonline.searchindexer.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;

import static de.smbonline.searchindexer.conf.ConstKt.*;

import de.smbonline.searchindexer.conf.CsvConfig;
import de.smbonline.searchindexer.dto.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public final class CsvTransformer {
    private final CsvConfig config;
    private static CsvTransformer INSTANCE;

    @Autowired
    public CsvTransformer(final CsvConfig config) {
        this.config = config;
        INSTANCE = this; // TODO implement proper singleton pattern
    }

    public static CsvTransformer getInstance() {
        return INSTANCE;
    }

    public File transform(final Data data) throws IOException {
        File file = new File(System.getProperty("java.io.tmpdir") + "tmp.csv");
        try (FileWriter fileWriter = new FileWriter(file, StandardCharsets.UTF_8)) {
            fileWriter.append(createHeader());
            for (String attribute : getALL_RELEVANT_ATTRIBUTES()) {
                transformAttribute(data, fileWriter, attribute);
            }
            fileWriter.flush();
        }
        return file;
    }

    private void transformAttribute(final Data data, final FileWriter fileWriter, final String attribute) throws IOException {
        Object value = data.getAttribute(attribute);
        if (value == null) {
            value = "";
        }
        String columnValue;
        if (value instanceof Collection) {
            columnValue = transformCollection((Collection<?>) value);
        } else if (value instanceof Data) {
            String formattedValue = ((Data) value).getTypedAttribute(FORMATTED_VALUE_ATTRIBUTE);
            columnValue = formattedValue != null ? formattedValue : value.toString();
        } else {
            columnValue = value.toString();
        }
        columnValue = escape(columnValue, "\n", this.config.separator);
        fileWriter.append(columnValue).append(this.config.separator);
    }

    private String transformCollection(final Collection<?> value) {
        StringBuilder sb = new StringBuilder();
        for (Iterator<?> iterator = value.iterator(); iterator.hasNext(); ) {
            sb.append(escape(iterator.next().toString(), this.config.inlineSeparator));
            if (iterator.hasNext()) {
                sb.append(this.config.inlineSeparator);
            }
        }
        return sb.toString();
    }

    private static String escape(final String value, final String... charactersToEscape) {
        return Arrays.stream(charactersToEscape).anyMatch(value::contains)
                ? StringUtils.wrap(value, '"') : value;
    }

    public String createHeader() {
        StringBuilder sb = new StringBuilder();
        Arrays.stream(getALL_RELEVANT_ATTRIBUTES())
                .forEach(attribute -> sb.append(attribute).append(this.config.separator));
        sb.append(System.lineSeparator());
        return sb.toString();
    }
}
