//I need to look up these packages and get an overview of how they work. Delete comment after.
const express = require("express");
const app = express();
app.use(express.json()); //allows req.body to be used by parsing the req data.
//Look into whether I need to use express.urlencoded();
//Look into whether I need to use express.static();
const cors = require("cors");
app.use(cors()); //allows cross origin domain stuff. need to learn.

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
    app.listen(8081, () => {
      console.log("Server listening...");
    });
  } catch (error) {
    console.log(error);
    console.log("Server Initialization Aborted.");
  }
}

start();
/* sequelize
  .sync()
  .then(() => sequelize.authenticate())
  .then(() =>
    app.listen(8081, () => {
      console.log("Server listening...");
    })
  )
  .catch((err) => console.log(err)); */
console.log("models: ");
console.log(sequelize.models);
