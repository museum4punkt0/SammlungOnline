FROM reg.xailabs.dev/xailabs/nginx:1.23
LABEL maintainer="Xailabs<it-support@xailabs.de>"

RUN apt-get update && apt-get install -y nginx-extras apache2-utils logrotate

RUN mkdir -p /data/nginx/cache
RUN chown nginx:nginx /data/nginx/cache

RUN mkdir -p /usr/share/nginx/html/images/restricted
RUN chown -R nginx:nginx /usr/share/nginx/html/images

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
