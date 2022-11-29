import type { PostResolvers } from "../__generated__/graphql";

export const Post = {
  comments: async ({ id }, _, { loaders: { postCommentsLoader } }) => {
    return await postCommentsLoader.load(id);
  },
} satisfies PostResolvers;
