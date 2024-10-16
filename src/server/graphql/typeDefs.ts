export const typeDefs = /* GraphQL */ `
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
    total: Int
  }

  type Post implements Node {
    id: ID!
    title: String!
    body: String!
    comments: CommentConnection
  }

  type Comment implements Node {
    id: ID!
    body: String!
  }

  type CommentEdge {
    cursor: String!
    node: Comment!
  }

  type CommentConnection {
    edges: [CommentEdge!]!
    nodes: [Comment!]!
    pageInfo: PageInfo!
  }

  input AddCommentToPostInput {
    clientMutationId: ID
    postId: ID!
    commentBody: String!
  }

  type AddCommentToPostResultSuccess {
    clientMutationId: ID
    commentEdge: CommentEdge!
    commentNode: Comment!
  }

  type MutationFailure {
    clientMutationId: ID
    reason: String
  }

  union AddCommentToPostResult = AddCommentToPostResultSuccess | MutationFailure

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    comment(id: ID!): Comment
    node(id: ID!): Node
  }

  type Mutation {
    addCommentToPost(input: AddCommentToPostInput!): AddCommentToPostResult!
  }
`;
