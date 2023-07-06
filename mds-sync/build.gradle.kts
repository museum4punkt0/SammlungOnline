import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.sonarqube") version "3.5.0.2730"
    id("org.springframework.boot") version "2.7.4"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("com.apollographql.apollo") version "2.5.14"
    id("jacoco")
    idea
    war
    kotlin("jvm") version "1.6.20"
    kotlin("plugin.spring") version "1.6.20"
}

description = "Sync for MDS objects, highlights and attachments."
group = "de.smb-online"
version = "2.5.55"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

apollo {
    generateKotlinModels.set(true)
    generateOperationOutput.set(true)
    rootPackageName.set("de.smbonline.mdssync.dataprocessor.graphql.queries")
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
    providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    // core utils and helper libraries
    implementation("org.apache.commons:commons-lang3")
    implementation("org.apache.httpcomponents:httpclient:4.5.14")
    implementation("org.imgscalr:imgscalr-lib:4.2")
    implementation("com.twelvemonkeys.imageio:imageio-jpeg:3.9.4") // better image support
    implementation("com.twelvemonkeys.imageio:imageio-tiff:3.9.4")
    implementation("io.sentry:sentry-spring-boot-starter:6.16.0")
    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("io.reactivex.rxjava3:rxkotlin:3.0.1")
    // jaxb
    implementation("javax.xml.bind:jaxb-api:2.3.1")
    implementation("org.glassfish.jaxb:jaxb-runtime:2.3.1")
    // apollo
    implementation("com.apollographql.apollo:apollo-runtime:2.5.14")
    implementation("com.apollographql.apollo:apollo-coroutines-support:2.5.14")
    implementation("com.apollographql.apollo:apollo-rx3-support:2.5.14")
    // web-dav
    implementation("com.github.lookfirst:sardine:5.10")
    // test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

sonarqube {
    properties {
        property("sonar.projectName", "SMB :: MDS-Sync")
        property("sonar.projectKey", "SMB:mds-sync")
        property("sonar.qualitygate.wait", true)
        property("sonar.sourceEncoding", "UTF-8")
        property("sonar.sources", "src/main/java, src/main/kotlin")
        property("sonar.exclusions", "src/main/java/de/smbonline/mdssync/jaxb/**/*.java")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
//    filter {
//        include("**/*Test.class")
//        exclude("**/*IT.class")
//    }
}

plugins.withType<JacocoPlugin> {
    tasks["test"].finalizedBy("jacocoTestReport")
}

tasks.jacocoTestReport {
    enabled = true
    reports {
        xml.required.set(true)
        csv.required.set(false)
        html.required.set(false)
    }
}

tasks.bootWar {
    enabled = true
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

