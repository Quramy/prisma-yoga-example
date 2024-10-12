import { toGlobalId } from "graphql-relay";
import { PostFactory } from "../../../../testing/factories/index.js";
import { createStubContext } from "../../../../testing/graphql/stubContext.js";
import { addCommentToPost } from "./addCommentToPost.js";

describe(addCommentToPost, () => {
  const prisma = jestPrisma.client;
  const gid = (entityId: TemplateStringsArray) => toGlobalId("Post", entityId[0]);
  const subject = (postId: string, commentBody: string) => {
    return addCommentToPost({}, { input: { postId, commentBody } }, createStubContext());
  };

  it("return failure when corresponding post does not exist", async () => {
    // Arrange

    // Act
    const result = await subject(gid`not_existing_post_id`, "");

    // Assert
    expect(result.__typename).toBe("MutationFailure");
  });

  it("return AddCommentToPostResultSuccess when corresponding post exists", async () => {
    // Arrange
    await PostFactory.create({ id: "target_post" });

    // Act
    const result = await subject(gid`target_post`, "Comment Body");

    // Assert
    if (result.__typename !== "AddCommentToPostResultSuccess") fail();
    await expect(prisma.comment.findUnique({ where: { id: result.commentNode.id } })).resolves.toBeTruthy();
    expect(result.commentNode.body).toBe("Comment Body");
  });
});
