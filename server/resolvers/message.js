import requiresAuth from "../helpers/permissions";
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

const NEW_CHANNEL_MESSAGE = "NEW_CHANNEL_MESSAGE";

export default {
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
                (payload, args) => payload.channelId === args.channelId
            ),
        },
    },
    Query: {
        listMessages: requiresAuth.createResolver(
            async (parent, { channel_id }, { models: { Message, User }, user }) =>
                await Message.findAll(
                    { order: [["createdAt", "ASC"]], where: { channel_id }, include: User },
                    { raw: true }
                )
        ),
    },
    Mutation: {
        createMessage: async (parent, args, { models: { Message, User }, user }) => {
            try {
                const message = await Message.create({ ...args, user_id: user.id });

                const currentUser = await User.findOne({
                    where: {
                        id: user.id,
                    },
                });

                pubsub.publish(NEW_CHANNEL_MESSAGE, {
                    channelId: args.channelId,
                    newMessage: {
                        ...message.dataValues,
                        user: currentUser,
                    },
                });

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
    Message: {
        user: async ({ user, user_id }, args, { models }) => {
            if (user) {
                return user;
            }

            return await models.User.findOne({ where: { id: user_id } }, { raw: true });
        },
    },
};
