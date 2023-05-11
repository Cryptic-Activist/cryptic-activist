FROM node:lts as runtime

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm      

COPY files/trade-api.env /app/.env
COPY trade-api/. /app/.

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=5004
EXPOSE 5004

CMD ["npm", "dev"]