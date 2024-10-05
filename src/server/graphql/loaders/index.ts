import type { PrismaClient } from "@prisma/client";

import { createPostCommentsLoader } from "./postCommentsLoader.js";

export function createLoaders({ prisma }: { prisma: PrismaClient }) {
  return {
    postCommentsLoader: createPostCommentsLoader(prisma),
  };
}

export type Loaders = ReturnType<typeof createLoaders>;
