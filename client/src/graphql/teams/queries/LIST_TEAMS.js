import { gql } from "@apollo/client";

export default gql`
    query ListTeams {
        listTeams {
            id
            name
            owner_id
            channels {
                id
                name
            }
        }
    }
`;