import { toGlobalId } from "graphql-relay";
import { Query } from "./query.js";
import { PostFactory, CommentFactory } from "../../../testing/factories/index.js";
import { createStubContext } from "../../../testing/graphql/stubContext.js";

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
    const gid = (entityId: TemplateStringsArray) => toGlobalId("Post", entityId[0]);
    const subject = (globalId: string) => Query.post({}, { id: globalId }, createStubContext());

    describe("when a post exists", () => {
      beforeEach(async () => await PostFactory.create({ id: "sample_post" }));

      it("resolves null", async () => {
        await expect(subject(gid`not_existing_post_id`)).resolves.toBeNull();
      });

      it("resolves an object", async () => {
        await expect(subject(gid`sample_post`)).resolves.toMatchObject({ id: "sample_post" });
      });
    });
  });

  describe("comment field", () => {
    const gid = (entityId: TemplateStringsArray) => toGlobalId("Comment", entityId[0]);
    const subject = (globalId: string) => Query.comment({}, { id: globalId }, createStubContext());

    describe("when a comment exists", () => {
      beforeEach(async () => await CommentFactory.create({ id: "sample_comment" }));

      it("resolves null", async () => {
        await expect(subject(gid`not_existing_post_id`)).resolves.toBeNull();
      });

      it("resolves an object", async () => {
        await expect(subject(gid`sample_comment`)).resolves.toMatchObject({ id: "sample_comment" });
      });
    });
  });

  describe("node field", () => {
    const subject = (globalId: string) => Query.node({}, { id: globalId }, createStubContext());
    it("resolves concrete node Post type", async () => {
      const post = await PostFactory.create();
      await expect(subject(toGlobalId("Post", post.id))).resolves.toMatchObject({ __typename: "Post" });
    });

    it("resolves concrete node Comment type", async () => {
      const comment = await CommentFactory.create();
      await expect(subject(toGlobalId("Comment", comment.id))).resolves.toMatchObject({ __typename: "Comment" });
    });
  });
});
