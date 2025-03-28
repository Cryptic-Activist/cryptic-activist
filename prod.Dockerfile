# syntax=docker/dockerfile:1

##############################
# Build Stage: Compile the repo
##############################
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the root package files and the Turbo configuration
COPY package.json package-lock.json turbo.json ./

# Copy the entire monorepo into the container
# (adjust the COPY commands if your structure differs)
COPY backend ./backend
COPY frontend ./frontend
COPY libraries ./libraries

# Install all dependencies across the monorepo
RUN npm ci

# Run the build for all projects using Turborepo
RUN npx turbo run build

##############################
# Backend Image
##############################
FROM node:18-alpine AS backend
WORKDIR /app

# Copy the built backend and required libraries from the builder
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/libraries ./libraries
COPY --from=builder /app/package.json ./package.json

# Change directory to the backend folder
WORKDIR /app/backend

# Expose the port (adjust if necessary)
EXPOSE 5000

# Start the backend (assumes a "start" script exists)
CMD ["npm", "start"]

##############################
# Public (Next.js Main Website) Image
##############################
FROM node:18-alpine AS public
WORKDIR /app

# Copy the built public app from the builder
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/package.json ./package.json

# Change directory to the public Next.js app
WORKDIR /app/frontend/public

# Expose the Next.js port (default is 3000)
EXPOSE 3000

# Start the Next.js app (assumes a "start" script that runs "next start")
CMD ["npm", "start"]

##############################
# Admin (Next.js Admin App) Image
##############################
FROM node:18-alpine AS admin
WORKDIR /app

# Copy the built admin app from the builder
COPY --from=builder /app/frontend/admin ./frontend/admin
COPY --from=builder /app/package.json ./package.json

# Change directory to the admin Next.js app
WORKDIR /app/frontend/admin

# Expose a port for the admin interface (adjust as needed)
EXPOSE 3001

# Start the admin app
CMD ["npm", "start"]
