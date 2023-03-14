// SQL using
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_demo",
//   password: "root",
//   port: 3307,
// });
// module.exports = pool.promise();

// Sequelize using
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_demo", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: 3307,
});

module.exports = sequelize;
