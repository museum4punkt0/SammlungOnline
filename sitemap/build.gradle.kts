import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.sonarqube") version "3.0"
	id("org.springframework.boot") version "2.4.0"
	id("io.spring.dependency-management") version "1.0.10.RELEASE"
	id("java")
	id("com.apollographql.apollo") version "2.2.1"
	kotlin("jvm") version "1.4.20"
	kotlin("plugin.spring") version "1.4.20"
}

description = "Service to create and host sitemap xmls."
group = "de.smb-online"
version = "2.0.0-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

apollo {
	generateKotlinModels.set(true)
	generateOperationOutput.set(true)
	rootPackageName.set("de.smbonline.sitemap.graphql.queries")
	schemaFile.set(file("src/main/graphql/schema.json"))
	graphqlSourceDirectorySet.srcDir("src/main/graphql")
	graphqlSourceDirectorySet.include("**/*.graphql")
	graphqlSourceDirectorySet.exclude("**/schema.*.graphql")
}

dependencies {
	// spring boot
	implementation("org.springframework.boot:spring-boot-starter-web")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	// jaxb
	implementation("org.glassfish.jaxb:jaxb-runtime")
	implementation("javax.xml.bind:jaxb-api")
	// utils
	implementation("org.apache.commons:commons-lang3")
	// kotlin
	implementation("org.jetbrains.kotlin:kotlin-reflect:1.4.20")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.4.20")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.1")
	implementation("io.reactivex.rxjava3:rxkotlin:3.0.1")
	// apollo
	implementation("com.apollographql.apollo:apollo-runtime:2.2.1")
	implementation("com.apollographql.apollo:apollo-coroutines-support:2.2.1")
	implementation("com.apollographql.apollo:apollo-rx3-support:2.2.1")
}

sonarqube {
	properties {
		property("sonar.projectName", "SMB :: sitemap")
		property("sonar.host.url", "http://sonar.xailabs.local")
		property("sonar.sourceEncoding", "UTF-8")
		property("sonar.sources", "src/main/java,src/main/kotlin")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

