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
  name: "stored_in",
  primaryKeys: ["StorageAreaID", "MaterialID"],
};

const getStored_In = async (stored_inModel, currentPage, currentLimit) => {
  const totalCount = await stored_inModel.count();

  const { offset, limit, metadata } = getPagination(
    currentPage,
    currentLimit,
    totalCount
  );

  const result = await stored_inModel.findAll({
    attributes: ["StorageAreaID", "MaterialID", "Amount"],
    offset,
    limit,
  });

  //If pagination works as intended this snippet might never be used.
  if (result.length === 0) {
    throw new AppError("No Data For Selected Page", 200);
  }

  return { result, metadata };
};

const createStored_In = async (stored_inModel, stored_inData) => {
  const required = ["StorageAreaID", "MaterialID", "Amount"];

  checkForRequiredValues(required, stored_inData);

  //removeEmptyValues(stored_inData); //Required Array is checked for everything already in this case.

  //If Primary key value is given, check if it is already in use.
  if (stored_inData?.StorageAreaID && stored_inData?.MaterialID) {
    const exists = await stored_inModel.findByPk({
      where: {
        StorageAreaID: stored_inData.StorageAreaID,
        MaterialID: stored_inData?.MaterialID,
      },
      raw: true,
    });

    if (exists) {
      console.log(exists);
      throw new AppError(
        `Stored In With IDs "${stored_inData.StorageAreaID}" & "${stored_inData.MaterialID}" Already Exists!`,
        200
      );
    }
  }

  const result = await stored_inModel.create(stored_inData); //{fields: []} to exclude injected key-values.

  return result;
};

//useEmpty is an object with booleans used for flagging values that should be set to null.
const updateStored_In = async (stored_inModel, stored_inData, useEmpty) => {
  const required = ["StorageAreaID", "MaterialID"];

  checkForRequiredValues(required, stored_inData);

  removeEmptyValues(stored_inData, useEmpty);

  const primaryKeyValuesArr = processKeyValues(
    table.primaryKeys,
    stored_inModel,
    true
  );

  const options = setUpdateOptions(table.primaryKeys, primaryKeyValuesArr);

  const result = await stored_inModel.update(stored_inData, {
    where: options,
  });

  //result[0] is just the number of affected rows.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result[0];
};

const deleteStored_In = async (stored_inModel, stored_inData) => {
  removeEmptyValues(stored_inData);

  const keyValuesArr = processKeyValues(
    Object.keys(stored_inData),
    stored_inData
  );

  const options = setDeleteOptions(keyValuesArr);

  const result = await stored_inModel.destroy({
    where: options,
  });

  //Destroy() returns a number for how many rows where affected.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result;
};

module.exports = {
  getStored_In,
  createStored_In,
  updateStored_In,
  deleteStored_In,
};
