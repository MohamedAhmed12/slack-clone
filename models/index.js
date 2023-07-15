import { Sequelize } from "sequelize";
import { applyExtraSetup } from "./extra-setup";

const sequelize = new Sequelize({
    dialect: "postgres",
    database: "slack",
    username: "postgres",
    password: "postgres",
    host: "localhost",
    logQueryParameters: true,
    benchmark: true,
});

const modelDefiners = [
    require("./team.model"),
    require("./user.model"),
    require("./channel.model"),
    require("./message.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

export const assertDatabaseConnectionOk = async () => {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database connection OK!");
    } catch (error) {
        console.log("Unable to connect to the database:");
        console.log(error.message);
        process.exit(1);
    }
};
