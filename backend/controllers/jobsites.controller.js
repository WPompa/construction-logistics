const service = require("../services/jobsites.service");
const asyncWrapper = require("../middleware/asyncWrapper"); //Try Catch wrapper

const getJobsites = asyncWrapper(async (req, res, next) => {
  const { page, limit } = req.query;
  const { jobsites } = req.models;

  const { result, metadata } = await service.getJobsites(jobsites, page, limit);

  res.status(200).json({ status: "Success!", result, pagination: metadata });
});

const createJobsite = asyncWrapper(async (req, res, next) => {
  const { body } = req.body;
  const { jobsites } = req.models;

  const result = await service.createJobsite(jobsites, body);

  res.status(201).json({ status: "Success!", result });
});

const updateJobsites = asyncWrapper(async (req, res, next) => {
  const { body, useEmpty } = req.body;
  const { jobsites } = req.models;

  const result = await service.updateJobsites(jobsites, body, useEmpty);

  res.status(200).json({ status: "Success!", result });
});

const deleteJobsites = asyncWrapper(async (req, res, next) => {
  const { body } = req.body;
  const { jobsites } = req.models;

  const result = await service.deleteJobsites(jobsites, body);

  res.status(200).json({ status: "Success!", result });
});

module.exports = {
  getJobsites,
  createJobsite,
  updateJobsites,
  deleteJobsites,
};
