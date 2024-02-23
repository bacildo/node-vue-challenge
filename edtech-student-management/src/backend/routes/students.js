const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/students");


router.get('/students', getStudents);


router.get('/students/:id', getStudentsById);

router.post('/students', createStudent);


router.put('/students/:id', updateStudent);


router.delete('/students/:id', deleteStudent);

module.exports = router;
