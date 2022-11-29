import { createSchema } from "graphql-yoga";

const typeDefs = /* GraphQL */ `
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

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      posts: () => [],
      post: () => null,
    },
  },
});
