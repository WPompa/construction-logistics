"use strict";
class ErrorAPI extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createErrorAPI = (message, statusCode) => {
  return new ErrorAPI(message, statusCode);
};

module.exports = { createErrorAPI, ErrorAPI };
