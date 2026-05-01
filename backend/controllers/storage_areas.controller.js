const service = require("../services/storage_areas.service");
const asyncWrapper = require("../middleware/asyncWrapper"); //Try Catch wrapper

const getStorage_Areas = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query;
  const { storage_areas } = req.models;
  const sequelize = req.sequelize;

  const { result, metadata } = await service.getStorage_Areas(
    sequelize,
    storage_areas,
    page,
    limit,
  );

  res.status(200).json({ status: "Success!", result, pagination: metadata });
});

const createStorage_Area = asyncWrapper(async (req, res, next) => {
  const { body } = req.body;
  const { storage_areas } = req.models;

  const result = await service.createStorage_Area(storage_areas, body);

  //console.log(JSON.stringify(result));
  res.status(201).json({ status: "Success!", result });
});

const updateStorage_Areas = asyncWrapper(async (req, res, next) => {
  const { body, useEmpty } = req.body;
  const { storage_areas } = req.models;

  const result = await service.updateStorage_Areas(
    storage_areas,
    body,
    useEmpty,
  );

  res.status(200).json({ status: "Success!", result });
});

const deleteStorage_Areas = asyncWrapper(async (req, res, next) => {
  const { body } = req.body;
  const { storage_areas } = req.models;

  const result = await service.deleteStorage_Areas(storage_areas, body);

  res.status(200).json({ status: "Success!", result });
});

module.exports = {
  getStorage_Areas,
  createStorage_Area,
  updateStorage_Areas,
  deleteStorage_Areas,
};
