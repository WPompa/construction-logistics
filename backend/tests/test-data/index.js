const employeesTestData = require("./employees");
const materialsTestData = require("./materials");
const jobsitesTestData = require("./jobsites");
const storage_areasTestData = require("./storage_areas");
const stored_inTestData = require("./stored_in");

module.exports = [
  {
    modelName: "Employees",
    routeEndpoint: "employees",
    testDataArr: employeesTestData,
  },
  {
    modelName: "Materials",
    routeEndpoint: "materials",
    testDataArr: materialsTestData,
  },
  {
    modelName: "Jobsites",
    routeEndpoint: "jobsites",
    testDataArr: jobsitesTestData,
  },
  {
    modelName: "Storage Areas",
    routeEndpoint: "storageareas",
    testDataArr: storage_areasTestData,
  },
  {
    modelName: "Stored In",
    routeEndpoint: "storedin",
    testDataArr: stored_inTestData,
  },
];
