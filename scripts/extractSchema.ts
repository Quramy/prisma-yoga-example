import fs from "node:fs/promises";
import { printSchema, buildSchema } from "graphql";
import { typeDefs } from "../src/typeDefs";

async function main() {
  const schema = buildSchema(typeDefs);
  await fs.writeFile(
    __dirname + "/../schema.graphql",
    "# This is auto generated file. Don't edit.\n" + printSchema(schema),
    "utf8",
  );
}
main();
