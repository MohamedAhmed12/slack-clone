import { DataTypes } from "sequelize";
import { hash } from "bcrypt";

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isAlphanumeric: {
                        args: true,
                        msg: "Username can only contain letters and numbers",
                    },
                    len: {
                        args: [3, 25],
                        msg: "Username need to be between 3 and 25 characters long",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Invalid email",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [8, 100],
                        msg: "Password need to be between 8 and 100 characters long",
                    },
                },
            },
        },
        {
            hooks: {
                afterValidate: async (user) => {
                    user.password = await hash(user.password, 12);
                },
            },
        }
    );
};
