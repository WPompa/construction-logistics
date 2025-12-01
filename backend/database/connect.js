const mysql = require("mysql2/promise"); //Possible to change to mysql2 w/ no promises
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      idle: 60000,
      acquire: 60000,
      evict: 1000,
    },
    logging: false,
    define: {
      timestamps: false,
    },
    //ssl?
    //port?
  }
);

//Unused
function connectToDB() {
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
}

/* var connection = mysql.createConnection(credentials); //mysql2 no promise version

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the MySQL database.");
});
*/
module.exports = { connectToDB, sequelize };
