process.env.DATABASE_NAME ||= "dev";

import { PrismaClient } from "@prisma/client";
import { initialize } from "../src/__generated__/fabbrica";
import { PostFactory, CommentFactory } from "../src/factories";

const prisma = new PrismaClient();
initialize({ prisma });

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();

  await PostFactory.create({
    comments: { create: await CommentFactory.buildList(3) },
  });
  await PostFactory.createList(4);

  console.log(await prisma.post.count());
}
main();
