package de.smbonline.searchindexer.conf

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "normalizers")
class NormalizerConfig {
    var involvedPartiesWithExplicitRole: Boolean = false
    var locationSeparator:String = "/"
    var unknownExhibitionSpace:String = "UNKNOWN";
}
