##############################
# Build Stage: Compile the monorepo
##############################
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the root-level package files and Turbo configuration
COPY package.json package-lock.json turbo.json ./

# Copy the new folder structure
COPY apps ./apps
COPY packages ./packages

# Install dependencies for all workspaces
RUN npm ci

# Run Turborepo build to compile all projects (apps and packages)
RUN npx turbo run build

##############################
# Backend Image
##############################
FROM node:18-alpine AS backend
WORKDIR /app

# Copy built backend app and necessary packages from builder
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json ./package.json

# Change directory to backend
WORKDIR /app/apps/backend

# Expose the backend port (adjust as needed)
EXPOSE 5000

# Start the backend (assumes a "start" script exists)
CMD ["npm", "start"]

##############################
# Public (Main Next.js Website) Image
##############################
FROM node:18-alpine AS public
WORKDIR /app

# Copy built public app from builder
COPY --from=builder /app/apps/public ./apps/public
COPY --from=builder /app/package.json ./package.json

# Change directory to the public Next.js app
WORKDIR /app/apps/public

# Expose the Next.js port (default is 3000)
EXPOSE 3000

# Start the Next.js public app
CMD ["npm", "start"]

##############################
# Admin (Next.js Admin App) Image
##############################
FROM node:18-alpine AS admin
WORKDIR /app

# Copy built admin app from builder
COPY --from=builder /app/apps/admin ./apps/admin
COPY --from=builder /app/package.json ./package.json

# Change directory to the admin Next.js app
WORKDIR /app/apps/admin

# Expose a port for the admin interface (adjust as needed)
EXPOSE 3001

# Start the Next.js admin app
CMD ["npm", "start"]
