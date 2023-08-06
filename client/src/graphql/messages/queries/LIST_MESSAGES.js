import { gql } from "@apollo/client";

export default gql`
    query ListMessages($channelId: Int!) {
        listMessages(channel_id: $channelId) {
            id
            text
            user {
                username
            }
            createdAt
        }
    }
`;
