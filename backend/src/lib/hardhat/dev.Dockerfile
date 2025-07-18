FROM node:18

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_OPTIONS=--max_old_space_size=4096

EXPOSE 8545

CMD ["npm", "run", "dev"]