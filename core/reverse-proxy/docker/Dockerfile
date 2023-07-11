FROM reg-smb.xaidev.net/xailabs/nginx:1.22
LABEL maintainer="xailabs-smb<it-support@xailabs.de>"

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]