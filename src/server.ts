import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { root, schema } from "./graphql/schemas/root";
const app = express();
const PORT = 3333;

app.use(express.json());
app.get("/", (request: Request, response: Response) =>
  response.send("Express + TypeScript Server")
);

app.use(
  "/graphql",
  graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    rootValue: root,
    graphiql: true,
    context: { request, response },
    pretty: true,
  }))
);
app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);
