package de.smbonline.mdssync.dataprocessor.repository

import com.github.sardine.Sardine
import com.github.sardine.SardineFactory
import de.smbonline.mdssync.exc.SyncFailedException
import de.smbonline.mdssync.properties.ImageProcessingProperties
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.io.IOException
import java.net.URL
import javax.annotation.PostConstruct

@Repository
class ImageWebDavRepository @Autowired constructor(val config: ImageProcessingProperties) {

    private val sardine: Sardine = SardineFactory.begin()
    private var baseUrl: String = ""

    @PostConstruct
    private final fun init() {
        initBaseUrl()
        initSardine()
    }

    private final fun initSardine() {
        sardine.apply {
            setCredentials(config.user, config.pass)
            enablePreemptiveAuthentication(URL(baseUrl))
            enableCompression()
            ignoreCookies()
        }
    }

    private final fun initBaseUrl() {
        baseUrl = config.baseUrl
        if (!baseUrl.endsWith("/")) {
            baseUrl = baseUrl.plus("/")
        }
    }

    fun exists(filepath: String): Boolean {
        return sardine.exists(toAbsoluteUrl(filepath))
    }

    fun insertOrUpdate(filepath: String, data: ByteArray) {
        write(filepath, data)
    }

    fun insert(filepath: String, data: ByteArray) {
        write(filepath, data)
    }

    fun update(filepath: String, data: ByteArray) {
        write(filepath, data)
    }

    fun delete(filepath: String) {
        val file = toAbsoluteUrl(filepath)
        if (sardine.exists(file)) {
            sardine.delete(file)
        }
    }

    private fun toAbsoluteUrl(filepath: String): String {
        val name = filepath.replace(" ", "", true)
        return baseUrl.plus(name)
    }

    private fun write(filepath: String, data: ByteArray) {
        try {
            val paths = filepath.split('/')
            if (paths.size > 1) {
                var parent = ""
                for (path in paths.subList(0, paths.size - 1)) {
                    val fullPath = "$parent$path/" // need to add a slash in the end of a location
                    if (!exists(fullPath)) {
                        sardine.createDirectory(toAbsoluteUrl(fullPath))
                    }
                    parent = fullPath
                }
            }
            sardine.put(toAbsoluteUrl(filepath), data)
        } catch (exc: IOException) {
            throw SyncFailedException("Unable to save file $filepath", exc)
        }
    }
}