package de.smbonline.mdssync

import de.smbonline.mdssync.search.MdsApiConfig
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class MdsSyncApplicationTests {

	@Autowired
	var config: MdsApiConfig? = null

	@Test
	fun contextLoads() {
	}

	@Test
	fun mdsApiConfigLoaded() {
		assert(config != null)
		assert(config!!.baseUrl != null)
		assert(config!!.modulePathTemplate != null)
		if (config!!.auth!!.header == null) {
			assert(config!!.auth!!.user != null && config!!.auth!!.pass != null)
		}
	}
}
