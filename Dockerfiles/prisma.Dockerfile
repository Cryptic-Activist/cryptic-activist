FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 5555

RUN npx prisma generate

# RUN npx prisma migrate dev

CMD ["npm","run", "dev"]