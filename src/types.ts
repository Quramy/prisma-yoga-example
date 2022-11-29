import type { PrismaClient } from "@prisma/client";
import type { YogaInitialContext } from "graphql-yoga";

export type BaseContext = {
  prisma: PrismaClient;
};

export type ServerContext = YogaInitialContext & BaseContext;
