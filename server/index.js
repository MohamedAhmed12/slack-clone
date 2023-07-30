import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

import { assertDatabaseConnectionOk, models } from "./models";
import { getUserMiddleware } from "./middlewares/getUser";

const SECRET = "s65f4as68fa4sdf65as36f1dfaesf";

const app = express();
const httpServer = http.createServer(app);
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
    await server.start();
    
    assertDatabaseConnectionOk();
   
    app.use(
        "/graphql",
        cors('*'),
        bodyParser.json(),
        getUserMiddleware(models, SECRET),
        expressMiddleware(server, {
            context: ({ req }) => {
                return { models, user: req.user, SECRET };
            },
        })
    );

    await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve));

    console.log(`🚀 Server ready at http://localhost:8080/graphql`);
};

startServer();
