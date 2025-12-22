"use strict";
const express = require("express");
const cors = require("cors");
const dbConnection = require("./middleware/dbConnection");
const auth = require("./middleware/auth");
const { connectToDB, sequelize } = require("./config/connect");
const app = express();
require("dotenv").config();

const allowedOrigins = [process.env.FRONTEND_URL, process.env.DEV_URL];
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
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
};

///// Middleware /////
app.use(express.json());

app.use(cors(corsOptions));

app.use(dbConnection);

app.use("/login", auth);

///// Routes /////
const baseRoute = "/api/v1/";

const employees = require("./routes/employees.routes");
app.use(baseRoute, employees);

const materials = require("./routes/materials.routes");
app.use(baseRoute, materials);

const jobsites = require("./routes/jobsites.routes");
app.use(baseRoute, jobsites);

const storage_areas = require("./routes/storage_areas.routes");
app.use(baseRoute, storage_areas);

const stored_in = require("./routes/stored_in.routes");
app.use(baseRoute, stored_in);

const other = require("./routes/other");
app.use(baseRoute, other);

const notFound = require("./routes/notFound");
app.use("/{*any}", notFound);

///// Error Handler /////
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

///////////////////////////////////////////////////

//For development
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

module.exports = app;
