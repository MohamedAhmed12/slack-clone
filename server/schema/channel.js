export default `
    type Channel {
        id: Int!
        name: String!
        public: Boolean
        messages: [Message!]!
        users: [User!]!
    }

    type ChannelResponse {
        ok: Boolean!
        channel: Channel
        errors: [Error!]
    }

    type Mutation {
        createChannel(team_id: Int, name: String!, public: Boolean): ChannelResponse!
    }
`;
