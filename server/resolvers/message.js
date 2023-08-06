import requiresAuth from "../helpers/permissions";

export default {
    Query: {
        listMessages: requiresAuth.createResolver(
            async (parent, { channel_id }, { models: { Message, User }, user }) =>
                await Message.findAll(
                    { order: [["createdAt", "ASC"]], where: { channel_id } },
                    { raw: true }
                )
        ),
    },
    Mutation: {
        createMessage: async (parent, args, { models: { Message }, user }) => {
            try {
                await Message.create({ ...args, user_id: user.id });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
    Message: {
        user: ({ user_id }, args, { models: { User } }) => User.findOne({ where: { id: user_id } }),
    },
};
