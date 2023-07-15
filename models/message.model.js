const { DataTypes, models } = require("sequelize");

module.exports = (sequelize) => {
    const Message = sequelize.define("Message", {
        text: DataTypes.STRING,
    });
};
