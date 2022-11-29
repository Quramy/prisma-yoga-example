import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: [
        "typescript",
        {
          add: {
            content: 'import { BaseContext } from "../types";',
          },
        },
        "typescript-resolvers",
      ],
      config: {
        contextType: "BaseContext",
      },
    },
  },
};

export default config;
