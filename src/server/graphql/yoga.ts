import { PrismaClient } from "@prisma/client";
import { createYoga } from "graphql-yoga";

import type { ServerContext } from "./types.js";
import { schema } from "./schema.js";
import { createLoaders } from "./loaders/index.js";

const prisma = new PrismaClient({
  log: ["info", "error", "warn", "query"],
});

export const yoga = createYoga({
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
