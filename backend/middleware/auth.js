"use strict";
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body.login;
  const values = [{ username }, { password }]; // username : username123 for WHERE "username" = "username123"?
  const sqlQuery = `SELECT username, password FROM credentials WHERE ? AND ?`;
  console.log(values);

  connection.query(sqlQuery, values, (err, data) => {
    if (!err && data[0]) {
      console.log(data[0].username);
      console.log(username);
      if (username === data[0].username && password === data[0].password) {
        return res.json(true);
      }
      return res.json(false);
    } else if (err) {
      console.log(err);
      res.send(err);
    }
    return res.json(false);
  });
});

module.exports = router;
