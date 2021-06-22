FROM nginx:1.19-alpine-perl
LABEL maintainer="Xailabs<it-support@xailabs.de>"

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]