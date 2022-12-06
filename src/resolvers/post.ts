import type { PostResolvers } from "../__generated__/graphql.js";

export const Post = {
  comments: async ({ id }, _, { loaders: { postCommentsLoader } }) => {
    return await postCommentsLoader.load(id);
  },
} satisfies PostResolvers;
