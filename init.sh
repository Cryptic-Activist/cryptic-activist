#!/bin/sh

git submodule update --recursive --init

cd api-chat-cryptic-activist && git checkout main && cd ..

cd api-cryptocurrency-cryptic-activist && git checkout main && cd ..

cd api-fiat-cryptic-activist && git checkout main && cd ..

cd api-offer-cryptic-activist && git checkout main && cd ..

cd api-trade-cryptic-activist && git checkout main && cd ..

cd api-user-cryptic-activist && git checkout main && cd ..

cd cryptic-activist-catalog && git checkout main && cd ..

docker compose up -d

docker container exec postgresql psql -U postgres -d db-ca < dump.sql
