# Build Container
FROM openjdk:11.0.9-slim as builder
LABEL maintainer="xailabs<it-support@xailabs.de>"

WORKDIR /opt/mds-sync
COPY . .
RUN ./gradlew bootWar

# Runnable Container
FROM openjdk:11.0.9-slim as server
LABEL maintainer="xailabs<it-support@xailabs.de>"

WORKDIR /opt/mds-sync
COPY --from=builder /opt/mds-sync/build/libs/mds-sync* ./mds-sync.war
ENTRYPOINT ["java", "-Xms256m", "-Xmx2048m", "-XX:+HeapDumpOnOutOfMemoryError", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/mds-sync/mds-sync.war"]