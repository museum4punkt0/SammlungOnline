package de.smbonline.searchindexer.dto;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.lang.Nullable;

import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

// initial version copied from LDAP microservice (2020-11-19)

public class Data {

    private final Map<String, Object> attributes;

    /**
     * Creates a new {@code Data} instance.
     */
    @JsonCreator
    public Data() {
        // use LinkedHashMap to keep order
        this.attributes = new LinkedHashMap<>();
    }

    /**
     * Converts a map to a Data instance.
     *
     * @param map source map
     * @return converted object
     */
    public static Data fromMap(final Map<String, ?> map) {
        Data obj = new Data();
        for (Map.Entry<String, ?> entry : map.entrySet()) {
            obj.setAttribute(entry.getKey(), entry.getValue());
        }
        return obj;
    }

    // use dedicated converter in here
    private static final ObjectMapper JSON_HELPER = new ObjectMapper();

    /**
     * Adds/Sets an attribute with given name and value.
     *
     * @param attribute attribute name
     * @param value     attribute value
     * @return this
     */
    @SuppressWarnings("unchecked")
    @JsonAnySetter
    public Data setAttribute(final String attribute, final @Nullable Object value) {
        Object attrValue = value;
        // Recursively use Data objects instead of map-like type.
        if (value instanceof Map) {
            attrValue = fromMap((Map<String, ?>) value);
        }
        if (value instanceof Collection) {
            Collection<?> values = (Collection<?>) value;
            if (!values.isEmpty()) {
                Object firstValue = values.iterator().next();
                if (firstValue instanceof Map) {
                    Set<Data> attrValues = new LinkedHashSet<>();
                    for (Map<String, ?> nested : (Collection<Map<String, ?>>) values) {
                        attrValues.add(fromMap(nested));
                    }
                    attrValue = attrValues;
                }
            }
        }
        this.attributes.put(attribute, attrValue);
        return this;
    }

    /**
     * Adds/Sets an attribute with given name and value if the value is not {@code null}. If value
     * is {@code null} a potentially earlier added attribute with the same name is removed.
     *
     * @param attribute attribute name
     * @param value     attribute value
     * @return this
     */
    public Data setNonNullAttribute(final String attribute, final @Nullable Object value) {
        return value == null ? removeAttribute(attribute) : setAttribute(attribute, value);
    }

    /**
     * Removes an attribute with given name.
     *
     * @param attribute attribute name
     * @return this
     */
    public Data removeAttribute(final String attribute) {
        this.attributes.remove(attribute);
        return this;
    }

    /**
     * Returns all attributes.
     *
     * @return all attributes, attribute values mapped to attribute names
     */
    @JsonAnyGetter
    public Map<String, Object> getAttributes() {
        return Collections.unmodifiableMap(this.attributes);
    }

    /**
     * Whether attributes exist in this object.
     *
     * @return whether attributes exist
     */
    public boolean hasAttributes() {
        return !this.attributes.isEmpty();
    }

    /**
     * Checks whether the given attribute is set. This is to distinguish whether the attribute is
     * not existent or the value is <code>null</code>.
     *
     * @param attribute attribute to check for existence
     * @return true if attribute is specified in DTO
     */
    public boolean hasAttribute(final String attribute) {
        return this.attributes.containsKey(attribute);
    }

    /**
     * Returns the value of the specified attribute. Returns <code>null</code> when the attribute is
     * not defined and when the attribute value is actually <code>null</code>. Use
     * {@link #hasAttribute(String)} to distinguish between both cases.
     *
     * @param attribute attribute name
     * @return attribute value
     */
    public @Nullable Object getAttribute(final String attribute) {
        return getTypedAttribute(attribute);
    }

    /**
     * Returns the value of the specified attribute.
     * <p>
     * <b>Developer note:</b> Be sure you know the concrete Java type of the attribute's value when
     * you use this method.
     *
     * @param attribute attribute name
     * @return attribute value
     */
    @SuppressWarnings("unchecked")
    public @Nullable <T> T getTypedAttribute(final String attribute) {
        return (T) this.attributes.get(attribute);
    }

    /**
     * Returns the object specified by given path. Nested attributes must be separated by dot.
     *
     * @param attributePath path
     * @return value
     */
    public @Nullable Object getNestedAttribute(final String attributePath) {
        return getNestedTypedAttribute(attributePath);
    }

    /**
     * Returns the object specified by given path. Nested attributes must be separated by dot.
     *
     * @param attributePath path
     * @return value
     */
    public @Nullable <T> T getNestedTypedAttribute(final String attributePath) {
        return getNestedTypedAttribute(attributePath, this);
    }

    @SuppressWarnings("unchecked")
    private static @Nullable <T> T getNestedTypedAttribute(final String attributePath, final Data dto) {
        int index = requireValidIndexOfSeparator(attributePath);
        if (index < 0) {
            return (T) dto.attributes.get(attributePath);
        }
        String attribute = attributePath.substring(0, index);
        Data child = (Data) dto.attributes.get(attribute);
        if (child == null) {
            return null;
        }
        return getNestedTypedAttribute(attributePath.substring(index + 1), child);
    }

    /**
     * Sets the value at the given path. Nested attributes must be separated by dot.
     *
     * @param attributePath path
     * @param value         the value
     * @return this
     */
    public Data setNestedAttribute(final String attributePath, final @Nullable Object value) {
        setNestedAttribute(attributePath, value, this);
        return this;
    }

    private static void setNestedAttribute(final String attributePath, final @Nullable Object value, final Data dto) {
        int index = requireValidIndexOfSeparator(attributePath);
        if (index < 0) {
            dto.attributes.put(attributePath, value);
            return;
        }
        String attribute = attributePath.substring(0, index);
        Data child = (Data) dto.attributes.get(attribute);
        if (child == null) {
            child = new Data();
            dto.attributes.put(attribute, child);
        }
        setNestedAttribute(attributePath.substring(index + 1), value, child);
    }

    private static int requireValidIndexOfSeparator(final String attributePath) {
        int index = attributePath.indexOf('.');
        if (index == 0) {
            throw new IllegalArgumentException("Attribute path must not start with dot - " + attributePath);
        }
        return index;
    }

    /**
     * @see Object#toString()
     */
    @Override
    public String toString() {
        return toJsonSuppressExceptions(this);
    }

    /**
     * Create a JSON string from the given object. Returns a json string with "error" attribute if
     * writing given object fails.
     *
     * @param obj json object
     * @return json string
     */
    public static String toJsonSuppressExceptions(final @Nullable Data obj) {
        try {
            return JSON_HELPER.writeValueAsString(obj);
        } catch (Exception exc) {
            return "{\"error\": \"" + exc.getMessage() + "\"}";
        }
    }
}
