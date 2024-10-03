import DataLoader from "dataloader";
import { PrismaClient, Comment } from "@prisma/client";

export function createPostCommentsLoader(prisma: PrismaClient) {
  return new DataLoader<string, Comment[]>(async ids => {
    const comments = await prisma.comment.findMany({
      where: { postId: { in: ids.slice() } },
      orderBy: { updatedAt: "desc" },
    });
    return ids.map(id => comments.filter(comment => comment.postId === id));
  });
}
