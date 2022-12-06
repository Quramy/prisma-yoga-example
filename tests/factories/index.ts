import { PrismaClient } from "@prisma/client";

import { randPost, randSentence } from "@ngneat/falso";

import { definePostFactory, defineCommentFactory } from "../../src/__generated__/fabbrica/index.js";

export const PostFactory = definePostFactory({
  defaultData: () => {
    const { title, body } = randPost();
    return {
      title,
      body,
      isDraft: false,
    };
  },
});

export const CommentFactory = defineCommentFactory({
  defaultData: () => ({
    post: PostFactory,
    body: randSentence(),
  }),
});
