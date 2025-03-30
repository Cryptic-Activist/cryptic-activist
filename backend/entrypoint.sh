#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

npx prisma generate

npm run bootstrap

# Start the application
npm run start