const express = require("express");
const router = express.Router();
const {
  getMaterials,
  createMaterial,
  updateMaterials,
  deleteMaterials,
} = require("../controllers/materials.controller");

router
  .route("/materials")
  .get(getMaterials)
  .post(createMaterial)
  .put(updateMaterials)
  .delete(deleteMaterials);

module.exports = router;
