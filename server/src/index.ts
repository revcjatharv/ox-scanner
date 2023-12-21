import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { loggingMiddleware } from './interceptors/logging';
import repositoryResolvers from "./resolvers/repositoryResolver";
import repositoryQuery from "./type/repositoryQuery";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: repositoryQuery,
    resolvers: repositoryResolvers,
    plugins: [loggingMiddleware],
    context: ({req}) => ({
      headers: req.headers,
    })
  });

  await server.start(); // Wait for the server to start

  const app:any = express();

  // app.use()
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
