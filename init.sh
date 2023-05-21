#!/bin/sh

git submodule update --recursive --init

docker compose up -d