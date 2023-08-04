export default `
    type Team {
        id: Int!
        name: String!
        members: [User!]!
        channels: [Channel!]!
    }

    type VoidResponse {
        ok: Boolean!
        errors: [Error!]    
    }

    type CreateTeamResponse {
        ok: Boolean!
        team: Team
        errors: [Error!]
    }

    type Query {
        listTeams: [Team!]!
    }

    type Mutation {
        createTeam(name: String!): CreateTeamResponse!
        addMember(email: String!, team_id: Int!): VoidResponse!
    }
`;
