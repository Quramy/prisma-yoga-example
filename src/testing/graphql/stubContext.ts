import type { BaseContext } from "../../server/graphql/types.js";
import { createLoaders } from "../../server/graphql/loaders/index.js";

export function createStubContext() {
  return {
    loaders: createLoaders({ prisma: jestPrisma.client }),
    prisma: jestPrisma.client,
  } satisfies BaseContext;
}
