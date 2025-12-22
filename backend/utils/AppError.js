"use strict";
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

const createAppError = (message, statusCode) => {
  return new AppError(message, statusCode);
};

module.exports = { createAppError, AppError };
