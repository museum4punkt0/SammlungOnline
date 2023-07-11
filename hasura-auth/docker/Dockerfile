# Build Container
FROM reg-smb.xaidev.net/xailabs/openjdk:17-slim as builder
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

WORKDIR /opt/hasura-auth
COPY . .
RUN sed -i -e 's/\r$//' ./gradlew
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

# Runnable Container
FROM reg-smb.xaidev.net/xailabs/openjdk:17-slim as server
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

WORKDIR /opt/hasura-auth
COPY --from=builder /opt/hasura-auth/build/libs/hasura-auth* ./hasura-auth.jar
ENTRYPOINT ["java", "-Xms256m", "-Xmx512m", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/hasura-auth/hasura-auth.jar"]