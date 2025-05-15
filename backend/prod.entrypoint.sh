#!/bin/sh

set -e

echo "⏳ Waiting for DB to be ready..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for $DB_HOST:$DB_PORT..."
  sleep 1
done

echo "✅ Database is ready"

# Run Prisma migration deployment
echo "🚀 Running prisma migrate deploy..."
npx prisma migrate deploy

# Start your app
echo "▶️ Starting app..."