import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { authMiddleware } from "./middlewares/auth";
import { refreshTokenMiddleware } from './middlewares/refreshToken';
import "semantic-ui-css/semantic.min.css";

import Routes from "./routes";

const httpLink = createHttpLink({ uri: "http://localhost:8080/graphql" });

const client = new ApolloClient({
    link: from ([
        authMiddleware,
        httpLink,
        refreshTokenMiddleware
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
