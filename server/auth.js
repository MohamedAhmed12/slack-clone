import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

export const createToken = async (user, secret, secret2) => {
    const token = jwt.sign(
        {
            user: _.pick(user, "id"),
        },
        secret,
        {
            expiresIn: "1m",
        }
    );

    const refreshToken = jwt.sign(
        {
            user: _.pick(user, "id"),
        },
        secret2,
        {
            expiresIn: "7d",
        }
    );

    return [token, refreshToken];
};

export const tryLogin = async (email, password, User, SECRET) => {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
        return {
            ok: false,
            errors: [{ path: "email", message: "Invalid email" }],
        };
    }

    const validPass = await compare(password, user.password);

    if (!validPass) {
        return {
            ok: false,
            errors: [{ path: "password", message: "Invalid password" }],
        };
    }

    const refreshTokenSecret = user.password + SECRET;
    const [token, refreshToken] = await createToken(user, SECRET, refreshTokenSecret);

    return {
        ok: true,
        token,
        refreshToken,
    };
};
