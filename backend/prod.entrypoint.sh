#!/bin/sh

echo "→ Using DATABASE_URL = $DATABASE_URL"

npx prisma migrate deploy

npm run start