const { AppError } = require("../utils/AppError");
const { QueryTypes } = require("sequelize");
const tables = require("../utils/RawQueries");
const getPagination = require("../utils/paginationHelper");
const {
  checkForRequiredValues,
  removeEmptyValues,
  processKeyValues,
  setUpdateOptions,
  setDeleteOptions,
} = require("../utils/serviceHelpers");

const table = {
  name: "storage_areas",
  primaryKeys: ["StorageAreaID"],
};

const getStorage_Areas = async (
  sequelize,
  storage_areaModel,
  currentPage,
  currentLimit,
) => {
  //const totalCount = await storage_areaModel.count();
  [{ Count: totalCount }] = await sequelize.query(tables[table.name].count, {
    type: QueryTypes.SELECT,
  });

  const { offset, limit, metadata } = getPagination(
    currentPage,
    currentLimit,
    totalCount,
  );

  /* const result = await storage_areaModel.findAll({
    attributes: [
      "StorageAreaID",
      ["Length", "Inner Length"],
      ["Width", "Inner Width"],
      ["Height", "Inner Height"],
      "Location",
      ["JobsiteID", "Jobsite"],
      ["TotalStored", "Total Items"],
      ["Is_Container", "Container?"],
    ],
    offset,
    limit,
  }); */
  const result = await sequelize.query(tables[table.name].query, {
    replacements: { limit, offset },
    type: QueryTypes.SELECT,
  });

  //If pagination works as intended this snippet might never be used.
  if (result.length === 0) {
    throw new AppError("No Data For Selected Page", 200);
  }

  return { result, metadata };
};

const createStorage_Area = async (storage_areaModel, storage_areaData) => {
  const required = ["Location"];

  checkForRequiredValues(required, storage_areaData);

  removeEmptyValues(storage_areaData);

  //If Primary key value is given, check if it is already in use.
  if (storage_areaData?.StorageAreaID) {
    const exists = await storage_areaModel.findByPk(
      storage_areaData.StorageAreaID,
      {
        raw: true,
      },
    );

    if (exists) {
      console.log(exists);
      throw new AppError(
        `Storage Area With ID "${storage_areaData.StorageAreaID}" Already Exists!`,
        200,
      );
    }
  }

  const result = await storage_areaModel.create(storage_areaData); //{fields: []} to exclude injected key-values.

  return result;
};

//useEmpty is an object with booleans used for flagging values that should be set to null.
const updateStorage_Areas = async (
  storage_areaModel,
  storage_areaData,
  useEmpty,
) => {
  const required = ["StorageAreaID"];

  checkForRequiredValues(required, storage_areaData);

  removeEmptyValues(storage_areaData, useEmpty);

  const primaryKeyValuesArr = processKeyValues(
    table.primaryKeys,
    storage_areaData,
    true,
  );

  const options = setUpdateOptions(table.primaryKeys, primaryKeyValuesArr);

  const result = await storage_areaModel.update(storage_areaData, {
    where: options,
  });

  //result[0] is just the number of affected rows.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result[0];
};

const deleteStorage_Areas = async (storage_areaModel, storage_areaData) => {
  removeEmptyValues(storage_areaData);

  const keyValuesArr = processKeyValues(
    Object.keys(storage_areaData),
    storage_areaData,
  );

  const options = setDeleteOptions(keyValuesArr);

  const result = await storage_areaModel.destroy({
    where: options,
  });

  //Destroy() returns a number for how many rows where affected.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result;
};

module.exports = {
  getStorage_Areas,
  createStorage_Area,
  updateStorage_Areas,
  deleteStorage_Areas,
};
