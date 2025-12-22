const service = require("../services/stored_in.service");
const asyncWrapper = require("../middleware/asyncWrapper"); //Try Catch wrapper

const getStored_In = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query;
  const { stored_in } = req.models;

  const { result, metadata } = await service.getStored_In(
    stored_in,
    page,
    limit
  );

  res.status(200).json({ status: "Success!", result, pagination: metadata });
});

const createStored_In = asyncWrapper(async (req, res, next) => {
  const { postBody } = req.body;
  const { stored_in } = req.models;

  const result = await service.createStored_In(stored_in, postBody);

  res.status(201).json({ status: "Success!", result });
});

const updateStored_In = asyncWrapper(async (req, res, next) => {
  const { putBody, useEmpty } = req.body;
  const { stored_in } = req.models;

  const result = await service.updateStored_In(stored_in, putBody, useEmpty);

  res.status(200).json({ status: "Success!", result });
});

const deleteStored_In = asyncWrapper(async (req, res, next) => {
  const { deleteBody } = req.body;
  const { stored_in } = req.models;

  const result = await service.deleteStored_In(stored_in, deleteBody);

  res.status(200).json({ status: "Success!", result });
});

module.exports = {
  getStored_In,
  createStored_In,
  updateStored_In,
  deleteStored_In,
};
