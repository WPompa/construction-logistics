//const mysql = require("mysql2/promise"); //Possible to change to mysql2 w/ no promises
const { Sequelize, DataTypes } = require("sequelize");
const Models = require("../models/");

let sequelize = null;

async function connectToDB() {
  if (sequelize) {
    console.log("Using cached database connection.");
    return { sequelize, models: sequelize.models };
  }

  console.log("Establishing new connection to database.");

  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT || 3306,
      dialect: "mysql",
      pool: {
        max: 5,
        idle: 2000,
        acquire: 30000,
        evict: 2500,
      },
      logging: false,
      define: {
        timestamps: false,
      },
      dialectModule: require("mysql2"),
      //ssl?
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection Established.");

    Models(sequelize, DataTypes);
  } catch (error) {
    console.error("Connection Failed: ", error);
    sequelize = null;
    throw error;
  }

  return { sequelize, models: sequelize.models };
}

//Unused for production, but used for development testing
/* function connectToDB() {
  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
} */

/* var connection = mysql.createConnection(credentials); //mysql2 no promise version

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the MySQL database.");
});
*/
module.exports = connectToDB;
