FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]