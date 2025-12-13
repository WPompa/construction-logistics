//Easier to import and not have too much clutter by doing this.
//At the time being I cannot recreate the DB through the models. There is more to learn and implement.
"use strict";
const Employees = require("./employees.model");
const Materials = require("./materials.model");
const stored_in = require("./stored_in.model");
const Storage_Areas = require("./storage_areas.model");
const Jobsites = require("./jobsites.model");

module.exports = (sequelize, DataTypes) => {
  const Employee = Employees(sequelize, DataTypes);
  const Material = Materials(sequelize, DataTypes);
  const Stored_In = stored_in(sequelize, DataTypes);
  const Storage_Area = Storage_Areas(sequelize, DataTypes);
  const Jobsite = Jobsites(sequelize, DataTypes);

  //Associations Should Go Here (cross model associations)//
  Employee.belongsTo(Jobsite, {
    as: "jobsiteEmployee",
    foreignKey: "JobsiteID",
  });
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
  Jobsite.hasMany(Employee, {
    foreignKey: "JobsiteID",
    onDelete: "SET NULL",
  });

  Storage_Area.belongsTo(Jobsite, {
    as: "jobsiteStorageArea",
    foreignKey: "JobsiteID",
    onDelete: "SET NULL",
  });
  Jobsite.hasMany(Storage_Area, {
    foreignKey: "JobsiteID",
    onDelete: "SET NULL",
  });

  Stored_In.belongsTo(Material, {
    as: "material",
    foreignKey: "MaterialID",
    //targetKey: Useful when PK is different. MaterialID in one, randomNameID in another.
  });
  Stored_In.belongsTo(Storage_Area, {
    as: "storageArea",
    foreignKey: "StorageAreaID",
  });

  //For development use only.
  /* sequelize.sync({ alter: true });
  console.log("models.sync({ alter: true })"); */
};
