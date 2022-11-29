import { PostFactory } from "./factories";

const prisma = jestPrisma.client;
test("sample", async () => {
  await PostFactory.create();
  await expect(prisma.post.count()).resolves.toBe(1);
});
