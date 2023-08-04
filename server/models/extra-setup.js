const applyExtraSetup = (sequelize) => {
    const { Channel, Message, Team, User } = sequelize.models;

    //Channel
    Channel.belongsTo(Team, {
        foreignKey: "team_id",
    });
    Channel.belongsToMany(User, {
        through: "User_Channel",
        foreignKey: "channel_id",
    });

    //Message
    Message.belongsTo(Channel, {
        foreignKey: "channel_id",
    });
    Message.belongsTo(User, {
        foreignKey: "user_id",
    });

    // Team
    Team.belongsToMany(User, {
        through: "User_Team",
        foreignKey: "team_id",
    });
    Team.belongsTo(User, {
        foreignKey: "owner_id",
    });
    Team.hasMany(Channel, {
        foreignKey: "team_id",
    });

    // User
    User.belongsToMany(Team, {
        through: "User_Team",
        foreignKey: "user_id",
    });
    User.belongsToMany(Channel, {
        through: "User_Channel",
        foreignKey: "user_id",
    });
};

module.exports = { applyExtraSetup };
