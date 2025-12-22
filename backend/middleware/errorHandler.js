"use strict";
const { AppError } = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    console.error("AppError: ", err.message);

    return res.status(err.statusCode).json({
      status: "Failure!",
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  if (err.name.includes("Sequelize")) {
    console.error("Sequelize Error: ", err.name);
    console.error("Errors: ", err?.errors);
    console.error("Stack: ", err.stack);

    return res.status(400).json({
      status: "Error",
      message: err.message,
      stack: undefined,
    });
  }

  console.log(JSON.stringify(err, null, 2));

  return res.status(500).json({
    status: "Error",
    message: "Internal Server Error",
    stack: undefined,
  });
};

module.exports = errorHandler;
