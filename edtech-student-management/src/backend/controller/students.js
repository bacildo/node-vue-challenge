const {
  getStudentsQuery,
  getStudentsByIdQuery,
  createStudentQuery,
  updateStudentQuery,
  deleteStudentQuery,
} = require("../repositories/students");

const getStudents = async (req, res) => {
  try {
    const students = await getStudentsQuery()
    res.json(students);
  } catch (error) {
    console.error("Error getting alunos:", error);
    res.status(500).json({ error: "Error getting alunos" });
  }
};

const getStudentsById = async (req, res) => {
  const id = req.params.id;
  const student = await getStudentsById(id);
  res.json(student);
};

const createStudent = async (req, res) => {
  const student = req.body;
  const newStudent = await createStudent(student);
  res.json(newStudent);
};

const updateStudent = async (req, res) => {
  const id = req.params.id;
  const student = req.body;
  await updateStudent(id, student);
  res.json({ message: "Succesfully updated the student" });
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  await deleteStudent(id);
  res.json({ message: "Succesfully deleted the student" });
};

module.exports = {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
};
