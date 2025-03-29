#
# 1) BUILD STAGE
#
FROM node:lts-alpine as build
WORKDIR /app

# Install any OS-level dependencies you need
RUN apk add --no-cache openssl

# Copy the entire monorepo so that the libraries folder is available
COPY . .

# 1A) Install and build the base-ca library
WORKDIR /app/libraries/base-ca
RUN npm install \
    && npm run generate \
    && npm run migrate \
    && npm run build

# 1B) Install and build the cryptic-utils library
WORKDIR /app/libraries/cryptic-utils
RUN npm install \
    && npm run build

# 1C) Now install and build the backend
WORKDIR /app/backend

# Important: since your backend/package.json has:
#  "base-ca": "file:./libraries/base-ca"
#  "cryptic-utils": "file:./libraries/cryptic-utils"
# NPM will symlink these local folders into node_modules.
# But we must have already built them, or `dist/index.js` won't exist.
RUN npm install
RUN npm run build

#
# 2) PRODUCTION STAGE
#
FROM node:lts-alpine as production
WORKDIR /app
RUN apk add --no-cache openssl

# Copy over the built artifacts from the build stage
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/package*.json ./
COPY --from=build /app/backend/node_modules ./node_modules

# Copy Prisma schema from the library if you need migrations at runtime
COPY --from=build /app/libraries/base-ca/prisma ./prisma

# Copy the backend entrypoint script
COPY --from=build /app/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
EXPOSE 5000
ENTRYPOINT ["/entrypoint.sh"]
