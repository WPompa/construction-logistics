const { AppError } = require("../utils/AppError");
const getPagination = require("../utils/paginationHelper");
const tables = require("../utils/RawQueries");

const getOther = async (sequelize, tableName, currentPage, currentLimit) => {
  //Will return [ { Count: <number> } ]
  const [total] = await sequelize.query(tables[tableName].count);

  const { offset, limit, metadata } = getPagination(
    currentPage,
    currentLimit,
    total.Count
  );

  const [result] = await sequelize.query(tables[tableName].query, {
    offset,
    limit,
  });

  //If pagination works as intended this snippet might never be used.
  if (result.length === 0) {
    throw new AppError("No Data For Selected Page", 200);
  }

  return { result, metadata };
};
