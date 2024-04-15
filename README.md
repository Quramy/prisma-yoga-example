# Prisma Yoga example

This repository the following examples:

- [Prisma ORM](https://www.prisma.io) using PostgreSQL
- GraphQL API server via [graphql-yoga](https://the-guild.dev/graphql/yoga-server)
  - [Code genenerator for typescript-resover](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers)
  - [DataLoader](https://github.com/graphql/dataloader)
- And Jest test suites integrated to RDB

## Setup

```sh
$ docker compose up
$ npm i
$ cp .env.example .env
```

## Start GraphQL Server

```sh
$ npm run migrate:dev
$ npm run seed
$ npm start
$ open http://localhost:4000/graphql
```

## Run test

```sh
$ npm run migrate:test
$ npm test
```

## Debugging

Issue a query in GraphQL Playground, then visit http://localhost:16686 to debug using [GraphQL Debugger](https://graphql-debugger.com/).

## License

MIT
