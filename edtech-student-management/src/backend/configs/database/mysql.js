const mysql = require("mysql2");

async function createConnection() {
  try {
    const mysqlConnection = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: "dev",
      password: "dev",
      database: "students_management",
    });

    await new Promise((resolve, reject) => {
      mysqlConnection.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.release();
          resolve();
        }
      });
    });

    console.log(
      `Connected to mysql database, ${mysqlConnection.config.connectionConfig.database}`
    );

    return mysqlConnection;

  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
}

module.exports = createConnection();


