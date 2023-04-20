import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.sonarqube") version "3.5.0.2730"
	id("org.springframework.boot") version "2.7.0"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	id("com.apollographql.apollo") version "2.5.14"
	kotlin("jvm") version "1.6.20"
	kotlin("plugin.spring") version "1.6.20"
}

description = "Webhook implementation for Hasura authentication."
group = "com.xailabs.microservices"
version = "2.0.0"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

apollo {
	generateKotlinModels.set(true)
	generateOperationOutput.set(true)
	rootPackageName.set("com.xailabs.microservices.hasura.auth.graphql.queries")
	schemaFile.set(file("src/main/graphql/schema.graphql"))
	graphqlSourceDirectorySet.srcDir("src/main/graphql")
	graphqlSourceDirectorySet.include("**/*.graphql")
	graphqlSourceDirectorySet.exclude("**/schema.graphql")
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-aop")
	implementation("org.mindrot:jbcrypt:0.4")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
	implementation("javax.validation:validation-api:2.0.1.Final")
	implementation("com.apollographql.apollo:apollo-runtime:2.5.14")
	implementation("com.apollographql.apollo:apollo-coroutines-support:2.5.14")
	implementation("com.apollographql.apollo:apollo-rx3-support:2.5.14")
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}
}

sonarqube {
	properties {
		property("sonar.projectName", "SMB :: Hasura Auth")
		property("sonar.projectKey", "SMB:hasura-auth")
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
