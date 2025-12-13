"use strict";
function asyncWrapper(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.log(error);
      console.log(callback());
      next(error);
    }
  };
}

module.exports = asyncWrapper;
