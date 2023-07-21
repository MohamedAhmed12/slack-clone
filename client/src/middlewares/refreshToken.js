import { ApolloLink } from "@apollo/client";

export const refreshTokenMiddleware = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const token = response.headers.get("x-token");
        const refreshToken = response.headers.get("x-refresh-token");

        if (token) {
            localStorage.setItem("x-token", token);
        }

        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }

        return response;
    });
});
