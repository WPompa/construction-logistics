"use strict";
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connect");

const Employee = sequelize.define(
  "employees",
  {
    EmpID: {
      //Do I need validate:{} here?
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Fname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        len: {
          msg: "Must have 2 - 32 characters.",
          args: [1, 33], //Assuming exclusive.
        },
        isAlpha: {
          msg: "First Name can only use alphabet characters",
        },
      },
    },
    Lname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        len: {
          msg: "Must have 2 - 32 characters.",
          args: [1, 33], //Assuming exclusive.
        },
        isAlpha: {
          msg: "Last Name can only use alphabet characters",
        },
      },
    },
    Title: {
      type: DataTypes.STRING(32),
      validate: {
        len: {
          msg: "Must have 2 - 32 characters.",
          args: [1, 33], //Assuming exclusive.
        },
        isAlphanumeric: true,
      },
    },
    SupervisorID: {
      type: DataTypes.INTEGER,
      validate: {
        //Might not need, check later.
        isNumeric: true,
      },
      references: {
        model: "employees",
        key: "EmpID",
      },
    },
    JobsiteID: {
      type: DataTypes.INTEGER,
      validate: {
        //Might not need, check later.
        isNumeric: true,
      },
      references: {
        model: "jobsites",
        key: "JobsiteID",
      },
    },
  },
  {
    tableName: "employees",
    //timestamps: false,
  }
);

//Self-referencing Associations
Employee.hasMany(Employee, {
  as: "subordinates",
  foreignKey: "SupervisorID",
  onDelete: "SET NULL",
});
Employee.belongsTo(Employee, {
  as: "supervisor",
  foreignKey: "SupervisorID",
  onDelete: "SET NULL",
});
//Creation example: const employee = await Employee.create({objFromFrontend}, {fields: [allowedValuesUnlistedAreIgnored]})

module.exports = Employee;
