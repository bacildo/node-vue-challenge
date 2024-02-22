const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/students");

// Rota para buscar todos os alunos
router.get('/students', getStudents);

// Rota para buscar um aluno específico
router.get('/students/:id', getStudentsById);

// Rota para criar um novo aluno
router.post('/students', createStudent);

// Rota para atualizar um aluno existente
router.put('/students/:id', updateStudent);

// Rota para excluir um aluno
router.delete('/students/:id', deleteStudent);

module.exports = router;
