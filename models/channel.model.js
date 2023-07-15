import { DataTypes, models } from "sequelize";

module.exports = (sequelize) => {
    const Channel = sequelize.define("Channel", {
        name: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
    });
};
