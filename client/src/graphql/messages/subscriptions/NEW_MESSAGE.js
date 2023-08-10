import { gql } from "@apollo/client";

export default gql`
    subscription NewMessage($channelId: Int!) {
        newMessage(channel_id: $channelId) {
            id
            text
            createdAt
            user {
                username
            }
        }
    }
`;