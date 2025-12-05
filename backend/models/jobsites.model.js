"use strict";
const { sequelize } = require("../database/connect");
const { DataTypes } = require("sequelize");

const Jobsites = sequelize.define(
  "jobsites",
  {
    JobsiteID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    JobsiteName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        len: {
          msg: "Must have 2 - 32 characters.",
          args: [1, 33], //Assuming exclusive.
        },
        isAlphanumeric: true,
      },
    },
    /* JobsiteSupervisorID: {
      type: DataTypes.INTEGER,
      references: {
        model: "employees",
        key: "EmpID",
      },
    }, */
  },
  {
    tableName: "jobsites",
    //timestamps: false,
  }
);

module.exports = Jobsites;
