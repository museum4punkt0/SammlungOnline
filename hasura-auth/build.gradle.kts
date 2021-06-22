import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.3.2.RELEASE"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	id("com.apollographql.apollo") version "2.2.1"
	kotlin("jvm") version "1.3.72"
	kotlin("plugin.spring") version "1.3.72"
}

group = "com.xailabs.microservices"
version = "1.5.3"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

apollo {
	generateKotlinModels.set(true)
	generateOperationOutput.set(true)
	rootPackageName.set("com.xailabs.microservices.hasura.auth.graphql.queries")
	schemaFile.set(file("src/main/graphql/schema.json"))
	graphqlSourceDirectorySet.srcDir("src/main/graphql")
	graphqlSourceDirectorySet.include("**/*.graphql")
	graphqlSourceDirectorySet.exclude("**/schema.json.graphql")
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.springframework.boot:spring-boot-starter-aop")
	implementation("org.mindrot:jbcrypt:0.4")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.7")
	implementation("javax.validation:validation-api:2.0.1.Final")
	implementation("com.apollographql.apollo:apollo-runtime:2.2.1")
	implementation("com.apollographql.apollo:apollo-coroutines-support:2.2.1")
	implementation("com.apollographql.apollo:apollo-rx3-support:2.2.1")
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
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
