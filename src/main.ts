import { createServer } from "node:http";

import { yoga } from "./server/graphql/yoga.js";

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
