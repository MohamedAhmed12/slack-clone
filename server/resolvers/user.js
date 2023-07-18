import { hash } from "bcrypt";

export default {
    Query: {
        getUser: (parent, { id }, { models: { User } }) => User.findOne({ where: { id } }),
        allUsers: (parent, args, { models: { User } }) => User.findAll(),
    },
    Mutation: {
        register: async (parent, { password, ...otherArgs }, { models: { User } }) => {
            try {
                const hashedPassword = await hash(password, 12);
                await User.create({ ...otherArgs, password: hashedPassword });
                return true;
            } catch (error) {
                return false;
            }
        },
    },
};
