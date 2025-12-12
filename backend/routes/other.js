"use strict";
const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/asyncWrapper");

//Was recommended the following code. Remove or leave after testing.
router.get(
  "/{*any}",
  asyncWrapper(async (req, res, next) => {
    return res.status(404).send("API Route Not Found");
  })
);
//

module.exports = router;
