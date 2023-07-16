import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import path from "path";

import { assertDatabaseConnectionOk, models } from "./models";

const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
});

const startServer = async () => {
    assertDatabaseConnectionOk();
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, { 
        listen: { port: 8080 },
        context: async () => ({
            models
        })
     });

    console.log(`🚀 Server listening at: ${url}`);
};

startServer();
