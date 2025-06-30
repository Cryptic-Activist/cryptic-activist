# Stage 1: Install dependencies
FROM node:lts-alpine AS deps
WORKDIR /app

# Install dependencies (include lockfile for deterministic builds)
COPY frontend/admin/package.json frontend/admin/package-lock.json* ./
RUN npm ci

# Stage 2: Build the application
FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/admin/ .
COPY envs/prod.frontend-admin.env .env

# Set standalone output in next.config.js (or via env)
ENV NEXT_OUTPUT=standalone

# Build the app
RUN npm run build

# Stage 3: Production image
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN apk add curl

# Copy standalone build artifacts from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set permissions
USER nextjs

ENV PORT=3001
EXPOSE 3001

# Use Node.js to run the server (no 'serve' needed)
CMD ["sh", "-c", "PORT=$PORT node server.js"]