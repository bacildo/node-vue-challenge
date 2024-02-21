const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/students");

router.get("/", getStudents);
router.get("/:id", getStudentsById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
