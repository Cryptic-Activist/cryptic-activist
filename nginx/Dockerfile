FROM nginx:alpine

RUN apk add --no-cache \
    nginx \
    curl \
    certbot \
    certbot-nginx

EXPOSE 80

STOPSIGNAL SIGTERM

# CMD ["nginx", "-g", "daemon off;"]