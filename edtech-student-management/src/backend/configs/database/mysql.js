const mysql = require("mysql2/promise");

let mysqlPool;

async function createConnection() {
  mysqlPool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "dev",
    password: "dev",
    database: "students_management",
  });

  try {
    await mysqlPool.getConnection();
    console.log("Connected to mysql database");
    return mysqlPool;
  } catch (err) {
    console.error("Error connecting to database", err);
    throw err;
  }
}

async function query(sql, values) {
  if (!mysqlPool) {
    throw new Error("Database connection not established");
  }

  try {
    const [rows, fields] = await mysqlPool.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

async function closeConnection() {
  if (mysqlPool) {
    await mysqlPool.end();
    console.log("Connection to mysql database closed");
  }
}

module.exports = {
  createConnection,
  query,
  closeConnection,
};
