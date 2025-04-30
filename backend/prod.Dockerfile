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
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

# Copy only production-necessary files
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Copy Prisma schema from base-ca library
COPY backend/prisma ./prisma
COPY backend/prisma/schema.prisma ./prisma/schema.prisma

# Set environment to production
ENV NODE_ENV=production

# Add entrypoint script
COPY backend/prod.entrypoint.sh /entrypoint.sh
COPY envs/prod.backend.env dist/.env

RUN chmod +x backend/entrypoint.sh

RUN npx prisma generate

# Expose the application port
EXPOSE 5000

# Use entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
# CMD ["npm", "run", "start"]
