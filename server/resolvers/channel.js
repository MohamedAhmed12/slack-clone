import { formatErr } from "../helpers/formatError";
import requiresAuth from "../helpers/permissions";

export default {
    Mutation: {
        createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                const team = await models.Team.findOne({ where: { id: args.team_id } });

                if (team.owner_id != user.id) {
                    return {
                        ok: false,
                        errors: [
                            {
                                path: "name",
                                message: "You have to be the owner of the team to create channels!",
                            },
                        ],
                    };
                }

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
