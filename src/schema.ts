import { createSchema } from "graphql-yoga";
import { typeDefs } from "./typeDefs";
import { ServerContext } from "./types";
import { resolvers } from "./resolvers";

export const schema = createSchema<ServerContext>({
  typeDefs,
  resolvers,
});
