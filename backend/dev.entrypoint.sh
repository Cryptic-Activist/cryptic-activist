#!/bin/sh

npm run bootstrap

cd libraries/base-ca

npx prisma migrate dev

npx prisma generate

npm run dev
