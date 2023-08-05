import { gql } from "@apollo/client";

export default gql`
    mutation CreateMessage($channelId: Int!, $text: String!) {
        createMessage(channel_id: $channelId, text: $text)
    }
`;