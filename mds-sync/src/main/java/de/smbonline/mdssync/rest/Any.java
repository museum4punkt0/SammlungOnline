package de.smbonline.mdssync.rest;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

// initial version copied from LDAP microservice (2020-08-27)

public class Any {

    private final Map<String, Object> data;

    /**
     * Creates a new {@code Generic} instance.
     */
    @JsonCreator
    public Any() {
        // use LinkedHashMap to keep order
        this.data = new LinkedHashMap<>();
    }

    /**
     * Converts a map to a Generic instance.
     *
     * @param map source map
     * @return converted object
     */
    public static @NotNull Any fromMap(final @NotNull Map<String, ?> map) {
        Any obj = new Any();
        for (Map.Entry<String, ?> entry : map.entrySet()) {
            obj.setAttribute(entry.getKey(), entry.getValue());
        }
        return obj;
    }

    // use dedicated converter in here
    private static final ObjectMapper JSON_HELPER = new ObjectMapper();

    /**
     * Create a generic object from given JSON string. Returns an object with "error" attribute if
     * parsing given string fails.
     *
     * @param json json string
     * @return Generic object
     */
    public static @NotNull Any fromJsonSuppressExceptions(final String json) {
        if (json == null) {
            return new Any();
        }
        try {
            return JSON_HELPER.readValue(json, Any.class);
        } catch (Exception exc) {
            return new Any().setAttribute("error", exc.getMessage());
        }
    }

    /**
     * Adds/Sets an attribute with given name and value.
     *
     * @param attribute attribute name
     * @param value     attribute value
     * @return this
     */
    @SuppressWarnings("unchecked")
    @JsonAnySetter
    public @NotNull Any setAttribute(final @NotNull String attribute, final Object value) {
        Object attrValue = value;
        // Recursively use Generic objects instead of map-like type.
        if (value instanceof Map) {
            attrValue = fromMap((Map<String, ?>) value);
        }
        if (value instanceof Collection) {
            Collection<?> values = (Collection<?>) value;
            if (!values.isEmpty()) {
                Object firstValue = values.iterator().next();
                if (firstValue instanceof Map) {
                    Set<Any> attrValues = new LinkedHashSet<>();
                    for (Map<String, ?> nested : (Collection<Map<String, ?>>) values) {
                        attrValues.add(fromMap(nested));
                    }
                    attrValue = attrValues;
                }
            }
        }
        this.data.put(attribute, attrValue);
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
    public @NotNull Any setNonNullAttribute(final @NotNull String attribute, final Object value) {
        return value == null ? removeAttribute(attribute) : setAttribute(attribute, value);
    }

    /**
     * Removes an attribute with given name.
     *
     * @param attribute attribute name
     * @return this
     */
    public @NotNull Any removeAttribute(final @NotNull String attribute) {
        this.data.remove(attribute);
        return this;
    }

    /**
     * Returns all attributes.
     *
     * @return all attributes, attribute values mapped to attribute names
     */
    @JsonAnyGetter
    public @NotNull Map<String, Object> getAttributes() {
        return Collections.unmodifiableMap(this.data);
    }

    /**
     * Whether attributes exist in this object.
     *
     * @return whether attributes exist
     */
    public boolean hasAttributes() {
        return !this.data.isEmpty();
    }

    /**
     * Checks whether the given attribute is set. This is to distinguish whether the attribute is
     * not existent or the value is <code>null</code>.
     *
     * @param attribute attribute to check for existence
     * @return true if attribute is specified in DTO
     */
    public boolean hasAttribute(final @NotNull String attribute) {
        return this.data.containsKey(attribute);
    }

    /**
     * Returns the value of the specified attribute. Returns <code>null</code> when the attribute is
     * not defined and when the attribute value is actually <code>null</code>. Use
     * {@link #hasAttribute(String)} to distinguish between both cases.
     *
     * @param attribute attribute name
     * @return attribute value
     */
    public Object getAttribute(final @NotNull String attribute) {
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
    public <T> T getTypedAttribute(final @NotNull String attribute) {
        return (T) this.data.get(attribute);
    }

    /**
     * Returns the object specified by given path. Nested attributes must be separated by dot.
     *
     * @param attributePath path
     * @return value
     */
    public Object getNestedAttribute(final @NotNull String attributePath) {
        return getNestedTypedAttribute(attributePath);
    }

    /**
     * Returns the object specified by given path. Nested attributes must be separated by dot.
     *
     * @param attributePath path
     * @return value
     */
    public <T> T getNestedTypedAttribute(final @NotNull String attributePath) {
        return getNestedTypedAttributeRecursive(attributePath, this);
    }

    @SuppressWarnings("unchecked")
    private static <T> T getNestedTypedAttributeRecursive(final @NotNull String attributePath, final @NotNull Any dto) {
        int index = requireValidIndexOfSeparator(attributePath);
        if (index < 0) {
            return (T) dto.data.get(attributePath);
        }
        String attribute = attributePath.substring(0, index);
        Any child = (Any) dto.data.get(attribute);
        if (child == null) {
            return null;
        }
        return getNestedTypedAttributeRecursive(attributePath.substring(index + 1), child);
    }

    /**
     * Sets the value at the given path. Nested attributes must be separated by dot.
     *
     * @param attributePath path
     * @param value         the value
     * @return this
     */
    public @NotNull Any setNestedAttribute(final @NotNull String attributePath, final Object value) {
        setNestedAttributeRecursive(attributePath, value, this);
        return this;
    }

    private static void setNestedAttributeRecursive(final @NotNull String attributePath, final Object value, final @NotNull Any dto) {
        int index = requireValidIndexOfSeparator(attributePath);
        if (index < 0) {
            dto.data.put(attributePath, value);
            return;
        }
        String attribute = attributePath.substring(0, index);
        Any child = (Any) dto.data.get(attribute);
        if (child == null) {
            child = new Any();
            dto.data.put(attribute, child);
        }
        setNestedAttributeRecursive(attributePath.substring(index + 1), value, child);
    }

    private static int requireValidIndexOfSeparator(final @NotNull String attributePath) {
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
    public @NotNull String toString() {
        return toJsonSuppressExceptions(this);
    }

    /**
     * Create a JSON string from the given object. Returns a json string with "error" attribute if
     * writing given object fails.
     *
     * @param obj json object
     * @return json string
     */
    public static String toJsonSuppressExceptions(final Any obj) {
        try {
            return JSON_HELPER.writeValueAsString(obj);
        } catch (Exception exc) {
            return "{\"error\": \"" + exc.getMessage() + "\"}";
        }
    }
}
