import type { PostResolvers } from "../__generated__/graphql";

export const Post = {
  comments: async ({ id }, _, { prisma }) => {
    return await prisma.comment.findMany({ where: { postId: id }, orderBy: { updatedAt: "desc" } });
  },
} satisfies PostResolvers;
