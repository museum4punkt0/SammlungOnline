package de.smbonline.mdssync.dto

/**
 * Describes an Attribute plus translated value for an Object. The language property is optional if
 * instance is used in context of an ObjectDto - in this case ObjectDto.language is preferred.
 * <p>
 * <b>IMPORTANT:</b> If ObjectDto.language is set, AttributeDto.language must not specify a different language (but can be null).
 * If ObjectDto.language and AttributeDto.language differ, unpredictable data inconsistency may occur.
 */
class AttributeValue {

    lateinit var key: String
    lateinit var fqKey: String
    lateinit var datatype: String // TODO make enum
    var value: String? = null
    var language: String? = null
    var visible = false

    override fun toString(): String = "Attribute{fqKey:$fqKey, key:$key, value:$value, language:$language}";
}