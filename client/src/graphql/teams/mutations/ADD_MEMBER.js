import { gql } from "@apollo/client";

export default gql`
    mutation AddMember($email: String!, $teamId: Int!) {
        addMember(email: $email, team_id: $teamId) {
            errors {
                path
                message
            }
            ok
        }
    }
`;