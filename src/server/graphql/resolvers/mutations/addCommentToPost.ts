import { fromGlobalId, offsetToCursor } from "graphql-relay";
import type { MutationResolvers } from "../../__generated__/graphql.js";

export const addCommentToPost = (async (
  _,
  { input: { clientMutationId, postId, commentBody } },
  { prisma, loaders: { postCommentsLoader } },
) => {
  const { type, id } = fromGlobalId(postId);
  if (type !== "Post" || !id) {
    return {
      __typename: "MutationFailure",
      clientMutationId,
      reason: "Invalid id",
    };
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return {
      __typename: "MutationFailure",
      clientMutationId,
      reason: "No Post",
    };
  }

  const created = await prisma.comment.create({
    data: {
      star: 0,
      body: commentBody,
      createdAt: new Date(),
      postId: post.id,
    },
  });

  const comments = await postCommentsLoader.load(post.id);
  const offset = comments.findIndex(({ id }) => id === created.id);

  return {
    __typename: "AddCommentToPostResultSuccess",
    clientMutationId,
    commentEdge: {
      node: created,
      cursor: offsetToCursor(offset),
    },
    commentNode: created,
  };
}) satisfies MutationResolvers["addCommentToPost"];
