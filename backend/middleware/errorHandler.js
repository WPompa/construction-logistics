"use strict";
const { ErrorAPI } = require("./ErrorAPI");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorAPI) {
    return res.status(err.statusCode).json(err.message);
  }

  if (err.name === "SequelizeValidationError") {
    console.log(err);
    let error = {
      "Error Type": err.name,
      "Error Messages": [],
    };
    err.errors.forEach((item) => error["Error Messages"].push(item.message));
    return res.status(400).json(error);
  }

  if (err.name === "SequelizeDatabaseError") {
    console.log(err);
    let error = {
      "Error Type": err.name,
      "Error Messages": err.original.sqlMessage,
    };
    return res.status(400).json(error);
  }
  console.log(err);
  //console.log(JSON.stringify(err, null, 2));
  return res.json(err); //Does res.json(err) work too? Just so I dont hardcode 500 as the status code. -It looks like it might.
};

module.exports = errorHandler;
