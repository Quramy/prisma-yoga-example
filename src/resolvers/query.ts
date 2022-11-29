import type { QueryResolvers } from "../__generated__/graphql";

export const Query = {
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany();
    return posts.map(post => ({ ...post, comments: [] }));
  },
  post: async (_, { id }, { prisma }) => {
    const post = await prisma.post.findUnique({ where: { id } });
    return post ? { ...post, comments: [] } : null;
  },
} satisfies QueryResolvers;
