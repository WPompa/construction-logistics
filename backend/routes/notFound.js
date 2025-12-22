"use strict";
const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/asyncWrapper");

router.all(
  "/{*any}",
  asyncWrapper(async (req, res, next) => {
    console.log("Request to:", req.path);
    return res
      .status(404)
      .json({ status: "Failure!", result: "API Route Not Found" });
  })
);

module.exports = router;
