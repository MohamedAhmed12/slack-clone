import { hash } from "bcrypt";

import { formatErr } from "../helpers/formatError";
import { tryLogin } from '../helpers/auth';

export default {
    Query: {
        getUser: (parent, { id }, { models: { User } }) => User.findOne({ where: { id } }),
        allUsers: (parent, args, { models: { User } }) => User.findAll(),
    },
    Mutation: {
        login: async(parent, {email, password}, {models: {User}, SECRET}) => await tryLogin(email, password, User, SECRET),
        register: async (parent, args, { models: { User } }) => {
            try {
                const user = await User.create(args);

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
