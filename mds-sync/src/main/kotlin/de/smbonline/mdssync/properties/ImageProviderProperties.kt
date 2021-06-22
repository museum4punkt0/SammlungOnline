package de.smbonline.mdssync.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "image-provider")
class ImageProviderProperties {

    lateinit var baseUrl: String
    lateinit var user: String
    lateinit var pass: String

}