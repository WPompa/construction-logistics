"use strict";
const { sequelize } = require("../database/connect");
const { DataTypes } = require("sequelize");

const temp = sequelize.define(
  "temp",
  {
    attributes,
  },
  {
    tableName: "",
  }
);
