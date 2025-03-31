#!/bin/sh

# Run Prisma migrations
npx prisma migrate deploy

npx prisma generate


# Start the application
npm run start