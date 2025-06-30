FROM nginx:alpine

RUN apk add --no-cache curl certbot certbot-nginx gettext

EXPOSE 80 443

STOPSIGNAL SIGTERM



CMD ["nginx", "-g", "daemon off;"]