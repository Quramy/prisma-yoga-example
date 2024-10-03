import fs from "node:fs/promises";
import path from "node:path";
import { buildSchema } from "graphql";
import { printSchemaWithDirectives as printSchema } from "@graphql-tools/utils";

import { typeDefs } from "../src/server/graphql/typeDefs.js";

const schema = buildSchema(typeDefs);
const schemaPath = path.resolve(path.dirname(import.meta.url.replace("file://", "")), "../schema.graphql");
await fs.writeFile(schemaPath, "# This is auto generated file. Don't edit.\n" + printSchema(schema), "utf8");
