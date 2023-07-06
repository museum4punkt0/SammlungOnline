package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.conf.*
import de.smbonline.searchindexer.dto.Data
import de.smbonline.searchindexer.dto.SearchObject
import de.smbonline.searchindexer.graphql.queries.fragment.ExhibitionData
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData
import de.smbonline.searchindexer.graphql.queries.fragment.PersonData
import de.smbonline.searchindexer.norm.Normalizer
import de.smbonline.searchindexer.norm.NormalizerRegistry
import de.smbonline.searchindexer.norm.impl.shared.Resolvings
import de.smbonline.searchindexer.util.Dates
import org.apache.commons.lang3.NotImplementedException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.math.BigDecimal

@Component
class GraphQlDataResolver @Autowired constructor(
        private val service: GraphQlService,
        private val registry: NormalizerRegistry) {

    private companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(GraphQlDataResolver::class.java)
    }

    fun resolveThesaurus(id: Long, language: String): Data? {
        val thesaurus = service.fetchThesaurus(id) ?: return null
        return Data()
                .setNonNullAttribute(ID_ATTRIBUTE, id)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, Resolvings.resolveThesaurusLabel(service, id, language, true)?.trim())
                .setNonNullAttribute("type", thesaurus.type)
                .setNonNullAttribute("name", thesaurus.name)
                .setNonNullAttribute("parentId", thesaurus.parentId)
    }

    fun resolvePerson(id: Long, language: String): Data? {
        val person = service.fetchPerson(id) ?: return null
        return Data()
                .setNonNullAttribute(ID_ATTRIBUTE, person.id)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, formatPerson(person, language))
                .setNonNullAttribute("name", person.name)
                .setNonNullAttribute("dateOfBirth", formatDate(person.dateOfBirth, language))
                .setNonNullAttribute("dateOfDeath", formatDate(person.dateOfDeath, language))
    }
