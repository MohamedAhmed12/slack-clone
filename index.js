import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs, resolvers } from './schema';

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({ token: req.headers.token }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
server.applyMiddleware({ app });
await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve));
console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);