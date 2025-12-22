const express = require("express");
const router = express.Router();
const {
  getStorage_Areas,
  createStorage_Area,
  updateStorage_Areas,
  deleteStorage_Areas,
} = require("../controllers/storage_areas.controller");

router
  .route("/storageareas")
  .get(getStorage_Areas)
  .post(createStorage_Area)
  .put(updateStorage_Areas)
  .delete(deleteStorage_Areas);

module.exports = router;
