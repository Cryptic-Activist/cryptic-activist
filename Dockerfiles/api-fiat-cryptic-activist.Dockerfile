FROM node:lts as runtime

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm      

# COPY files/fiat-api.env /app/.env
# COPY fiat-api/. /app/.

# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# RUN npm install

# RUN npm run build

# ENV HOST=0.0.0.0
# ENV PORT=5002
# EXPOSE 5002

# CMD ["npm", "dev"]