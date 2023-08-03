import { gql } from "@apollo/client";

export default gql`
    mutation Mutation($name: String!, $teamId: Int) {
        createChannel(name: $name, team_id: $teamId) {
            errors {
                path
                message
            }
            ok
            channel {
                id
                name
                public
            }
        }
    }
`;