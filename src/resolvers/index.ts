import type { Resolvers } from "../__generated__/graphql";
import { Post } from "./post";
import { Query } from "./query";

export const resolvers = {
  Post,
  Query,
} satisfies Resolvers;
