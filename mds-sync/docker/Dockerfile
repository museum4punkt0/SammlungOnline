# Build Container
# ------------------------------------

FROM reg-smb.xaidev.net/xailabs/openjdk:17-slim as builder
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

WORKDIR /opt/mds-sync
COPY . .
RUN ./gradlew bootWar


# Runnable Container
# ------------------------------------

FROM reg-smb.xaidev.net/xailabs/openjdk:17-slim as server
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

WORKDIR /opt/mds-sync
COPY --from=builder /opt/mds-sync/build/libs/mds-sync* ./mds-sync.war
ENTRYPOINT ["java", "-Xms256m", "-Xmx6656m", "-Duser.timezone=Europe/Berlin", "-Dfile.encoding=UTF-8", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/opt/mds-sync/mds-sync.war"]