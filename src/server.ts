process.env.DATABASE_NAME ||= "dev";

import { PrismaClient } from "@prisma/client";
import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";

import type { ServerContext } from "./types";
import { schema } from "./schema";
import { createLoaders } from "./loaders";

const prisma = new PrismaClient({
  log: ["info", "error", "warn", "query"],
});

const yoga = createYoga({
  schema,
  context(initialContext) {
    const loaders = createLoaders({ prisma });
    const context: ServerContext = {
      ...initialContext,
      prisma,
      loaders,
    };
    return context;
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
