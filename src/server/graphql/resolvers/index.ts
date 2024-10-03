import type { Resolvers } from "../__generated__/graphql.js";
import { Post } from "./post.js";
import { Comment } from "./comment.js";
import { Query } from "./query.js";

export const resolvers = {
  Post,
  Comment,
  Query,
} satisfies Resolvers;
