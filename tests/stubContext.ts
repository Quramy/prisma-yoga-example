import { BaseContext } from "../src/types.js";
import { createLoaders } from "../src/loaders/index.js";
import { GraphQLDebuggerContext } from "@graphql-debugger/trace-schema";

export function createStubContext() {
  return {
    loaders: createLoaders({ prisma: jestPrisma.client }),
    prisma: jestPrisma.client,
    GraphQLDebuggerContext: new GraphQLDebuggerContext(),
  } satisfies BaseContext;
}
