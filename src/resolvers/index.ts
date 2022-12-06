import type { Resolvers } from "../__generated__/graphql.js";
import { Post } from "./post.js";
import { Query } from "./query.js";

export const resolvers = {
  Post,
  Query,
} satisfies Resolvers;
