import { Post } from "./post.js";
import type { PostParent } from "../types.js";
import { PostFactory, CommentFactory } from "../../../testing/factories/index.js";
import { createStubContext } from "../../../testing/graphql/stubContext.js";

describe("Post resolver", () => {
  describe("comments field", () => {
    let parentPost: PostParent;
    const subject = () => Post.comments(parentPost, {}, createStubContext());

    describe("when a post record does not comment", () => {
      beforeEach(async () => {
        parentPost = await PostFactory.create();
      });

      it("resolves comments as empty array", async () => {
        const connection = await subject();
        expect(connection.pageInfo.total).toBe(0);
        expect(connection.edges).toEqual([]);
        expect(connection.nodes).toEqual([]);
      });
    });

    describe("when a post record does comments", () => {
      beforeEach(async () => {
        parentPost = await PostFactory.create({
          comments: {
            create: await CommentFactory.buildList([
              { id: "older_comment", updatedAt: new Date("2022-11-01") },
              { id: "latest_comment", updatedAt: new Date("2022-11-02") },
            ]),
          },
        });
      });

      it("resolves comments in order updatedAt desc", async () => {
        const connection = await subject();
        expect(connection.pageInfo.total).toBe(2);
        expect(connection.nodes.map(c => c.id)).toEqual(["latest_comment", "older_comment"]);
      });
    });
  });
});
