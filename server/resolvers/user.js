import { hash } from "bcrypt";

import { formatErr } from "../helpers/formatError";

export default {
    Query: {
        getUser: (parent, { id }, { models: { User } }) => User.findOne({ where: { id } }),
        allUsers: (parent, args, { models: { User } }) => User.findAll(),
    },
    Mutation: {
        register: async (parent, { password, ...otherArgs }, { models: { User } }) => {
            try {
                if (password.length < 5 || password.length > 100) {
                    return {
                        ok: false,
                        errors: [
                            {
                                path: "password",
                                message: "Password need to be between 8 and 100 characters long",
                            },
                        ],
                    };
                }

                const hashedPassword = await hash(password, 12);
                const user = await User.create({ ...otherArgs, password: hashedPassword });

                return {
                    ok: true,
                    user,
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErr(err),
                };
            }
        },
    },
};
