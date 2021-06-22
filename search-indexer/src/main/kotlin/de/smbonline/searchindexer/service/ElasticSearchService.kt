package de.smbonline.searchindexer.service

import de.smbonline.searchindexer.api.ElasticSearchAPI
import de.smbonline.searchindexer.conf.COLLECTION_KEY_ATTRIBUTE
import de.smbonline.searchindexer.conf.DATE_RANGE_ATTRIBUTE
import de.smbonline.searchindexer.conf.ID_ATTRIBUTE
import de.smbonline.searchindexer.dto.Data
import de.smbonline.searchindexer.dto.JsonAttr.*
import de.smbonline.searchindexer.dto.Search
import de.smbonline.searchindexer.dto.SearchObject
import de.smbonline.searchindexer.dto.SearchSuggest
import de.smbonline.searchindexer.norm.impl.CollectionKeyNormalizer
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ElasticSearchService @Autowired constructor(val api: ElasticSearchAPI) {

    fun get(objectId: Long, language: String): SearchObject? {
        val data = api.pull(objectId, language)
        return if (data != null) transformObject(data, language) else null
    }

    fun push(searchObject: SearchObject): Data {
        return api.push(searchObject)
    }

    fun delete(objectId: Long): Data {
        return api.delete(objectId)
    }

    fun search(request: Search, language: String): Data {
        return api.search(request, language)
    }

    fun suggest(suggestion: SearchSuggest, language: String): Data {
        return api.suggest(suggestion, language);
    }

    private fun transformObject(data: Data, language: String): SearchObject {
        val obj = SearchObject(data.getTypedAttribute<Number>(ID_ATTRIBUTE)!!.toLong(), language)
        data.attributes.forEach { (key, value) -> obj.attributes.setAttribute(key, value) }
        return obj
    }
}