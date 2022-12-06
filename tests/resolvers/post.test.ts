import { Post } from "../../src/resolvers/post.js";
import { PostFactory, CommentFactory } from "../factories/index.js";
import { createStubContext } from "../stubContext.js";

describe("Post resolver", () => {
  describe("comments field", () => {
    let parentPost: any;
    const subject = () => Post.comments(parentPost, {}, createStubContext());

    describe("when a post record does not comment", () => {
      beforeEach(async () => {
        parentPost = await PostFactory.createForConnect();
      });

      it("resolves comments as empty array", async () => {
        const resolved = await subject();
        expect(resolved).toEqual([]);
      });
    });

    describe("when a post record does comments", () => {
      beforeEach(async () => {
        parentPost = await PostFactory.createForConnect({
          comments: {
            create: await CommentFactory.buildList([
              { id: "older_comment", updatedAt: new Date("2022-11-01") },
              { id: "latest_comment", updatedAt: new Date("2022-11-02") },
            ]),
          },
        });
      });

      it("resolves comments in order updatedAt desc", async () => {
        const resolved = await subject();
        expect(resolved.map(c => c.id)).toEqual(["latest_comment", "older_comment"]);
      });
    });
  });
});
