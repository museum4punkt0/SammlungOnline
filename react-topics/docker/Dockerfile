# Development container
FROM node:12.16-alpine

WORKDIR /opt/topics

# install node_modules
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN npm config set @bit:registry https://node.bit.dev \
    && yarn install

COPY ./docker/docker_entrypoint.sh /docker_entrypoint.sh

# see .dockerignore for excludes
COPY ./ ./
ENV PORT 80
ENV PUBLIC_URL /

CMD /docker_entrypoint.sh
