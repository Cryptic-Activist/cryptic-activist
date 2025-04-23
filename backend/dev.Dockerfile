FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npx prisma migrate dev

RUN npx prisma generate

CMD ["npm", "run", "dev"]