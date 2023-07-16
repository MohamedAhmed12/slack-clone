const applyExtraSetup = (sequelize) => {
    const { Channel, Message, Team, User } = sequelize.models;

    //Channel
    Channel.belongsTo(Team, {
        foreignKey: "channel_id",
    });
    Channel.belongsToMany(User, {
        through: "channel_member",
        foreignKey: "channel_id"
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
        through: "member",
        foreignKey: "user_id",
    });
    Team.belongsTo(User, {
        foreignKey: "owner_id",
    });

    // User
    User.belongsToMany(Team, {
        through: "member",
        foreignKey: "user_id",
    });
    User.belongsToMany(Channel, {
        through: "channel_member",
        foreignKey: "user_id"
    });
};

module.exports = { applyExtraSetup };
