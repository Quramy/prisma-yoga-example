import type { CommentResolvers } from "../__generated__/graphql.js";
import { encodeId } from "./nodeId.js";

export const Comment = {
  id: parent => encodeId("Comment", parent),
} satisfies CommentResolvers;
