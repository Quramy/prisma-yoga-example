import { fromGlobalId } from "graphql-relay";
import type { QueryResolvers } from "../__generated__/graphql.js";

const lookupFields = {
  post: async (_, { id: nodeId }, { prisma }) => {
    const { type, id } = fromGlobalId(nodeId);
    if (type !== "Post" || !id) return null;
    const post = await prisma.post.findUnique({ where: { id } });
    return post ? { ...post, __typename: type } : null;
  },
  comment: async (_, { id: nodeId }, { prisma }) => {
    const { type, id } = fromGlobalId(nodeId);
    if (type !== "Comment" || !id) return null;
    const comment = await prisma.comment.findUnique({ where: { id } });
    return comment ? { ...comment, __typename: type } : null;
  },
} as const satisfies QueryResolvers;

export const Query = {
  ...lookupFields,
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany();
    return posts.map(post => ({ ...post }));
  },
  node(_, args, ctx) {
    const { type } = fromGlobalId(args.id);
    switch (type) {
      case "Post":
        return lookupFields.post(_, args, ctx);
      case "Comment":
        return lookupFields.comment(_, args, ctx);
      default:
        return null;
    }
  },
} as const satisfies QueryResolvers;
