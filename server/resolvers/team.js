import { formatErr } from "../helpers/formatError";
import requiresAuth from "../helpers/permissions";

export default {
    Query: {
        listTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
            models.Team.findAll({ where: { owner_id: user.id } }, { raw: true })
        ),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(
            async (parent, args, { models: { Team, Channel }, user }) => {
                try {
                    const team = await Team.create({ ...args, owner_id: user.id });
                    await Channel.create({ name: "general", team_id: team.id });

                    return {
                        ok: true,
                        team,
                    };
                } catch (error) {
                    console.log(error);
                    return {
                        ok: false,
                        errors: formatErr(error),
                    };
                }
            }
        ),
    },
    Team: {
        channels: ({ id }, args, { models: { Channel } }) =>
            Channel.findAll({ where: { team_id: id } }),
    },
};
