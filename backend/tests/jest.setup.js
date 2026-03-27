const app = require("../../server");

afterAll(async () => {
  const sequelize = app.get("sequelize");
  if (sequelize) {
    await sequelize.close();
  }
});
