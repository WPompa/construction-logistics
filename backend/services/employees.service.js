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
  name: "employees",
  primaryKeys: ["EmpID"],
};

const getEmployees = async (employeeModel, currentPage, currentLimit) => {
  const totalCount = await employeeModel.count();

  const { offset, limit, metadata } = getPagination(
    currentPage,
    currentLimit,
    totalCount
  );

  const result = await employeeModel.findAll({
    attributes: [
      "EmpID",
      ["Fname", "Forename"],
      ["Lname", "Surname"],
      "Title",
      "SupervisorID",
      "JobsiteID",
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

const createEmployee = async (employeeModel, employeeData) => {
  const required = ["Fname", "Lname"];

  checkForRequiredValues(required, employeeData);

  removeEmptyValues(employeeData);

  //If Primary key value is given, check if it is already in use.
  if (employeeData?.EmpID) {
    const exists = await employeeModel.findByPk(employeeData.EmpID, {
      raw: true,
    });

    if (exists) {
      console.log(exists);
      throw new AppError(
        `Employee With ID "${employeeData.EmpID}" Already Exists!`,
        200
      );
    }
  }

  const result = await employeeModel.create(employeeData); //{fields: []} to exclude injected key-values.

  return result;
};

//useEmpty is an object with booleans used for flagging values that should be set to null.
const updateEmployees = async (employeeModel, employeeData, useEmpty) => {
  const required = ["EmpID"];

  checkForRequiredValues(required, employeeData);

  removeEmptyValues(employeeData, useEmpty);

  const primaryKeyValuesArr = processKeyValues(
    table.primaryKeys,
    employeeModel,
    true
  );

  const options = setUpdateOptions(table.primaryKeys, primaryKeyValuesArr);

  const result = await employeeModel.update(employeeData, {
    where: options,
  });

  //result[0] is just the number of affected rows.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result[0];
};

const deleteEmployees = async (employeeModel, employeeData) => {
  removeEmptyValues(employeeData);

  const keyValuesArr = processKeyValues(
    Object.keys(employeeData),
    employeeData
  );

  const options = setDeleteOptions(keyValuesArr);

  const result = await employeeModel.destroy({
    where: options,
  });

  //Destroy() returns a number for how many rows where affected.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result;
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
};
