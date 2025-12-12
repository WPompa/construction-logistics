"use strict";
/* const { sequelize } = require("../database/connect"); 
const { DataTypes } = require("sequelize");*/

module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define(
    "materials",
    {
      MaterialID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: {
            msg: "Must have 2 - 64 characters.",
            args: [1, 65], //Assuming exclusive.
          },
          isAlphanumeric: true,
        },
      },
      MaterialType: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: {
            msg: "Must have 2 - 64 characters.",
            args: [1, 65], //Assuming exclusive.
          },
          isAlpha: true,
        },
      },
      Length: {
        type: DataTypes.DECIMAL(5, 2),
      },
      Width: {
        type: DataTypes.DECIMAL(5, 2),
      },
      Height: {
        type: DataTypes.DECIMAL(5, 2),
      },
      SupplierName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: {
            msg: "Must have 2 - 64 characters.",
            args: [1, 65], //Assuming exclusive.
          },
          isAlpha: true,
        },
      },
      TotalAvailable: {
        type: DataTypes.SMALLINT,
      },
      LostAmounts: {
        type: DataTypes.SMALLINT,
      },
    },
    {
      tableName: "materials",
      //timestamps: false,
    }
  );

  return Material;
};
