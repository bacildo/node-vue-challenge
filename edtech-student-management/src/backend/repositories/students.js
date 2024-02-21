const mysqlConnection = require("../configs/database/mysql");
const {
  createConnection,
  query,
  closeConnection,
} = require("../configs/database/mysql");

async function getStudentsQuery() {
  const connection = await createConnection();

  // try {
  //   const [rows] = await connection.query("SELECT * FROM students");
  //   return rows;
  // } catch (error) {
  //   console.error("Error executing query:", error);
  //   throw error;
  // } finally {
  //   connection.release();
  // }

  // await createConnection();
  try {
    const rows = await query("SELECT * FROM students");
    return rows;
  } catch (err) {
    console.error("Error getting alunos:", err);
    throw err;
  } finally {
    if (connection) {
      closeConnection();
    }
  }
}

async function getStudentsByIdQuery(id) {
  const [rows] = await mysqlConnection.query(
    "SELECT * FROM alunos WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function createStudentQuery(aluno) {
  const [result] = await mysqlConnection.query("INSERT INTO students SET ?", [
    aluno,
  ]);
  return { id: result.insertId, ...aluno };
}

async function updateStudentQuery(id, aluno) {
  await mysqlConnection.query("UPDATE students SET ? WHERE id = ?", [
    aluno,
    id,
  ]);
  return { id, ...aluno };
}

async function deleteStudentQuery(id) {
  await mysqlConnection.query("DELETE FROM students WHERE id = ?", [id]);
}

module.exports = {
  getStudentsQuery,
  getStudentsByIdQuery,
  createStudentQuery,
  updateStudentQuery,
  deleteStudentQuery,
};
