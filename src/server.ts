import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";
import { createYoga } from "graphql-yoga";

import type { ServerContext } from "./types.js";
import { schema } from "./schema.js";
import { createLoaders } from "./loaders/index.js";
import { GraphQLDebuggerContext, traceSchema } from "@graphql-debugger/trace-schema";
import { ProxyAdapter } from "@graphql-debugger/adapter-proxy";
import prismaOTEL from "@prisma/instrumentation";

const prisma = new PrismaClient({
  log: ["info", "error", "warn", "query"],
});

const tracedSchema = traceSchema({
  schema,
  adapter: new ProxyAdapter(),
  instrumentations: [new prismaOTEL.PrismaInstrumentation()],
});

const yoga = createYoga({
  schema: tracedSchema,
  context(initialContext) {
    const loaders = createLoaders({ prisma });
    const context: ServerContext = {
      ...initialContext,
      prisma,
      loaders,
      GraphQLDebuggerContext: new GraphQLDebuggerContext(),
    };
    return context;
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
