import { createSchema } from "graphql-yoga";

import { typeDefs } from "./typeDefs.js";
import { ServerContext } from "./types.js";
import { resolvers } from "./resolvers/index.js";

export const schema = createSchema<ServerContext>({
  typeDefs,
  resolvers,
});
