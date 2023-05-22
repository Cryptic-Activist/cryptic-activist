#!/bin/sh

git submodule update --recursive --init

cd api-chat-cryptic-activist && git branch main

cd api-cryptocurrency-cryptic-activist && git branch main

cd api-fiat-cryptic-activist && git branch main

cd api-offer-cryptic-activist && git branch main

cd api-user-cryptic-activist && git branch main

cd cryptic-activist-catalog && git branch main

docker compose up -d