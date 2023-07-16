export default {
    Mutation: {
        createTeam: async (parent, { name }, { models: { Team } }) => {
            try {
                await Team.create({ name });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};
