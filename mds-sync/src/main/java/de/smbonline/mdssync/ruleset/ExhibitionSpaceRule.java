package de.smbonline.mdssync.ruleset;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.smbonline.mdssync.exc.ErrorHandling;
import de.smbonline.mdssync.jaxb.search.response.Field;
import de.smbonline.mdssync.jaxb.search.response.ModuleItem;
import de.smbonline.mdssync.jaxb.search.response.VocabularyReferenceItem;
import de.smbonline.mdssync.rest.Data;
import org.apache.commons.lang3.NotImplementedException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.Nullable;

import java.io.IOException;
import java.io.InputStream;
import java.util.Comparator;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static de.smbonline.mdssync.ruleset.Mappings.*;
import static de.smbonline.mdssync.util.Lookup.*;
import static de.smbonline.mdssync.util.MdsConstants.*;

public class ExhibitionSpaceRule implements TransformationRule<String> {

    public static final String SEPARATOR = " -> ";
    public static final String NO_DATA_AVAILABLE = ExhibitionState.UNKNOWN.name();

    private enum ExhibitionState {
        EXHIBITED, NOT_EXHIBITED, UNKNOWN
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(ExhibitionSpaceRule.class);
    private static final Data CONFIG = loadRuleConfig();

    private static Data loadRuleConfig() {
        try (InputStream stream = ExhibitionSpaceRule.class.getResourceAsStream("/exhibition-spaces.json")) {
            return new ObjectMapper().readValue(stream, Data.class);
        } catch (IOException exc) {
            ErrorHandling.capture(exc, "Can't load exhibition-spaces.json");
            return new Data();
        }
    }

    @Override
    public @Nullable String apply(final ModuleItem item) {
        String collectionKey = findCollectionKey(item);
        if (collectionKey == null) {
            LOGGER.warn("No collection key found for object {}", item.getId());
            return null;
        }
        Data config = CONFIG.getTypedAttribute(collectionKey);
        if (config == null) {
            LOGGER.warn("No config found for collection key {}", collectionKey);
            return null;
        }
        return createAttributeValue(item, config);
    }

    protected @Nullable String createAttributeValue(final ModuleItem source, final Data config) {
        String key = Objects.requireNonNull(config.getTypedAttribute("field"));
        String value = getAttributeValue(source, key);
        if (StringUtils.isBlank(value)) {
            return null;
        }
        // special but not very rare case: ObjCurrentLocationVoc points to ObjNormalLocationVoc (aktueller=ständiger Standort)
        String currentIsNormalRegExp = "^(" + config.getTypedAttribute("key") + "#+ *)?(([Aa]ktueller)? *=?|wie \"?) *[Ss]t(ä|ae)ndiger *Standort.*$";
        if (key.startsWith("ObjCurrentLocation") && value.matches(currentIsNormalRegExp)) {
            value = getAttributeValue(source, key.replace("Current", "Normal"));
        }
        return StringUtils.isBlank(value) ? null : createAttributeValue(value, config);
    }

    protected @Nullable String createAttributeValue(final String sourceValue, final Data config) {
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

    private String normalizeAttributeValue(final String sourceValue, final Data config) {
        String includes = config.getTypedAttribute("includes");
        assert includes != null; // checkWhitelisted succeeded already
        Pattern pattern = Pattern.compile(includes);
        Matcher matcher = pattern.matcher(sourceValue);
        boolean matches = matcher.matches();
        assert matches; // checkWhitelisted succeeded already

        String collection = config.getTypedAttribute("key");
        String building = config.hasAttribute("building") ? config.getTypedAttribute("building") : (includes.contains("<building>") ? StringUtils.defaultString(matcher.group("building")) : StringUtils.EMPTY);
        String sector = config.hasAttribute("sector") ? config.getTypedAttribute("sector") : (includes.contains("<sector>") ? StringUtils.defaultString(matcher.group("sector")) : StringUtils.EMPTY);
        String level = config.hasAttribute("level") ? config.getTypedAttribute("level") : (includes.contains("<level>") ? StringUtils.defaultString(matcher.group("level")) : StringUtils.EMPTY);
        String room = config.hasAttribute("room") ? config.getTypedAttribute("room") : (includes.contains("<room>") ? StringUtils.defaultString(matcher.group("room")) : StringUtils.EMPTY);
        String appendix = config.hasAttribute("appendix") ? config.getTypedAttribute("appendix") : (includes.contains("<appendix>") ? StringUtils.defaultString(matcher.group("appendix")) : StringUtils.EMPTY);

        LOGGER.debug("Extracted collection:'{}', building:'{}', sector:'{}', level:'{}', room:'{}', appendix:'{}' from '{}'",
                collection, building, sector, level, room, appendix, sourceValue);

        String normalized = String.join(SEPARATOR, collection, building, sector, level, room, appendix)
                .replaceAll("\\s{2,}", StringUtils.SPACE);
        return StringUtils.removeEnd(normalized, SEPARATOR); // if we don't have an appendix, we also don't need the last separator
    }

    private static ExhibitionState checkBlacklisted(final String sourceValue, final Data config) {
        String excludes = config.getTypedAttribute("excludes");
        if (excludes != null && sourceValue.matches(excludes)) {
            return ExhibitionState.NOT_EXHIBITED;
        }
        return ExhibitionState.UNKNOWN;
    }

    private static ExhibitionState checkWhitelisted(final String sourceValue, final Data config) {
        String includes = config.getTypedAttribute("includes");
        if (includes != null && sourceValue.matches(includes)) {
            return ExhibitionState.EXHIBITED;
        }
        return ExhibitionState.UNKNOWN;
    }

    private static @Nullable String findCollectionKey(final ModuleItem source) {
        String orgUnit = getAttributeValue(source, FIELD_ORG_UNIT);
        return orgUnit == null ? null : collectionMapping()
                .keySet()
                .stream()
                .filter(orgUnit::startsWith)
                .max(Comparator.comparingInt(String::length)) // longest match wins
                .orElse(null);
    }

    private static @Nullable String getAttributeValue(final ModuleItem source, final String attributeKey) {
        if (attributeKey.endsWith("Voc")) {
            VocabularyReferenceItem item = findVocRefItem(source.getVocabularyReference(), attributeKey);
            if (item != null) {
                return item.getName();
            }
        }

        Field field;
        if (attributeKey.endsWith("Vrt")) {
            field = findVrtField(source.getVirtualField(), attributeKey);
        } else if (attributeKey.startsWith("__")) {
            field = findSysField(source.getSystemField(), attributeKey);
        } else {
            field = findDataField(source.getDataField(), attributeKey);
        }
        return field == null ? null : field.getValue();
    }
}
