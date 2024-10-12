import type { MutationResolvers } from "../__generated__/graphql.js";
import { addCommentToPost } from "./mutations/addCommentToPost.js";

export const Mutation = {
  addCommentToPost,
} satisfies MutationResolvers;
