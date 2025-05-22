#!/bin/sh
mkdir -p /backups
env
pg_dump -h postgres -U "$POSTGRES_USER" "$POSTGRES_DB" > /backups/backup_$(date +%F).sql
