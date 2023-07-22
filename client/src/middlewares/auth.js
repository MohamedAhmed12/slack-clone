import { ApolloLink } from "@apollo/client";

export const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({headers = {}}) => ({
        headers: {
            ...headers,
            "x-token": localStorage.getItem("token"),
            "x-refresh-token": localStorage.getItem("refreshToken"),
        }
    }));

    return forward(operation);
});