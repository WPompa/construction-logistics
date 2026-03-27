const postTestData = [
  {
    body: {
      MaterialID: "5",
      Name: "Sealing Glue",
      MaterialType: "Glue",
      Length: "2",
      Width: "2",
      Height: "2",
      SupplierName: "Glue Industries",
      TotalAvailable: "10",
      LostAmounts: "0",
    },
  },
  {
    body: {
      MaterialID: "6",
      Name: "Widget A",
      MaterialType: "Widget",
      Length: "6",
      Width: "6",
      Height: "6",
      SupplierName: "Widget Makers",
      TotalAvailable: "100",
      LostAmounts: "",
    },
  },
];

const putTestData = [
  {
    body: {
      MaterialID: "5",
      Name: "",
      MaterialType: "",
      Length: "",
      Width: "",
      Height: "",
      SupplierName: "Glue Corp",
      TotalAvailable: "",
      LostAmounts: "",
    },
    table: "",
    useEmpty: {},
  },
];

const deleteTestData = [
  {
    body: {
      MaterialID: "5, 6",
      Name: "",
      MaterialType: "",
      Length: "",
      Width: "",
      Height: "",
      SupplierName: "",
      TotalAvailable: "",
      LostAmounts: "",
    },
  },
];

module.exports = [postTestData, putTestData, deleteTestData];
