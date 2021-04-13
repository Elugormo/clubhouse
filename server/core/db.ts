import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres", "test", "test", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.error("Unable to connect to the database", err);
  }
})();

export { sequelize };
