# Build Container
FROM reg-smb.xaidev.net/xailabs/openjdk:17-slim as builder
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

WORKDIR /opt/smb-sitemap
COPY . .
RUN chmod +x gradlew
RUN ./gradlew bootJar

# Runnable Container
FROM reg-smb.xaidev.net/xailabs/openjdk:17-slim as server
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

WORKDIR /opt/smb-sitemap
COPY --from=builder /opt/smb-sitemap/build/libs/* ./smb-sitemap.jar
ENTRYPOINT ["java", "-Xms512m", "-Xmx1024m", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/smb-sitemap/smb-sitemap.jar"]
