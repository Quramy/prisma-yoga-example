import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  generates: {
    // Server
    "src/server/graphql/__generated__/graphql.ts": {
      plugins: ["typescript", "add", "typescript-resolvers"],
      config: {
        content: 'import type { BaseContext } from "../types.js";',
        contextType: "BaseContext",
      },
    },
  },
};

export default config;
