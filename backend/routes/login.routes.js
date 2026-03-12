"use strict";
const express = require("express");
const router = express.Router();
const { AppError } = require("../utils/AppError");
const login = require("../controllers/login.controller");

router.route("/login").post(login);

module.exports = router;
