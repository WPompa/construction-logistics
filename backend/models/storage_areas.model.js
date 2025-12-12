"use strict";
/* const { sequelize } = require("../database/connect"); 
const { DataTypes } = require("sequelize");*/

module.exports = (sequelize, DataTypes) => {
  const Storage_Area = sequelize.define(
    "storage_areas",
    {
      StorageAreaID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
      Location: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: {
            msg: "Must have 2 - 64 characters.",
            args: [1, 65],
          },
          isAlpha: true,
        },
      },
      JobsiteID: {
        type: DataTypes.INTEGER,
        references: {
          model: "jobsites",
          key: "JobsiteID",
        },
      },
      TotalStored: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
      Is_Container: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "storage_areas",
      //timestamps: false,
    }
  );

  return Storage_Area;
};
