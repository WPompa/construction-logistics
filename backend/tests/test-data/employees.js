const postTestData = [
  {
    body: {
      EmpID: "21",
      Fname: "Test",
      Lname: "Dummy",
      Title: "Tester",
      SupervisorID: "1",
      JobsiteID: "1",
    },
  },
  {
    body: {
      EmpID: "22",
      Fname: "testing",
      Lname: "Dummy",
      Title: "Tester",
      SupervisorID: "1",
      JobsiteID: "1",
    },
  },
];

const putTestData = [
  {
    body: {
      EmpID: "21",
      Fname: "testing",
      Lname: "Dummies",
      Title: "APITester",
      SupervisorID: "2",
      JobsiteID: "2",
    },
    table: "employees",
    useEmpty: {},
  },
];

const deleteTestData = [
  {
    body: {
      EmpID: "",
      Fname: "testing",
      Lname: "",
      Title: "",
      SupervisorID: "",
      JobsiteID: "",
    },
  },
];

module.exports = [postTestData, putTestData, deleteTestData];
