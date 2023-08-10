export default `
    scalar DateTime

    type Message {
        id: Int!
        text: String!
        user: User!
        channel: Channel
        createdAt: DateTime!
    }

    type Subscription {
        newMessage(channel_id: Int!): Message!
    }

    type Query {
        listMessages(channel_id: Int!): [Message!]!
    }

    type Mutation {
        createMessage(channel_id: Int!, text: String!): Boolean!
    }
`;  