import type { PostResolvers } from "../__generated__/graphql.js";
import { encodeId } from "./nodeId.js";

export const Post = {
  id: parent => encodeId("Post", parent),
  comments: async ({ id }, _, { loaders: { postCommentsLoader } }) => {
    return await postCommentsLoader.load(id);
  },
} satisfies PostResolvers;
