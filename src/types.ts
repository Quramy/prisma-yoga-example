import type { PrismaClient } from "@prisma/client";
import type { YogaInitialContext } from "graphql-yoga";
import { Loaders } from "./loaders/index.js";
import { GraphQLDebuggerContext } from "@graphql-debugger/trace-schema";

export type BaseContext = {
  prisma: PrismaClient;
  loaders: Loaders;
  GraphQLDebuggerContext: GraphQLDebuggerContext;
};

export type ServerContext = YogaInitialContext & BaseContext;
