import { formatErr } from "../helpers/formatError";
import requiresAuth from "../helpers/permissions";

export default {
    Mutation: {
        createChannel: requiresAuth.createResolver(async (parent, args, { models }) => {
            try {
                const channel = await models.Channel.create(args);

                return {
                    ok: true,
                    channel,
                };
            } catch (error) {
                console.log(error);

                return {
                    ok: false,
                    errors: formatErr(error),
                };
            }
        }),
    },
};
