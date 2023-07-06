import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.sonarqube") version "3.5.0.2730"
	id("org.springframework.boot") version "2.7.0"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	id("java")
	id("com.apollographql.apollo") version "2.5.14"
	kotlin("jvm") version "1.6.20"
	kotlin("plugin.spring") version "1.6.20"
}

description = "Service to create and host sitemap xmls."
group = "de.smb-online"
version = "2.5.55"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

apollo {
	generateKotlinModels.set(true)
	generateOperationOutput.set(true)
	rootPackageName.set("de.smbonline.sitemap.graphql.queries")
	schemaFile.set(file("src/main/graphql/schema.graphql"))
	graphqlSourceDirectorySet.srcDir("src/main/graphql")
	graphqlSourceDirectorySet.include("**/*.graphql")
	graphqlSourceDirectorySet.exclude("**/schema.graphql")
}

dependencies {
	// spring boot
	implementation("org.springframework.boot:spring-boot-starter-web")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	// jaxb
	implementation("javax.xml.bind:jaxb-api:2.3.1")
	implementation("org.glassfish.jaxb:jaxb-runtime:2.3.1")
	// utils
	implementation("org.apache.commons:commons-lang3")
	implementation("io.sentry:sentry-spring-boot-starter:6.10.0")
	// kotlin
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
	// apollo
	implementation("com.apollographql.apollo:apollo-runtime:2.5.14")
	implementation("com.apollographql.apollo:apollo-coroutines-support:2.5.14")
	implementation("com.apollographql.apollo:apollo-rx3-support:2.5.14")
}

sonarqube {
	properties {
		property("sonar.projectName", "SMB :: Sitemap")
		property("sonar.projectKey", "SMB:sitemap")
		property("sonar.qualitygate.wait", true)
		property("sonar.sourceEncoding", "UTF-8")
		property("sonar.sources", "src/main/java, src/main/kotlin")
		property("sonar.exclusions", "src/test/java/**, src/test/kotlin/**")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "17"
	}
}