/*
    fun resolveGeographicalReference(id: Long, language: String): Data? {
        val geoRef = service.fetchGeographicalReference(id) ?: return null
        val type = geoRef.typeVocId?.let { resolveThesaurus((it as BigDecimal).longValueExact(), language) }
        val place = geoRef.placeVocId?.let { resolveThesaurus((it as BigDecimal).longValueExact(), language) }
        val geopol = geoRef.geopolVocId?.let { resolveThesaurus((it as BigDecimal).longValueExact(), language) }
        return Data()
                .setNonNullAttribute(ID_ATTRIBUTE, geoRef.id)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, formatGeoReference(type, place, geoRef.details, geopol))
                .setNonNullAttribute("details", geoRef.details)
                .setNonNullAttribute("type", type)
                .setNonNullAttribute("geopol", geopol)
                .setNonNullAttribute("place", place)
    }

    fun resolveMaterial(id: Long, language: String): Data? {
        val material = service.fetchMaterialAndTechnique(id) ?: return null
        val specificType = material.specificTypeVocId?.let { resolveThesaurus((it as BigDecimal).longValueExact(), language) }
        val type = material.typeVocId?.let { resolveThesaurus((it as BigDecimal).longValueExact(), language) }
        return Data()
                .setNonNullAttribute(ID_ATTRIBUTE, material.id)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, if (specificType != null) formatMaterial(specificType, type) else material.details)
                .setNonNullAttribute("details", material.details)
                .setNonNullAttribute("type", type)
                .setNonNullAttribute("specificType", specificType)
    }
*/
    fun resolveExhibition(id: Long, language: String): Data? {
        val exhibition = service.fetchExhibition(id) ?: return null
        return Data()
                .setNonNullAttribute(ID_ATTRIBUTE, exhibition.id)
                .setNonNullAttribute(FORMATTED_VALUE_ATTRIBUTE, formatExhibition(exhibition, language))
                .setNonNullAttribute("title", exhibition.title)
                .setNonNullAttribute("location", exhibition.location)
                .setNonNullAttribute("description", exhibition.description)
                .setNonNullAttribute("beginDate", formatDate(exhibition.startDate, language))
                .setNonNullAttribute("endDate", formatDate(exhibition.endDate, language))
    }

    fun resolveObjectAttributes(id: Long, language: String, fields: Array<String>): SearchObject? {
        val obj = service.fetchObject(id, language) ?: return null
        return transformObject(obj, language, fields)
    }

    /**
     * Loads an Object from the database and transforms it into Data DTO.
     * @param id id of requested Object
     * @param language requested language of attribute values
     * @return Data DTO representing requested object
     */
    fun resolveObjectById(id: Long, language: String): SearchObject? {
        val obj = service.fetchObject(id, language) ?: return null
        return transformObject(obj, language, ALL_RELEVANT_ATTRIBUTES)
    }

    private fun transformObject(data: ObjectData, language: String, fields: Array<String>): SearchObject {
        // prepare the DTO
        val obj = SearchObject((data.id as Number).toLong(), language)
        // set some info
        obj.setAttribute("@$ID_ATTRIBUTE", data.id.toString())
        obj.setAttribute("@initialImport", data.createdAt.toString())
        obj.setAttribute("@lastSynced", data.updatedAt.toString())
        if (fields.contains(DATE_RANGE_ATTRIBUTE)) {
            // in addition to date_range we need a scalar field we can sort on
            val fuzzyDate = data.attributes.firstOrNull { it.key == "ObjDateGrp.DatestampFromFuzzySearchLnu" }?.value?.toLong()
            obj.setNonNullAttribute(_ORIGINDATE, fuzzyDate)
        }
        // loop over the attribute definitions
        for (attrKey in fields) {
            val normalizer = registry.getNormalizer(attrKey) ?: throw NotImplementedException(
                    "no normalizer registered for attribute $attrKey",
                    "https://collaboration.xailabs.com/wiki/pages/viewpage.action?pageId=49284395")
            val value = if (hasApprovedAttributes(data, normalizer)) normalizer.resolveAttributeValue(data, language) else null
            obj.setNonNullAttribute(attrKey, value)
        }
        return obj
    }

    private fun hasApprovedAttributes(data: ObjectData, normalizer: Normalizer<*>): Boolean {
        val attributes = normalizer.relevantAttributeKeys;
        attributes.forEach {
            val approvedCollections = service.fetchApprovedCollectionKeys(it)
            if (approvedCollections.contains(data.collectionKey)) {
                return true
            }
        }
        LOGGER.debug("Attribute normalization ${normalizer.attributeKey} not approved for ${data.id} (collection: ${data.collectionKey})")
        return false
    }

    private fun formatPerson(person: PersonData, language: String): String? {
        if (person.name.isNullOrBlank()) {
            return null
        }
        val dateOfBirth = person.dateOfBirth?.let { formatDate(it, language) }
        val dateOfDeath = person.dateOfDeath?.let { formatDate(it, language) }
        return if (dateOfBirth == null && dateOfDeath == null) person.name
        else "${person.name.trim()} (${dateOfBirth ?: "?"}-${dateOfDeath ?: "?"})"
    }

    private fun formatExhibition(exhibition: ExhibitionData, language: String): String? {
        val baseData = arrayOf(exhibition.title, exhibition.location).filter { it.orEmpty().isNotBlank() }.joinToString(", ").ifEmpty { null }
        val startDate = exhibition.startDate?.let { formatDate(it, language) }
        val endDate = exhibition.endDate?.let { formatDate(it, language) }
        return if (startDate == null && endDate == null) baseData
        else {
            val prefix = if (baseData == null) "" else "$baseData, "
            "${prefix}${startDate ?: "?"}-${endDate ?: "?"}"
        }
    }

    private fun formatMaterial(specificType: Data, type: Data?): String? {
        return if (type == null) specificType.getTypedAttribute<String>(FORMATTED_VALUE_ATTRIBUTE)
        else "${type.getTypedAttribute<String>(FORMATTED_VALUE_ATTRIBUTE)}: ${specificType.getTypedAttribute<String>(FORMATTED_VALUE_ATTRIBUTE)}"
    }

    private fun formatGeoReference(type: Data?, place: Data?, details: String?, geopol: Data?): String? {

        val formattedType = type?.getTypedAttribute<String>(FORMATTED_VALUE_ATTRIBUTE)?.trim()
        val formattedPlace = place?.getTypedAttribute<String>(FORMATTED_VALUE_ATTRIBUTE)?.trim()
        val formattedDetails = details?.trim()
        val formattedGeopol = geopol?.getTypedAttribute<String>(FORMATTED_VALUE_ATTRIBUTE)?.trim()

        if (formattedPlace.isNullOrEmpty() && formattedDetails.isNullOrEmpty()) {
            return null
        }

        val sb = StringBuilder()
        formattedType?.let { sb.append(it).append(':') }
        formattedPlace?.let {
            sb.append(' ').append(it)
            formattedDetails?.let { sb.append(',') }
        }
        formattedDetails?.let { sb.append(' ').append(it) }
        formattedGeopol?.let {
            sb.append(' ').append('(').append(it).append(')')
        }
        return if (sb.isEmpty()) null else sb.toString().trim()
    }

    private fun formatDate(iso: String?, language: String): String? {
        return if (iso != null) Dates.formatDate(iso, language) else null
    }
}