# Build Container
FROM openjdk:11.0.9-slim as builder
LABEL maintainer="Xailabs<it-support@xailabs.de>"

WORKDIR /opt/smb-sitemap
COPY . .
RUN chmod +x gradlew
RUN ./gradlew bootJar

# Runnable Container
FROM openjdk:11.0.9-slim as server
LABEL maintainer="Xailabs<it-support@xailabs.de>"

WORKDIR /opt/smb-sitemap
COPY --from=builder /opt/smb-sitemap/build/libs/* ./smb-sitemap.jar
ENTRYPOINT ["java", "-Xms256m", "-Xmx2048m", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/smb-sitemap/smb-sitemap.jar"]