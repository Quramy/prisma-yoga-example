import { createPostCommentsLoader } from "../../src/loaders/postCommentsLoader.js";
import { PostFactory, CommentFactory } from "../factories/index.js";

describe(createPostCommentsLoader, () => {
  beforeEach(async () => {
    await PostFactory.createList([
      {
        id: "post1",
        comments: {
          create: await CommentFactory.buildList([
            { id: "older_comment", updatedAt: new Date("2022-11-01") },
            { id: "latest_comment", updatedAt: new Date("2022-11-02") },
          ]),
        },
      },
      {
        id: "post2",
        comments: { create: await CommentFactory.buildList(1) },
      },
      {
        id: "post3",
      },
    ]);
  });

  it("loads comments in a post", async () => {
    const loader = createPostCommentsLoader(jestPrisma.client);
    const comments = await loader.load("post1");
    expect(comments.map(c => c.id)).toEqual(["latest_comment", "older_comment"]);
  });

  it("loads comments in multiple posts", async () => {
    const loader = createPostCommentsLoader(jestPrisma.client);
    const result = [await loader.load("post1"), await loader.load("post2"), await loader.load("post3")] as const;
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(1);
    expect(result[2].length).toBe(0);
  });
});
