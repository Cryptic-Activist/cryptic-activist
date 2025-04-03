FROM node:lts-alpine AS base
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache openssl

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies stage
FROM base AS dependencies
RUN npm install

# Build stage
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY backend .
COPY libraries/base-ca ./libraries/base-ca
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

# Copy only production-necessary files
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Copy Prisma schema from base-ca library
COPY libraries/base-ca/prisma ./prisma
COPY libraries/base-ca/prisma/schema.prisma ./prisma/schema.prisma

# Copy local libraries
COPY libraries/base-ca ./libraries/base-ca
COPY libraries/cryptic-utils ./libraries/cryptic-utils

# Set environment to production
ENV NODE_ENV=production

# Add entrypoint script
COPY backend/entrypoint.sh /entrypoint.sh
COPY envs/backend.env dist/.env
COPY envs/base-ca.env libraries/base-ca/.env
COPY envs/base-ca.env libraries/base-ca/dist/.env

RUN npm run build:base-ca 
RUN npm run build:cryptic-utils 
RUN chmod +x /entrypoint.sh

# Expose the application port
EXPOSE 5000

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]