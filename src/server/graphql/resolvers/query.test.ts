import { Query } from "./query.js";
import { PostFactory, CommentFactory } from "../../../testing/factories/index.js";
import { createStubContext } from "../../../testing/graphql/stubContext.js";
import { encodeId } from "./nodeId.js";

describe("Query resolver", () => {
  describe("posts field", () => {
    const subject = () => Query.posts({}, {}, createStubContext());

    describe("when there are no posts", () => {
      it("resolves comments as empty array", async () => {
        const resolved = await subject();
        expect(resolved).toEqual([]);
      });
    });

    describe("when posts exist", () => {
      let posts: { id: string }[];

      beforeEach(async () => {
        posts = await PostFactory.createList(2);
      });

      it("resolves comments in order updatedAt desc", async () => {
        await expect(subject()).resolves.toMatchObject(posts);
      });
    });
  });

  describe("post field", () => {
    const toNodeId = (entityId: string) => encodeId("Post", { id: entityId });
    const subject = (nodeId: string) => Query.post({}, { id: nodeId }, createStubContext());

    describe("when a post exists", () => {
      beforeEach(async () => await PostFactory.create({ id: "sample_post" }));

      it("resolves null", async () => {
        await expect(subject(toNodeId("not_existing_post_id"))).resolves.toBeNull();
      });

      it("resolves an object", async () => {
        await expect(subject(toNodeId("sample_post"))).resolves.toMatchObject({ id: "sample_post" });
      });
    });
  });

  describe("comment field", () => {
    const toNodeId = (entityId: string) => encodeId("Comment", { id: entityId });
    const subject = (nodeId: string) => Query.comment({}, { id: nodeId }, createStubContext());

    describe("when a comment exists", () => {
      beforeEach(async () => await CommentFactory.create({ id: "sample_comment" }));

      it("resolves null", async () => {
        await expect(subject(toNodeId("not_existing_post_id"))).resolves.toBeNull();
      });

      it("resolves an object", async () => {
        await expect(subject(toNodeId("sample_comment"))).resolves.toMatchObject({ id: "sample_comment" });
      });
    });
  });

  describe("node field", () => {
    const subject = (nodeId: string) => Query.node({}, { id: nodeId }, createStubContext());
    it("resolves concrete node Post type", async () => {
      const post = await PostFactory.create();
      await expect(subject(encodeId("Post", post))).resolves.toMatchObject({ __typename: "Post" });
    });

    it("resolves concrete node Comment type", async () => {
      const comment = await CommentFactory.create();
      await expect(subject(encodeId("Comment", comment))).resolves.toMatchObject({ __typename: "Comment" });
    });
  });
});
