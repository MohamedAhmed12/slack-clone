import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
    const Team = sequelize.define("Team", {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    });
};
