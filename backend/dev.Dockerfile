FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json ./

RUN rm -rf node_modules package-lock.json && npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]