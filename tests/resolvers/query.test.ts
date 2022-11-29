import { Query } from "../../src/resolvers/query";
import { PostFactory, CommentFactory } from "../factories";

describe("Query resolver", () => {
  describe("posts field", () => {
    const subject = () => Query.posts({}, {}, { prisma: jestPrisma.client });

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
    const subject = (id: string) => Query.post({}, { id }, { prisma: jestPrisma.client });

    describe("when a post exists", () => {
      let post: any;
      beforeEach(async () => {
        post = await PostFactory.create({ id: "sample_post" });
      });

      it("resolves null", async () => {
        await expect(subject("not_existing_post_id")).resolves.toBeNull();
      });

      it("resolves an object", async () => {
        await expect(subject("sample_post")).resolves.toMatchObject({ id: "sample_post" });
      });
    });
  });
});
