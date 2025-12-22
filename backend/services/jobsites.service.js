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
  name: "jobsite",
  primaryKeys: ["JobsiteID"],
};

const getJobsites = async (JobsiteModel, currentPage, currentLimit) => {
  const totalCount = await JobsiteModel.count();

  const { offset, limit, metadata } = getPagination(
    currentPage,
    currentLimit,
    totalCount
  );

  const result = await JobsiteModel.findAll({
    attributes: ["JobsiteID", ["JobsiteName", "Jobsite"]],
    offset,
    limit,
  });

  //If pagination works as intended this snippet might never be used.
  if (result.length === 0) {
    throw new AppError("No Data For Selected Page", 200);
  }

  return { result, metadata };
};

const createJobsite = async (JobsiteModel, JobsiteData) => {
  const required = ["JobsiteName"];

  checkForRequiredValues(required, JobsiteData);

  removeEmptyValues(JobsiteData);

  //If Primary key value is given, check if it is already in use.
  if (JobsiteData?.JobsiteID) {
    const exists = await JobsiteModel.findByPk(JobsiteData.JobsiteID, {
      raw: true,
    });

    if (exists) {
      console.log(exists);
      throw new AppError(
        `Jobsite With ID "${JobsiteData.JobsiteID}" Already Exists!`,
        200
      );
    }
  }

  const result = await JobsiteModel.create(JobsiteData); //{fields: []} to exclude injected key-values.

  return result;
};

//useEmpty is an object with booleans used for flagging values that should be set to null.
const updateJobsites = async (JobsiteModel, JobsiteData, useEmpty) => {
  const required = ["JobsiteID"];

  checkForRequiredValues(required, JobsiteData);

  removeEmptyValues(JobsiteData, useEmpty);

  const primaryKeyValuesArr = processKeyValues(
    table.primaryKeys,
    JobsiteModel,
    true
  );

  const options = setUpdateOptions(table.primaryKeys, primaryKeyValuesArr);

  const result = await JobsiteModel.update(JobsiteData, {
    where: options,
  });

  //result[0] is just the number of affected rows.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result[0];
};

const deleteJobsites = async (JobsiteModel, JobsiteData) => {
  removeEmptyValues(JobsiteData);

  const keyValuesArr = processKeyValues(Object.keys(JobsiteData), JobsiteData);

  const options = setDeleteOptions(keyValuesArr);

  const result = await JobsiteModel.destroy({
    where: options,
  });

  //Destroy() returns a number for how many rows where affected.
  //Sequelize doesn't return anything else for MySQL.
  return "Updated rows: " + result;
};

module.exports = {
  getJobsites,
  createJobsite,
  updateJobsites,
  deleteJobsites,
};
