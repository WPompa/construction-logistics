const postTestData = [
  {
    body: {
      StorageAreaID: "1",
      MaterialID: "2",
      Amount: "123",
    },
  },
  {
    body: {
      StorageAreaID: "2",
      MaterialID: "1",
      Amount: "12345",
    },
  },
];

const putTestData = [
  {
    body: {
      StorageAreaID: "1",
      MaterialID: "2",
      Amount: "12345",
    },
    table: "stored_in",
    useEmpty: {},
  },
];

const deleteTestData = [
  {
    body: {
      StorageAreaID: "",
      MaterialID: "",
      Amount: "12345",
    },
  },
];

module.exports = [postTestData, putTestData, deleteTestData];
