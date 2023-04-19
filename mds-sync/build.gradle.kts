import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootWar

plugins {
    id("org.sonarqube") version "3.0"
    id("org.springframework.boot") version "2.3.1.RELEASE"
    id("io.spring.dependency-management") version "1.0.9.RELEASE"
    id("com.apollographql.apollo") version "2.2.1"
    id("jacoco")
    idea
    war
    kotlin("jvm") version "1.4.21"
    kotlin("plugin.spring") version "1.4.21"
}

description = "Sync for MDS objects, highlights and attachments."
group = "de.smb-online"
version = "1.5.0"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
    mavenCentral()
}

apollo {
    generateKotlinModels.set(true)
    generateOperationOutput.set(true)
    rootPackageName.set("de.smbonline.mdssync.dataprocessor.graphql.queries")
    schemaFile.set(file("src/main/graphql/schema.json"))
    graphqlSourceDirectorySet.srcDir("src/main/graphql/queries")
    graphqlSourceDirectorySet.include("**/*.graphql")
}

dependencies {
    // spring-boot
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-aop")
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    // annotations
    implementation("javax.validation:validation-api:2.0.1.Final")
    // core utils and helper libraries
    implementation("org.apache.commons:commons-lang3:3.11")
    implementation("org.apache.httpcomponents:httpclient:4.5.12")
    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("io.reactivex.rxjava3:rxkotlin:3.0.0")
    // jaxb
    implementation("javax.xml.bind:jaxb-api:2.3.1")
    implementation("org.glassfish.jaxb:jaxb-runtime:2.3.1")
    // apollo
    implementation("com.apollographql.apollo:apollo-runtime:2.2.1")
    implementation("com.apollographql.apollo:apollo-coroutines-support:2.2.1")
    implementation("com.apollographql.apollo:apollo-rx3-support:2.2.1")
    // web-dav
    implementation("com.github.lookfirst:sardine:5.10")
    // test
    testImplementation("org.junit.jupiter:junit-jupiter:5.6.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
        exclude(group = "org.junit.jupiter", module = "junit-jupiter")
    }
}

sonarqube {
    properties {
        property("sonar.projectName", "SMB :: mds-sync")
        property("sonar.host.url", "http://sonar.xailabs.local")
        property("sonar.sourceEncoding", "UTF-8")
        property("sonar.sources", "src/main/java,src/main/kotlin")
        property("sonar.exclusions", "src/main/java/de/smbonline/mdssync/search/request/*.java,src/main/java/de/smbonline/mdssync/search/response/*.java")
        property("sonar.junit.reportPaths", "build/test-results/test")
        property("sonar.jacoco.reportPaths", "build/test-results/testjacoco")
    }
}

jacoco {
    toolVersion = "0.8.7"
}

tasks.jacocoTestReport {
    reports {
        xml.required.set(true)
        csv.required.set(false)
        html.required.set(false)
    }
}

plugins.withType<JacocoPlugin> {
    tasks["test"].finalizedBy("jacocoTestReport")
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

tasks.getByName<BootWar>("bootWar") {
    enabled = true
}
