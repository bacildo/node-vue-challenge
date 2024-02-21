const {
  getStudentsQuery,
  getStudentsByIdQuery,
  createStudentQuery,
  updateStudentQuery,
  deleteStudentQuery,
} = require("../repositories/students");

const getStudents = async (req, res) => {
  try {
    const students = await getStudentsQuery();
    res.json(students);
  } catch (error) {
    console.error("Error getting student list:", error);
    res.status(500).json({ error: "Error getting student list" });
  }
};

const getStudentsById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await getStudentsByIdQuery(id);
    res.json(student);
  } catch (error) {
    console.error("Error getting student:", error);
    res.status(500).json({ error: "Error getting students" });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = req.body;
    const newStudent = await createStudentQuery(student);
    res.json(newStudent);
  } catch (error) {
    console.error("Error creating student", error);
    res.status(500).json({ error: "Error creating student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = req.body;
    await updateStudentQuery(id, student);
    res.json({ message: "Succesfully updated the student" });
  } catch (error) {
    console.error("Error updating student list:", error);
    res.status(500).json({ error: "Error updating student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteStudentQuery(id);
    res.json({ message: "Succesfully deleted the student" });
  } catch (error) {
    console.error("Error deleting student list:", error);
    res.status(500).json({ error: "Error updating student" });
  }
};

module.exports = {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
};
