const service = require("../services/employees.service");
const asyncWrapper = require("../middleware/asyncWrapper"); //Try Catch wrapper

const getEmployees = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query;
  const { employees } = req.models;

  const { result, metadata } = await service.getEmployees(
    employees,
    page,
    limit
  );

  res.status(200).json({ status: "Success!", result, pagination: metadata });
});

const createEmployee = asyncWrapper(async (req, res, next) => {
  const { postBody } = req.body;
  const { employees } = req.models;

  const result = await service.createEmployee(employees, postBody);

  //console.log(JSON.stringify(result));
  res.status(201).json({ status: "Success!", result });
});

const updateEmployees = asyncWrapper(async (req, res, next) => {
  const { putBody, useEmpty } = req.body;
  const { employees } = req.models;

  const result = await service.updateEmployees(employees, putBody, useEmpty);

  res.status(200).json({ status: "Success!", result });
});

const deleteEmployees = asyncWrapper(async (req, res, next) => {
  const { deleteBody } = req.body;
  const { employees } = req.models;

  const result = await service.deleteEmployees(employees, deleteBody);

  res.status(200).json({ status: "Success!", result });
});

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
};
