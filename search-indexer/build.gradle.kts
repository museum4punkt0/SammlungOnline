import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootWar

plugins {
    id("org.sonarqube") version "3.5.0.2730"
    id("org.springframework.boot") version "2.7.0"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("com.apollographql.apollo") version "2.5.14"
    war
    kotlin("jvm") version "1.6.20"
    kotlin("plugin.spring") version "1.6.20"
}

description = "Service to update elastic search index with objects and attributes."
group = "de.smb-online"
version = "2.5.55"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

apollo {
    generateKotlinModels.set(true)
    generateOperationOutput.set(true)
    rootPackageName.set("de.smbonline.searchindexer.graphql.queries")
    schemaFile.set(file("src/main/graphql/schema.graphql"))
    graphqlSourceDirectorySet.srcDir("src/main/graphql/queries")
    graphqlSourceDirectorySet.include("**/*.graphql")
}

dependencies {
    // spring-boot
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-aop")
    implementation("junit:junit:4.13.2")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    // core utils and helper libraries
    implementation("org.apache.commons:commons-lang3:3.12.0")
    implementation("com.google.guava:guava:31.1-jre")
    implementation("org.apache.commons:commons-text:1.10.0")
    implementation("io.sentry:sentry-spring-boot-starter:6.16.0")
    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
    implementation("io.reactivex.rxjava3:rxkotlin:3.0.1")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    // apollo
    implementation("com.apollographql.apollo:apollo-runtime:2.5.14")
    implementation("com.apollographql.apollo:apollo-coroutines-support:2.5.14")
    implementation("com.apollographql.apollo:apollo-rx3-support:2.5.14")
    // elasticsearch
    implementation("org.elasticsearch.client:elasticsearch-rest-client")
    implementation("org.elasticsearch.client:elasticsearch-rest-high-level-client")
    // test
    testImplementation("org.junit.jupiter:junit-jupiter:5.9.2")
    testImplementation("io.mockk:mockk:1.13.4")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
        exclude(group = "org.junit.jupiter", module = "junit-jupiter")
    }
}

sonarqube {
    properties {
        property("sonar.projectName", "SMB :: Search Indexer")
        property("sonar.projectKey", "SMB:search-indexer")
        property("sonar.qualitygate.wait", true)
        property("sonar.sourceEncoding", "UTF-8")
        property("sonar.sources", "src/main/java, src/main/kotlin")
        property("sonar.exclusions", "src/test/java/**, src/test/kotlin/**")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
//    filter {
//        include("**/*Test.class")
//        exclude("**/*IT.class")
//    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

tasks.getByName<BootWar>("bootWar") {
    enabled = true
}

