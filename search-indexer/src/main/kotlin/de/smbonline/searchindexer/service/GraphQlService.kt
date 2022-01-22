package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.GraphQlAPI
import de.smbonline.searchindexer.conf.ALL_RELEVANT_ATTRIBUTES
import de.smbonline.searchindexer.conf.ID_ATTRIBUTE
import de.smbonline.searchindexer.dto.SearchObject
import de.smbonline.searchindexer.graphql.queries.fragment.ObjectData
import de.smbonline.searchindexer.norm.NormalizerRegistry
import kotlinx.coroutines.runBlocking
import org.apache.commons.lang3.NotImplementedException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class GraphQlService @Autowired constructor(
        private val graphQlAPI: GraphQlAPI,
        private val registry: NormalizerRegistry
) {

    fun fetchObjectIds(startId: Long?, endId: Long?, offset: Int, limit: Int): Array<out Long> {
        var result: Array<Long>
        runBlocking {
            result = graphQlAPI.fetchObjectIds(startId ?: 0, endId ?: Long.MAX_VALUE, offset, limit)
        }
        return result
    }

    /**
     * Loads an Object from the database and transforms it into Data DTO.
     * @param id id of requested Object
     * @param language requested language of attribute values
     * @return Data DTO representing requested object
     */
    fun resolveObjectById(id: Long, language: String): SearchObject? {
        var result: SearchObject? = null
        runBlocking {
            // if object doesn't exist, there is nothing we can do
            if (!graphQlAPI.existsObject(id)) {
                return@runBlocking
            }
            // load the requested object
            val obj = graphQlAPI.loadObject(id, language)!!
            // transform it
            result = transformObject(obj, language)
        }
        return result
    }

    private fun transformObject(data: ObjectData, language: String): SearchObject {
        // prepare the DTO
        val obj = SearchObject((data.id as Number).toLong(), language)
        // set some info
        obj.attributes.setAttribute("@$ID_ATTRIBUTE", data.id.toString())
        obj.attributes.setAttribute("@initialImport", data.createdAt)
        obj.attributes.setAttribute("@lastSynced", data.updatedAt)
        // loop over the attribute definitions
        for (attrKey in ALL_RELEVANT_ATTRIBUTES) {
            val normalizer = registry.getNormalizer(attrKey)
            normalizer ?: throw NotImplementedException(
                    "no normalizer registered for attribute $attrKey",
                    "https://collaboration.xailabs.com/wiki/pages/viewpage.action?pageId=49284395")
            val value = normalizer.resolveAttributeValue(data)
            obj.attributes.setNonNullAttribute(attrKey, value)
        }
        return obj
    }
}