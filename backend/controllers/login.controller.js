const service = require("../services/login.service");
const asyncWrapper = require("../middleware/asyncWrapper");
const { AppError } = require("../utils/AppError");

const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body.login;
  const sequelize = req.sequelize;

  if (!username) {
    throw new AppError("Please Provide Username", 400);
  } else if (!password) {
    throw new AppError("Please Provide Password", 400);
  }

  const result = await service(sequelize, username, password);

  res.status(200).json(result);
});

module.exports = login;
