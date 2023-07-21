import { formatErr } from "../helpers/formatError";

export default {
    Mutation: {
        createTeam: async (parent, args, { models: { Team }, user }) => {
            try {
                await Team.create({ ...args, owner_id: user.id });
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
        },
    },
};
