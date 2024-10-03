import type { PrismaClient } from "@prisma/client";
import type { YogaInitialContext } from "graphql-yoga";
import { Loaders } from "./loaders/index.js";

export type { Post as PostParent } from "@prisma/client";
export type { Comment as CommentParent } from "@prisma/client";

export type BaseContext = {
  prisma: PrismaClient;
  loaders: Loaders;
};

export type ServerContext = YogaInitialContext & BaseContext;
