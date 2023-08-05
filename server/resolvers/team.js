import { Sequelize } from "sequelize";
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
                    const res = await Team.sequelize.transaction(async () => {
                        const team = await Team.create({ ...args, owner_id: user.id });
                        await Channel.create({ name: "general", team_id: team.id });
                        return team;
                    });

                    return {
                        ok: true,
                        res,
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
        addMember: requiresAuth.createResolver(
            async (parent, { email, team_id }, { models: { Team, User, Member }, user }) => {
                try {
                    const TeamPromis = Team.findOne({ where: { id: team_id } }, { raw: true });
                    const UserToAddPromis = User.findOne({ where: { email } }, { raw: true });
                    const [team, userToAdd] = await Promise.all([TeamPromis, UserToAddPromis]);

                    if (team.owner_id != user.id) {
                        return {
                            ok: false,
                            errors: [
                                {
                                    path: "email",
                                    message: "Only owner can add member to the team!",
                                },
                            ],
                        };
                    }
                    if (!userToAdd) {
                        return {
                            ok: false,
                            errors: [
                                { path: "email", message: "Could not find user with this email!" },
                            ],
                        };
                    }

                    await team.addUsers(userToAdd, { through: { selfGranted: false } });

                    return {
                        ok: true,
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
