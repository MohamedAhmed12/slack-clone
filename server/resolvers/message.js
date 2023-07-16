export default {
    Mutation: {
        createMessage: async (parent, args, { models: { Message } }) => {
            try {
                await Message.create(args);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};
