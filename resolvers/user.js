export default {
    Query: {
        getUser: (parent, { id }, { models: { User } }) => User.findOne({ where: { id } }),
        allUsers: (parent, args, { models: { User } }) => User.findAll(),
    },
    Mutation: {
        register: async (parent, args, { models: { User } }) => await User.create(args),
    },
};
