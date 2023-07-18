import { gql } from "@apollo/client";

export default gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                message
                path
            }
            user {
                id
            }
        }
    }
`;