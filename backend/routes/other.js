"use strict";
const express = require("express");
const router = express.Router();
const getOther = require("../controllers/other.controller");

router.get("/other", getOther);

module.exports = router;
