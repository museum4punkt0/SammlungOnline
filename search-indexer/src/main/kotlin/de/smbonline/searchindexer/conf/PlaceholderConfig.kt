package de.smbonline.searchindexer.conf

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties
class PlaceholderConfig {
    lateinit var placeholders: Map<String, String>
}