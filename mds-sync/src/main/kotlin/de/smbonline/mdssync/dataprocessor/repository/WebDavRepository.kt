package de.smbonline.mdssync.dataprocessor.repository

import com.github.sardine.Sardine
import com.github.sardine.SardineFactory
import de.smbonline.mdssync.exc.SyncFailedException
import de.smbonline.mdssync.properties.ImageProviderProperties
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import java.io.IOException
import java.net.URL
import javax.annotation.PostConstruct

@Repository
class WebDavRepository {

    @Autowired
    private lateinit var imageProviderProperties: ImageProviderProperties

    private var sardine: Sardine = SardineFactory.begin()
    private var baseUrl: String = ""

    // region Init

    @PostConstruct
    private final fun init() {
        initBaseUrl()
        initSardine()
    }

    private final fun initSardine() {
        sardine.setCredentials(imageProviderProperties.user, imageProviderProperties.pass)
        sardine.enablePreemptiveAuthentication(URL(baseUrl))
        sardine.enableCompression()
        sardine.ignoreCookies()
    }

    private final fun initBaseUrl() {
        baseUrl = imageProviderProperties.baseUrl
        if (!baseUrl.endsWith("/")) {
            baseUrl = baseUrl.plus("/")
        }
    }

    // endregion

    fun exists(filename: String): Boolean {
        return sardine.exists(toAbsoluteUrl(filename))
    }

    fun insertOrUpdate(filename: String, data: ByteArray) {
        write(filename, data)
    }

    fun insert(filename: String, data: ByteArray) {
        write(filename, data)
    }

    fun update(filename: String, data: ByteArray) {
        write(filename, data)
    }

    fun delete(filename: String) {
        val file = toAbsoluteUrl(filename)
        if (sardine.exists(file)) {
            sardine.delete(file)
        }
    }

    private fun toAbsoluteUrl(filename: String): String {
        val name = filename.replace(" ", "", true)
        return baseUrl.plus(name)
    }

    private fun write(filename: String, data: ByteArray) {
        try {
            sardine.put(toAbsoluteUrl(filename), data)
        } catch (exc: IOException) {
            throw SyncFailedException("Unable to save file $filename", exc)
        }
    }
}