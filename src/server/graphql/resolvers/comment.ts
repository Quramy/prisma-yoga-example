import { toGlobalId } from "graphql-relay";

import type { CommentResolvers } from "../__generated__/graphql.js";

export const Comment = {
  id: parent => toGlobalId("Comment", parent.id),
} satisfies CommentResolvers;
