import type { PrismaClient } from "@prisma/client";
import type { YogaInitialContext } from "graphql-yoga";
import { Loaders } from "./loaders/index.js";

export type BaseContext = {
  prisma: PrismaClient;
  loaders: Loaders;
};

export type ServerContext = YogaInitialContext & BaseContext;
