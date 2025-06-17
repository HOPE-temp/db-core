# DB-CORE

## Description

Database core of Hope SOA

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# up docker compose
$ docker-compose up -d

# up database stucture
$ npm run migration:run

```

## Migrate update

```bash
# migrate
$ npm run migration:generate src/migrations/[name]

```

## Migrate revert

```bash
# migrate
$ npm run migration:revert

```