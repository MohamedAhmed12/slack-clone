import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

export const createTokens = async (user, secret) => {
    const token = jwt.sign(
        {
            user: _.pick(user, "id"),
        },
        secret,
        {
            expiresIn: "30d",
        }
    );

    const refreshToken = jwt.sign(
        {
            user: _.pick(user, "id"),
        },
        user.password + secret,
        {
            expiresIn: "7d",
        }
    );

    return [token, refreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
    let userId = 0;

    try {
        const {
            user: { id },
        } = jwt.decode(refreshToken);

        userId = id;
    } catch (err) {
        return {};
    }

    if (!userId) {
        return {};
    }

    const user = await models.User.findOne({ where: { id: userId }, raw: true });

    if (!user) {
        return {};
    }

    try {
        jwt.verify(refreshToken, user.password + SECRET);
    } catch (err) {
        return {};
    }

    const [newToken, newRefreshToken] = await createTokens(user, SECRET);

    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
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

    const [token, refreshToken] = await createTokens(user, SECRET);

    return {
        ok: true,
        token,
        refreshToken,
    };
};
