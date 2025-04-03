#!/bin/sh

ls -la && ls -la libraries/base-ca && ls -la libraries/base-ca/dist

# Run Prisma migrations
npx prisma migrate deploy

npx prisma generate

npm run start