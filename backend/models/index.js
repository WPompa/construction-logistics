//Easier to import and not have too much clutter by doing this.
//At the time being I cannot recreate the DB through the models. There is more to learn and implement.
"use strict";
const Employees = require("./employees.model");
const Materials = require("./materials.model");
const Stored_In = require("./stored_in.model");
const Storage_Areas = require("./storage_areas.model");
const Jobsites = require("./jobsites.model");
const { sequelize } = require("../database/connect");

//Associations Should Go Here (cross model associations)//
Employees.belongsTo(Jobsites, {
  as: "jobsiteEmployee",
  foreignKey: "JobsiteID",
});
Jobsites.hasMany(Employees, {
  foreignKey: "JobsiteID",
  onDelete: "SET NULL",
});

Storage_Areas.belongsTo(Jobsites, {
  as: "jobsiteStorageArea",
  foreignKey: "JobsiteID",
  onDelete: "SET NULL",
});
Jobsites.hasMany(Storage_Areas, {
  foreignKey: "JobsiteID",
  onDelete: "SET NULL",
});

Stored_In.belongsTo(Materials, {
  as: "material",
  foreignKey: "MaterialID",
  //targetKey: Useful when PK is different. MaterialID in one, randomNameID in another.
});
Stored_In.belongsTo(Storage_Areas, {
  as: "storageArea",
  foreignKey: "StorageAreaID",
});

sequelize.sync({ alter: true });
console.log("models.sync({ alter: true })");
module.exports = { Employees, Materials, Stored_In, Storage_Areas, Jobsites };
