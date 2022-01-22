# Development container
# ---------------------

FROM node:14-alpine

WORKDIR /opt/topics

# install node_modules
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY ./docker/docker_entrypoint.sh /docker_entrypoint.sh
# see .dockerignore for excludes
COPY ./ ./
ENV PORT 80
ENV PUBLIC_URL /

CMD /docker_entrypoint.sh
