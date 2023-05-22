#!/bin/sh

git submodule update --recursive --init

cd api-chat-cryptic-activist && git branch main && cd ..

cd api-cryptocurrency-cryptic-activist && git branch main && cd ..

cd api-fiat-cryptic-activist && git branch main && cd ..

cd api-offer-cryptic-activist && git branch main && cd ..

cd api-user-cryptic-activist && git branch main && cd ..

cd cryptic-activist-catalog && git branch main && cd ..

docker compose up -d