const service = require("../services/materials.service");
const asyncWrapper = require("../middleware/asyncWrapper"); //Try Catch wrapper

const getMaterials = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query;
  const { materials } = req.models;

  const { result, metadata } = await service.getMaterials(
    materials,
    page,
    limit
  );

  res.status(200).json({ status: "Success!", result, pagination: metadata });
});

const createMaterial = asyncWrapper(async (req, res, next) => {
  const { postBody } = req.body;
  const { materials } = req.models;

  const result = await service.createMaterial(materials, postBody);

  res.status(201).json({ status: "Success!", result });
});

const updateMaterials = asyncWrapper(async (req, res, next) => {
  const { putBody, useEmpty } = req.body;
  const { materials } = req.models;

  const result = await service.updateMaterials(materials, putBody, useEmpty);

  res.status(200).json({ status: "Success!", result });
});

const deleteMaterials = asyncWrapper(async (req, res, next) => {
  const { deleteBody } = req.body;
  const { materials } = req.models;

  const result = await service.deleteMaterials(materials, deleteBody);

  res.status(200).json({ status: "Success!", result });
});

module.exports = {
  getMaterials,
  createMaterial,
  updateMaterials,
  deleteMaterials,
};
