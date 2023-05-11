FROM node:lts as runtime

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm      

COPY files/api-chat-cryptic-activist.env /app/.env
COPY api-chat-cryptic-activist/. /app/.

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "dev"]