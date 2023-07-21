import { ApolloServer } from "@apollo/server";
import { GraphQLError } from "graphql";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import authMiddleware from "./middlewares/auth";

import { assertDatabaseConnectionOk, models } from "./models";

const SECRET = "s65f4as68fa4sdf65as36f1dfaesf";

const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
});

const startServer = async () => {
    assertDatabaseConnectionOk();

    const { url } = await startStandaloneServer(server, {
        listen: { port: 8080 },
        context: async ({ req }) => {
            return {
                models,
                user: req.user,
                SECRET,
            };
        },
        middleware: [authMiddleware]
    });

    console.log(`🚀 Server listening at: ${url}`);
};

startServer();
