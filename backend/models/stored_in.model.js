"use strict";
const { sequelize } = require("../database/connect");
const { DataTypes } = require("sequelize");
//There might be errors in cases where a storage area or a material is completely wiped out or removed. Keep in mind.
const Stored_In = sequelize.define(
  "stored_in",
  {
    StorageAreaID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "storage_areas",
        key: "StorageAreaID",
      },
    },
    MaterialID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "materials",
        key: "MaterialID",
      },
    },
    Amount: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    tableName: "stored_in",
    //timestamps: false,
  }
);

module.exports = Stored_In;
