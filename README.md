# Cryptic Activist

A cryptocurrency exchange that allows multi currency crypto trading.

## Manual Installation

1. Install Docker

2. Clone Cryptic Activist repository

```
git clone git@github.com:Cryptic-Activist/cryptic-activist.git
```

3. Clone submodules

```
git submodule update --recursive --init
```

## Run project

Run containerized project thorugh init script

### Run project for the first time

1. Give execution permission to init.sh file

```
sudo chmod +x init.sh
```

2. Run init script

```
./init.sh
```

### Run project with Docker

1. Run docker-compose file

```
docker compose up -d
```

### Import database data

After the whole project is up and running without any errors do the following:

1. Get into the running container

2. Import the database dump.
   ```
   psql -U postgres -d db-ca < dump.sql
   ```

### How to connect to Postgres database via pgAdmin
