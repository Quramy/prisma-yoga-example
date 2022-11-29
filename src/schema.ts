import { createSchema } from "graphql-yoga";
import { Resolvers, QueryResolvers } from "./__generated__/graphql";
import { typeDefs } from "./typeDefs";

const Query: QueryResolvers = {
  posts: () => [],
  post: () => null,
};

const resolvers: Resolvers = {
  Query,
};

export const schema = createSchema({
  typeDefs,
  resolvers,
});
