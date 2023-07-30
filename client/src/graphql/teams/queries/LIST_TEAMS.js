import { gql } from "@apollo/client";

export default gql`
    query ListTeams {
        listTeams {
            id
            name
            channels {
                id
                name
            }
        }
    }
`;