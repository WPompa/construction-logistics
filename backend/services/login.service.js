const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const login = async (sequelize, username, password) => {
  const result = await sequelize.query(
    `SELECT username, password FROM credentialss WHERE username = :username AND password = :password`,
    {
      replacements: { username, password },
      type: QueryTypes.SELECT,
    },
  );

  if (result.length !== 1) {
    return { status: "Failure!", result: false };
  }

  return { status: "Success!", result: true };
};

module.exports = login;
