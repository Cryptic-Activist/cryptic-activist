FROM node:lts-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies
COPY ./package.json ./package-lock.json* ./
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Install serve globally
RUN npm install -g serve

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy build artifacts
COPY --from=builder /app/out ./out
RUN chown -R nextjs:nodejs /app

# Set correct permissions
USER nextjs

EXPOSE 3001

# Serve the static files on port 3001
CMD ["serve", "-s", "out", "-l", "3001"]