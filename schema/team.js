export default `
    type Team {
        id: Int!
        members: [User!]!
        channels: [Channel!]!
    }
`;