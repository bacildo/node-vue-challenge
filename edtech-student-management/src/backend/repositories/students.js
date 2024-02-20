const mysqlConnection = require("../configs/database/mysql.js");

async function getStudents() {
  const [rows] = await mysqlConnection.query("SELECT * FROM alunos");
  return rows;
}

async function getStudentsById(id) {
  const [rows] = await mysqlConnection.query(
    "SELECT * FROM alunos WHERE id = ?",
    [id]
  );
  return rows[0];
}

async function createStudent(aluno) {
  const [result] = await mysqlConnection.query("INSERT INTO alunos SET ?", [
    aluno,
  ]);
  return { id: result.insertId, ...aluno };
}

async function updateStudent(id, aluno) {
  await mysqlConnection.query("UPDATE alunos SET ? WHERE id = ?", [aluno, id]);
  return { id, ...aluno };
}

async function deleteStudent(id) {
  await mysqlConnection.query("DELETE FROM alunos WHERE id = ?", [id]);
}

module.exports = {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
};
