import type { QueryResolvers } from "../__generated__/graphql.js";
import { decodeId } from "./nodeId.js";

const lookupFields = {
  post: async (_, { id: nodeId }, { prisma }) => {
    const { typeName, id } = decodeId(nodeId);
    const post = await prisma.post.findUnique({ where: { id } });
    return post ? { ...post, __typename: typeName } : null;
  },
  comment: async (_, { id: nodeId }, { prisma }) => {
    const { typeName, id } = decodeId(nodeId);
    const comment = await prisma.comment.findUnique({ where: { id } });
    return comment ? { ...comment, __typename: typeName } : null;
  },
} as const satisfies QueryResolvers;

export const Query = {
  ...lookupFields,
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany();
    return posts.map(post => ({ ...post }));
  },
  node(_, args, ctx) {
    const { typeName } = decodeId(args.id);
    switch (typeName) {
      case "Post":
        return lookupFields.post(_, args, ctx);
      case "Comment":
        return lookupFields.comment(_, args, ctx);
      default:
        return null;
    }
  },
} as const satisfies QueryResolvers;
