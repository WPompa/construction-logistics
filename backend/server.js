"use strict";
const express = require("express");
const app = express();
app.use(express.json());
//Look into whether I need to use express.urlencoded();
//Look into whether I need to use express.static();
const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    optionsSuccessStatus: 200,
  })
);

require("dotenv").config();

const { connectToDB, sequelize } = require("./database/connect");
require("./models/index");
//require("./models/employees.model");

const auth = require("./routes/auth");
app.use("/login", auth);

const tables = require("./routes/tables");
app.use("/api/v1/", tables);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

///////////////////////////////////////////////////

async function start() {
  try {
    // await connectToDB();
    await sequelize.authenticate();
    console.log("Connected to the MySQL database.");
    //Uncomment for development
    /* app.listen(8081, () => {
      console.log("Server listening...");
    }); */
  } catch (error) {
    console.log(error);
    console.log("Server Initialization Aborted.");
  }
}

start();

console.log("models: ");
console.log(sequelize.models);

module.export = app;
