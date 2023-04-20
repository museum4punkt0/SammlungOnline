package de.smbonline.searchindexer.conf

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "csv")
class CsvConfig {

    lateinit var separator: String
    lateinit var inlineSeparator: String

}
