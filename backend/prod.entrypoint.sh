#!/bin/sh

set -e

echo "⏳ Waiting for DB to be ready..."

# Optional: wait for DB (Postgres example)
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  sleep 1
done

echo "✅ Database is ready"

# Run Prisma migration deployment
echo "🚀 Running prisma migrate deploy..."
npx prisma migrate deploy

# Start your app
echo "▶️ Starting app..."