import { Comment, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

import { createPostCommentsLoader } from "./postCommentsLoader";

export function createLoaders({ prisma }: { prisma: PrismaClient }) {
  return {
    postCommentsLoader: createPostCommentsLoader(prisma),
  };
}

export type Loaders = ReturnType<typeof createLoaders>;
