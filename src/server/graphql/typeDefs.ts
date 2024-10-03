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
    posts: [Post!]!
    post(id: ID!): Post
  }
`;
