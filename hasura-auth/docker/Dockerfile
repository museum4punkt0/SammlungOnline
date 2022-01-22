# Build Container
FROM openjdk:14.0.2-slim as builder
LABEL maintainer="Xailabs<it-support@xailabs.de>"

WORKDIR /opt/hasura-auth
COPY . .
RUN sed -i 's/\r$//' gradlew
RUN chmod +x gradlew
RUN ./gradlew bootJar

# Runnable Container
FROM openjdk:14.0.2-slim as server
LABEL maintainer="Xailabs<it-support@xailabs.de>"

WORKDIR /opt/hasura-auth
COPY --from=builder /opt/hasura-auth/build/libs/hasura-auth* ./hasura-auth.jar
ENTRYPOINT ["java", "-Xms256m", "-Xmx2048m", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/hasura-auth/hasura-auth.jar"]