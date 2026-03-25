"use strict";
const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/asyncWrapper");
const { AppError } = require("../utils/AppError");

router.all(
  "/{*any}",
  asyncWrapper(async (req, res, next) => {
    console.log("Request to:", req.path);
    throw new AppError("API Route Not Found", 404);
  }),
);

module.exports = router;
