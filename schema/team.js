export default `
    type Team {
        id: Int!
        members: [User!]!
        channels: [Channel!]!
    }

    type Mutation {
        createTeam(name: String!): Boolean!
    }
`;