import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from, split } from "@apollo/client";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { authMiddleware } from "./middlewares/auth";
// import { refreshTokenMiddleware } from './middlewares/refreshToken';
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:8080/graphql" }));
const httpLink = createHttpLink({ uri: "http://localhost:8080/graphql" });
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: from([
        authMiddleware,
        // refreshTokenMiddleware,
        splitLink,
    ]),
    cache: new InMemoryCache(),
});

const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(App);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
