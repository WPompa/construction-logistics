const postTestData = [
  {
    body: {
      JobsiteID: "4",
      JobsiteName: "Acme",
    },
  },
  {
    body: {
      JobsiteID: "5",
      JobsiteName: "Insulation Corp",
    },
  },
];

const putTestData = [
  {
    body: {
      JobsiteID: "5",
      JobsiteName: "Insulation Industries",
    },
    table: "jobsites",
    useEmpty: {},
  },
];

const deleteTestData = [
  {
    body: {
      JobsiteID: "4, 5",
      JobsiteName: "",
    },
  },
];

module.exports = [postTestData, putTestData, deleteTestData];
