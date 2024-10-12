import { toGlobalId, connectionFromArray } from "graphql-relay";

import type { PostResolvers } from "../__generated__/graphql.js";

export const Post = {
  id: parent => toGlobalId("Post", parent.id),
  comments: async ({ id }, _, { loaders: { postCommentsLoader } }) => {
    const comments = await postCommentsLoader.load(id);
    const connection = connectionFromArray(comments, {});
    return {
      edges: connection.edges,
      nodes: comments,
      pageInfo: {
        ...connection.pageInfo,
        total: comments.length,
      },
    };
  },
} satisfies PostResolvers;
