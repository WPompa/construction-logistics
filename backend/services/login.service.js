const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const login = async (sequelize, username, password) => {
  const result = await sequelize.query(
    `SELECT AccountID, Username, Password FROM credentials WHERE username = :username AND password = :password`,
    {
      replacements: { username, password },
      type: QueryTypes.SELECT,
    },
  );

  if (result.length !== 1) {
    return { status: "Failure!", result: false, token: null };
  }

  const user = result[0];

  const token = jwt.sign(
    { AccountID: user.AccountID, username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
  );

  return { status: "Success!", result: true, token };
};

module.exports = login;
