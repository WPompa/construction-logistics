const { AppError } = require("../utils/AppError");
const getPagination = require("../utils/paginationHelper");
const {
  checkForRequiredValues,
  removeEmptyValues,
  processKeyValues,
  setUpdateOptions,
  setDeleteOptions,
} = require("../utils/serviceHelpers");

const table = {
  name: "materials",
  primaryKeys: ["MaterialID"],
};

const getMaterials = async (materialModel, currentPage, currentLimit) => {
  const totalCount = await materialModel.count();

  const { offset, limit, metadata } = getPagination(
    currentPage,
    currentLimit,
    totalCount
  );

  const result = await materialModel.findAll({
    attributes: [
      "MaterialID",
      "Name",
      ["MaterialType", "Mat. Type"],
      ["Length", "Box Length"],
      ["Width", "Box Width"],
      ["Height", "Box Height"],
      ["SupplierName", "Supplier"],
      ["TotalAvailable", "Available"],
      ["LostAmounts", "Trashed"],
    ],
    offset,
    limit,
  });

  //If pagination works as intended this snippet might never be used.
  if (result.length === 0) {
    throw new AppError("No Data For Selected Page", 200);
  }

  return { result, metadata };
};

const createMaterial = async (materialModel, materialData) => {
  const required = ["Name", "MaterialType", "SupplierName"];

  checkForRequiredValues(required, materialData);

  removeEmptyValues(materialData);

  //If Primary key value is given, check if it is already in use.
  if (materialData?.MaterialID) {
    const exists = await materialModel.findByPk(materialData.MaterialID, {
      raw: true,
    });

    if (exists) {
      console.log(exists);
      throw new AppError(
        `Material With ID "${materialData.MaterialID}" Already Exists!`,
        200
      );
    }
  }

  const result = await materialModel.create(materialData); //{fields: []} to exclude injected key-values.

  return result;
};

//useEmpty is an object with booleans used for flagging values that should be set to null.
const updateMaterials = async (materialModel, materialData, useEmpty) => {
  const required = ["MaterialID"];

  checkForRequiredValues(required, materialData);

  removeEmptyValues(materialData, useEmpty);

  const primaryKeyValuesArr = processKeyValues(
    table.primaryKeys,
    materialModel,
    true
  );

  const options = setUpdateOptions(table.primaryKeys, primaryKeyValuesArr);

  const result = await materialModel.update(materialData, {
    where: options,
  });

  //result[0] is just the number of affected rows.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result[0];
};

const deleteMaterials = async (materialModel, materialData) => {
  removeEmptyValues(materialData);

  const keyValuesArr = processKeyValues(
    Object.keys(materialData),
    materialData
  );

  const options = setDeleteOptions(keyValuesArr);

  const result = await materialModel.destroy({
    where: options,
  });

  //Destroy() returns a number for how many rows where affected.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result;
};

module.exports = {
  getMaterials,
  createMaterial,
  updateMaterials,
  deleteMaterials,
};
