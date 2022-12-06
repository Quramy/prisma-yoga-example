import { BaseContext } from "../src/types.js";
import { createLoaders } from "../src/loaders/index.js";

export function createStubContext() {
  return {
    loaders: createLoaders({ prisma: jestPrisma.client }),
    prisma: jestPrisma.client,
  } satisfies BaseContext;
}
