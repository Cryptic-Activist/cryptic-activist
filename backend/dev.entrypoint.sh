#!/bin/sh

ls -la && ls -la libraries/base-ca

npm run bootstrap

cd libraries/base-ca

npx prisma migrate dev

npx prisma generate

npm run dev
