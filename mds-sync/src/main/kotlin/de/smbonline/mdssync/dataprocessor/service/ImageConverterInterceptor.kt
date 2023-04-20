package de.smbonline.mdssync.dataprocessor.service

import de.smbonline.mdssync.dto.Media
import de.smbonline.mdssync.properties.ImageProcessingProperties
import org.imgscalr.Scalr
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import javax.imageio.ImageIO

@Component
class ImageConverterInterceptor(val conf: ImageProcessingProperties) {

    private companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(ImageConverterInterceptor::class.java)
        val REGEX_TIFF_SUFFIX = Regex(".+\\.tif(f)?$", RegexOption.IGNORE_CASE)
    }

    fun intercept(dto: Media) {

        // get source image
        val old = dto.toString()
        val source = ImageIO.createImageInputStream(ByteArrayInputStream(dto.base64))
        var base = ImageIO.read(source) // closes stream
        var requiresUpdate = false

        // reduce size if required
        if (base.width > this.conf.maxDimensions || base.height > this.conf.maxDimensions) {
            requiresUpdate = true
            base = Scalr.resize(base, Scalr.Method.BALANCED, this.conf.maxDimensions)
        }

        // tiffs cannot be displayed in a web-browser - we need conversion
        if (dto.filePath.matches(REGEX_TIFF_SUFFIX)) {
            requiresUpdate = true
        }

        if (requiresUpdate) {
            // convert image - update data in DTO
            ByteArrayOutputStream(1024).use {
                ImageIO.write(base, this.conf.defaultImageType, it)
                dto.base64 = it.toByteArray()
                dto.filePath = dto.filePath.substringBeforeLast('.').plus('.').plus(this.conf.defaultImageType)
            }
            LOGGER.debug("Converted {} to {}", old, dto)
        }
    }
}