const connectToDB = require("../config/connect");
const { AppError } = require("../utils/AppError");

const dbConnection = async (req, res, next) => {
  if (!req.app.get("sequelize") || !req.app.get("models")) {
    try {
      const { sequelize, models } = await connectToDB();

      req.app.set("sequelize", sequelize);
      req.app.set("models", models);
    } catch (error) {
      console.error("Connection Error In dbConnection.js: ", error);
      next(new AppError("Cannot Connect To Database", 500));
    }
  }
  req.sequelize = req.app.get("sequelize");
  req.models = req.app.get("models");

  next();
};

module.exports = dbConnection;
