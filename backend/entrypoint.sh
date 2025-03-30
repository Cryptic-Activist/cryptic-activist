#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

npx prisma generate

ls -la . && ls

# Start the application
npm run start