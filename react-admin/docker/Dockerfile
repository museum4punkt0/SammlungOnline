# Development container
FROM node:14-alpine

WORKDIR /opt/admin

# install node_modules
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install

COPY ./docker/docker_entrypoint.sh /docker_entrypoint.sh

# see .dockerignore for excludes
COPY ./ ./
ENV PORT 80
ENV PUBLIC_URL /

CMD /docker_entrypoint.sh
