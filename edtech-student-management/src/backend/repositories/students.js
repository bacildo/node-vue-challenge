const {
  createConnection,
  query,
  closeConnection,
} = require("../configs/database/mysql");

async function getStudentsQuery() {
  const connection = await createConnection();
  try {
    const rows = await query("SELECT * FROM students");
    return rows;
  } catch (err) {
    console.error("Error getting student list:", err);
    throw err;
  } finally {
    if (connection) {
      closeConnection();
    }
  }
}
async function getStudentsByIdQuery(id) {
  const connection = await createConnection();
  try {
    const rows = await query("SELECT * FROM students WHERE id_student = ?", [id]);
    return rows[0];
  } catch (err) {
    console.error("Error getting student:", err);
    throw err;
  } finally {
    if (connection) {
      closeConnection();
    }
  }
}
async function createStudentQuery(student) {
  const connection = await createConnection();
  try {
    const createStudentQuery = "INSERT INTO students (name, register, cpf, email) VALUES (?, ?, ?, ?)";
    const result = await query(createStudentQuery, [student.name, student.register, student.cpf, student.email]);
    return result;
  } catch (err) {
    console.error("Error creating student:", err);
    throw err;
  } finally {
    if (connection) {
      closeConnection();
    }
  }
}


async function updateStudentQuery(id, student) {
  const connection = await createConnection();

  try {
    await query("UPDATE students SET ? WHERE id_student = ?", [student, id]);
    return { id, ...student };
  } catch (err) {
    console.error("Error updating student:", err);
    throw err;
  } finally {
    if (connection) {
      closeConnection();
    }
  }
}

async function deleteStudentQuery(id) {
  const connection = await createConnection();
  try {
    await query("DELETE FROM students WHERE id_student = ?", [id]);
  } catch (err) {
    console.error("Error deleting student:", err);
    throw err;
  } finally {
    if (connection) {
      closeConnection();
    }
  }
}

module.exports = {
  getStudentsQuery,
  getStudentsByIdQuery,
  createStudentQuery,
  updateStudentQuery,
  deleteStudentQuery,
};
