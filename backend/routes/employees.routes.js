const express = require("express");
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
} = require("../controllers/employees.controller");

router
  .route("/employees")
  .get(getEmployees)
  .post(createEmployee)
  .put(updateEmployees)
  .delete(deleteEmployees);

module.exports = router;
