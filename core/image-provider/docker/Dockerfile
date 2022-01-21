FROM nginx:1.21
LABEL maintainer="Xailabs<it-support@xailabs.de>"

RUN apt-get update && apt-get install -y nginx-extras apache2-utils
RUN mkdir -p /data/nginx/cache
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]