import { BaseContext } from "../src/types";
import { createLoaders } from "../src/loaders";

export function createStubContext() {
  return {
    loaders: createLoaders({ prisma: jestPrisma.client }),
    prisma: jestPrisma.client,
  } satisfies BaseContext;
}
