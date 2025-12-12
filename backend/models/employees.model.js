"use strict";
/* const { sequelize } = require("../database/connect"); 
const { DataTypes } = require("sequelize");*/

module.exports = (sequelize, DataTypes) => {
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
  return Employee;
};

//Creation example: const employee = await Employee.create({objFromFrontend}, {fields: [allowedValuesUnlistedAreIgnored]})

//Initial way I tried after trying to host on vercel.
/* const Employee = (sequelize, DataTypes) =>
  sequelize.define(
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

//Creation example: const employee = await Employee.create({objFromFrontend}, {fields: [allowedValuesUnlistedAreIgnored]})

module.exports = Employee;
 */
