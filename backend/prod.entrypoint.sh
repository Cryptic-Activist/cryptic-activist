#!/bin/sh

set -e

echo "⏳ Waiting for DB to be ready..."

until pg_isready -h postgres -U postgres > /dev/null 2>&1; do
  echo "Waiting for postgres..."
  sleep 1
done

echo "✅ Database is ready"

# Run Prisma migration deployment
echo "🚀 Running prisma migrate deploy..."
npx prisma migrate deploy

# Start your app
echo "▶️ Starting app..."
npm run start