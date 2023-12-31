import { gql } from "@apollo/client";

export default gql`
    mutation CreateTeam($name: String!) {
        createTeam(name: $name) {
            ok
            team {
                id
            }
            errors {
                path
                message
            }
        }
    }
`;