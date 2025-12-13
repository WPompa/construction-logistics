"use strict";
const express = require("express");
const app = express();
app.use(express.json());
//Look into whether I need to use express.urlencoded();
//Look into whether I need to use express.static();
require("dotenv").config();

const cors = require("cors");
const allowedOrigins = [process.env.FRONTEND_URL, process.env.DEV_URL];
console.log("CORS Allowed: ", allowedOrigins);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("Allowed Origin: ", origin);
      callback(null, true);
    } else {
      console.log("Blocked Origin: ", origin);

      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

/* const { connectToDB, sequelize } = require("./database/connect"); */
//require("./models/index");
//require("./models/employees.model");

const dbConnection = require("./middleware/dbConnection");
app.use(dbConnection);

const auth = require("./routes/auth");
app.use("/login", auth);

const tables = require("./routes/tables");
app.use("/api/v1/", tables);

const other = require("./routes/other");
app.all("/{*any}", other);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

///////////////////////////////////////////////////

//Uncomment for development
/* async function start() {
  try {
    // await connectToDB();
    // await sequelize.authenticate();
    console.log("Connected to the MySQL database.");

    app.listen(8081, () => {
      console.log("Server listening...");
    });
  } catch (error) {
    console.log(error);
    console.log("Server Initialization Aborted.");
  }
}

start(); */

/* console.log("models: ");
console.log(sequelize.models); */

module.export = app;
