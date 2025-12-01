const express = require("express");
const router = express.Router();
const {
  getTable,
  createTableRow,
  updateTableRow,
  deleteTableRow,
} = require("../controllers/tables");

///////////////////////////////////////////////////

router.get("/tables", getTable);

///////////////////////////////////////////////////
//Needs more code here related to post, for now console to check.
router.post("/", createTableRow);

///////////////////////////////////////////////////

router.put("/", updateTableRow);

///////////////////////////////////////////////////

router.delete("/", deleteTableRow);

//Alt router.route("/").post(createTableRow).put(updateTableRow).delete(deleteTableRow);

module.exports = router;
