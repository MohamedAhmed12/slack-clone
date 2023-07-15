import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";
import { assertDatabaseConnectionOk } from "./models";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    assertDatabaseConnectionOk();
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    const { url } = await startStandaloneServer(server, { listen: { port: 8080 } });

    console.log(`🚀 Server listening at: ${url}`);
};

startServer();
