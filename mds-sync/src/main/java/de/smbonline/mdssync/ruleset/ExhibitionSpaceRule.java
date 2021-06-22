package de.smbonline.mdssync.ruleset;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.smbonline.mdssync.rest.Any;
import de.smbonline.mdssync.search.response.Field;
import de.smbonline.mdssync.search.response.ModuleItem;
import org.apache.commons.lang3.NotImplementedException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.io.IOException;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static de.smbonline.mdssync.ruleset.Mappings.*;
import static de.smbonline.mdssync.util.Lookup.*;

public class ExhibitionSpaceRule implements TransformationRule {

    public static final String SEPARATOR = " -> ";
    public static final String NO_DATA_AVAILABLE = ExhibitionState.UNKNOWN.name();

    private enum ExhibitionState {
        EXHIBITED, NOT_EXHIBITED, UNKNOWN
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(ExhibitionSpaceRule.class);
    private static final Any CONFIG = loadRuleConfig();

    private static Any loadRuleConfig() {
        try (InputStream stream = ExhibitionSpaceRule.class.getResourceAsStream("/exhibition-spaces.json")) {
            return new ObjectMapper().readValue(stream, Any.class);
        } catch (IOException exc) {
            LOGGER.error("Can't load exhibition-spaces.json ", exc);
            return new Any();
        }
    }

    @Override
    public @Nullable String apply(final ModuleItem item) {
        String collectionKey = findCollectionKey(item);
        if (collectionKey == null) {
            LOGGER.warn("No collection key found for object {}", item.getId());
            return null;
        }
        Any config = CONFIG.getTypedAttribute(collectionKey);
        if (config == null) {
            LOGGER.warn("No config found for collection key {}", collectionKey);
            return null;
        }
        return createAttributeValue(item, config);
    }

    protected @Nullable String createAttributeValue(final ModuleItem source, final Any config) {
        String value = getAttributeValue(source, config.getTypedAttribute("field"));
        return StringUtils.isBlank(value) ? null : createAttributeValue(value, config);
    }

    protected @Nullable String createAttributeValue(final String sourceValue, final Any config) {
        ExhibitionState state = checkBlacklisted(sourceValue, config);
        if (state != ExhibitionState.NOT_EXHIBITED) {
            state = checkWhitelisted(sourceValue, config);
        }
        switch (state) {
            case UNKNOWN:
                return NO_DATA_AVAILABLE;
            case NOT_EXHIBITED:
                return null;
            case EXHIBITED:
                return normalizeAttributeValue(sourceValue, config);
            default:
                throw new NotImplementedException("ExhibitionState." + state.name() + " unhandled");
        }
    }

    private String normalizeAttributeValue(final String sourceValue, final Any config) {
        String includes = config.getTypedAttribute("includes");
        assert includes != null; // checkWhitelisted succeeded already
        Pattern pattern = Pattern.compile(includes);
        Matcher matcher = pattern.matcher(sourceValue);
        boolean matches = matcher.matches();
        assert matches; // checkWhitelisted succeeded already

        String collection = config.getTypedAttribute("key");
        String building = includes.contains("<building>") ? StringUtils.defaultString(matcher.group("building")) : StringUtils.EMPTY;
        String sector = includes.contains("<sector>") ? StringUtils.defaultString(matcher.group("sector")) : StringUtils.EMPTY;
        String level = includes.contains("<level>") ? StringUtils.defaultString(matcher.group("level")) : StringUtils.EMPTY;
        String room = includes.contains("<room>") ? StringUtils.defaultString(matcher.group("room")) : StringUtils.EMPTY;
        String appendix = includes.contains("<appendix>") ? matcher.group("appendix") : StringUtils.EMPTY;
        LOGGER.debug("Extracted collection:'{}', building:'{}', sector::'{}', level:'{}', room:'{}', appendix:'{}' from '{}'",
                collection, building, sector, level, room, appendix, sourceValue);

        return String.join(SEPARATOR, collection, building, sector, level, room, appendix)
                .replaceAll("\\s{2,}", StringUtils.SPACE);
    }

    private static ExhibitionState checkBlacklisted(final String sourceValue, final Any config) {
        String excludes = config.getTypedAttribute("excludes");
        if (excludes != null && sourceValue.matches(excludes)) {
            return ExhibitionState.NOT_EXHIBITED;
        }
        return ExhibitionState.UNKNOWN;
    }

    private static ExhibitionState checkWhitelisted(final String sourceValue, final Any config) {
        String includes = config.getTypedAttribute("includes");
        if (includes != null && sourceValue.matches(includes)) {
            return ExhibitionState.EXHIBITED;
        }
        return ExhibitionState.UNKNOWN;
    }

    private static @Nullable String findCollectionKey(final ModuleItem source) {
        String orgUnit = getAttributeValue(source, "__orgUnit");
        return orgUnit == null ? null : COLLECTION_MAPPING
                .keySet()
                .stream()
                .filter(orgUnit::startsWith)
                .findFirst()
                .orElse(null);
    }

    private static @Nullable String getAttributeValue(final ModuleItem source, final String attributeKey) {
        Field field;
        if (attributeKey.endsWith("Vrt")) {
            field = findOne(source.getVirtualField(), f -> attributeKey.equals(f.getName()));
        } else if (attributeKey.startsWith("__")) {
            field = findOne(source.getSystemField(), f -> attributeKey.equals(f.getName()));
        } else {
            field = findOne(source.getDataField(), f -> attributeKey.equals(f.getName()));
        }
        return field == null ? null : field.getValue();
    }
}
