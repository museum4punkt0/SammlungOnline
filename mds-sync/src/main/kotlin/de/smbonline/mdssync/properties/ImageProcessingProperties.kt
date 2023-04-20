package de.smbonline.mdssync.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "image-processing")
class ImageProcessingProperties {

    lateinit var baseUrl: String
    lateinit var user: String
    lateinit var pass: String
    var maxDimensions: Int = 4000
    var defaultImageType: String = "jpg"
    var maxImagesPerObject: Int = 10

}