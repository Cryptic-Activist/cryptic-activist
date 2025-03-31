#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

# npm run generate

# Start the application
npm run start