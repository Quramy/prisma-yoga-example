import { createSchema } from "graphql-yoga";
import { Resolvers, QueryResolvers, PostResolvers } from "./__generated__/graphql";
import { typeDefs } from "./typeDefs";
import { ServerContext } from "./types";

const Query: QueryResolvers = {
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany();
    return posts.map(post => ({ ...post, comments: [] }));
  },
  post: async (_, { id }, { prisma }) => {
    const post = await prisma.post.findUnique({ where: { id } });
    return post ? { ...post, comments: [] } : null;
  },
};

const Post: PostResolvers = {
  comments: async ({ id }, _, { prisma }) => {
    return await prisma.comment.findMany({ where: { postId: id } });
  },
};

const resolvers: Resolvers = {
  Post,
  Query,
};

export const schema = createSchema<ServerContext>({
  typeDefs,
  resolvers,
});
