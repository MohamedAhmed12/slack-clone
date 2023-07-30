export default `
    type Team {
        id: Int!
        name: String!
        members: [User!]!
        channels: [Channel!]!
    }

    type CreateTeamResponse {
        ok: Boolean!
        errors: [Error!]
    }

    type Query {
        listTeams: [Team!]!
    }

    type Mutation {
        createTeam(name: String!): CreateTeamResponse!
    }
`;