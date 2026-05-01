const service = require("../services/employees.service");
const asyncWrapper = require("../middleware/asyncWrapper"); //Try Catch wrapper

const getEmployees = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query;
  const { employees } = req.models;
  const sequelize = req.sequelize;

  const { result, metadata } = await service.getEmployees(
    sequelize,
    employees,
    page,
    limit,
  );

  res.status(200).json({ status: "Success!", result, pagination: metadata });
});

const createEmployee = asyncWrapper(async (req, res, next) => {
  const { body } = req.body;
  const { employees } = req.models;

  const result = await service.createEmployee(employees, body);

  //console.log(JSON.stringify(result));
  res.status(201).json({ status: "Success!", result });
});

const updateEmployees = asyncWrapper(async (req, res, next) => {
  const { body, useEmpty } = req.body;
  const { employees } = req.models;

  const result = await service.updateEmployees(employees, body, useEmpty);

  res.status(200).json({ status: "Success!", result });
});

const deleteEmployees = asyncWrapper(async (req, res, next) => {
  const { body } = req.body;
  const { employees } = req.models;

  const result = await service.deleteEmployees(employees, body);

  res.status(200).json({ status: "Success!", result });
});

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
};
