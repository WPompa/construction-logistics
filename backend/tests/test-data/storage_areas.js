const postTestData = [
  {
    body: {
      StorageAreaID: "5",
      Length: "55",
      Width: "55",
      Height: "55",
      Location: "Laydown 5",
      JobsiteID: "1",
      TotalStored: "5",
      Is_container: "1",
    },
  },
  {
    body: {
      StorageAreaID: "6",
      Length: "66",
      Width: "66",
      Height: "66",
      Location: "Laydown 6",
      JobsiteID: "2",
      TotalStored: "6",
      Is_container: "0",
    },
  },
];

const putTestData = [
  {
    body: {
      StorageAreaID: "5",
      Length: "56",
      Width: "56",
      Height: "56",
      Location: "",
      JobsiteID: "",
      TotalStored: "56",
      Is_container: "0",
    },
    table: "storage_areas",
    useEmpty: {},
  },
];

const deleteTestData = [
  {
    body: {
      StorageAreaID: "5,6",
      Length: "",
      Width: "",
      Height: "",
      Location: "",
      JobsiteID: "",
      TotalStored: "",
      Is_container: "",
    },
  },
];

module.exports = [postTestData, putTestData, deleteTestData];
