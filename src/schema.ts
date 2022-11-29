import { createSchema } from "graphql-yoga";
import { Resolvers, QueryResolvers } from "./__generated__/graphql";

export const typeDefs = /* GraphQL */ `
  type Post {
    id: ID!
    title: String!
    body: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    body: String!
  }

  type Query {
    posts: [Post]!
    post(id: ID!): Post
  }
`;

const Query: QueryResolvers = {
  posts: () => [],
  post: () => null,
};

const resolvers: Resolvers = {
  Query,
};

export const schema = createSchema({
  typeDefs,
  resolvers,
});
