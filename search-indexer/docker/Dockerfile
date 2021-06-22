# Build Container
FROM openjdk:11.0.9-slim as builder
LABEL maintainer="xailabs<it-support@xailabs.de>"

WORKDIR /opt/search-indexer
COPY . .
RUN sed -i -e 's/\r$//' ./gradlew
RUN chmod +x gradlew
RUN ./gradlew bootWar

# Runnable Container
FROM openjdk:11.0.9-slim as server
LABEL maintainer="xailabs<it-support@xailabs.de>"

WORKDIR /opt/search-indexer
COPY --from=builder /opt/search-indexer/build/libs/search-indexer* ./search-indexer.war
ENTRYPOINT ["java", "-Xms128m", "-Xmx512m", "-XX:+HeapDumpOnOutOfMemoryError", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/search-indexer/search-indexer.war"]