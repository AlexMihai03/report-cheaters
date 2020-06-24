import cors from "cors";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import * as Database from "./common/infrastructure/database/sequelize/config";

const app = express();

app.use(cors());

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => [
      {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
      },
      {
        title: "Jurassic Park",
        author: "Michael Crichton",
      },
    ],
  },
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });


Database.connection.sync({ force: true }).then(() => {
  app.listen({ port: 8000 }, () => {
    console.log("[Server] Apollo Server on http://localhost:8000/graphql");
  });
});
