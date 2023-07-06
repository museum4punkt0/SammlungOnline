package de.smbonline.mdssync.dataprocessor.service

import com.twelvemonkeys.image.ImageConversionException
import de.smbonline.mdssync.dto.Media
import de.smbonline.mdssync.properties.ImageProcessingProperties
import org.imgscalr.Scalr
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.awt.Color
import java.awt.Graphics2D
import java.awt.image.BufferedImage
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

        val old = dto.toString()

        // if the image must not be stored, reset it and return early
        if (isBlocked(dto.mdsId)) {
            dto.base64 = ByteArray(0)
            LOGGER.debug("Cleared {}", old)
            return
        }

        // get source image
        val source = ImageIO.createImageInputStream(ByteArrayInputStream(dto.base64))
        var base = ImageIO.read(source) // closes stream
        var requiresUpdate = false

        // reduce size if required
        if (base.width > conf.maxDimensions || base.height > conf.maxDimensions) {
            requiresUpdate = true
            base = Scalr.resize(base, Scalr.Method.BALANCED, conf.maxDimensions)
        }

        // tiffs cannot be displayed in a web-browser - we need conversion
        if (dto.filePath.matches(REGEX_TIFF_SUFFIX)) {
            requiresUpdate = true
        }

        // if necessary, convert image and update data in DTO
        if (requiresUpdate) {
            if (base.colorModel.hasAlpha() || getBitDepth(base) > 8) {
                base = toRGB8(base)
            }
            val type = /*if (base.colorModel.hasAlpha()) "png" else*/ conf.defaultImageType
            ByteArrayOutputStream(1024).use {
                val ok = ImageIO.write(base, type, it)
                if (!ok) {
                    throw ImageConversionException("Image conversion failed for ${dto.mdsId}")
                }
                dto.base64 = it.toByteArray()
                dto.filePath = dto.filePath.substringBeforeLast('.').plus('.').plus(type)
            }
            LOGGER.debug("Converted {} to {}", old, dto)
        }
    }

    private fun isBlocked(id: Long): Boolean {
        // FIXME fetch from blocked_attachments
        return arrayOf(5802648L, 6545994L, 6548841L).contains(id)
    }

    private fun getBitDepth(img: BufferedImage): Int {
        // find the maximum bit depth across all channels
        return img.sampleModel.sampleSize.maxOf { it }
    }

    // inspired by https://github.com/rkalla/imgscalr/issues/82#issuecomment-11776976
    private fun toRGB8(img: BufferedImage): BufferedImage {
        val copy = BufferedImage(img.width, img.height, BufferedImage.TYPE_INT_RGB)
        val g2d: Graphics2D = copy.createGraphics()
        g2d.color = Color.WHITE // decide if WHITE or BLACK suits better
        g2d.fillRect(0, 0, copy.width, copy.height)
        g2d.drawImage(img, 0, 0, null)
        g2d.dispose()
        return copy
    }
}