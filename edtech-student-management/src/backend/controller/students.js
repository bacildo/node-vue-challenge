const {
  getStudents,
  getStudentsById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../repositories/students.js");


app.get('/students', async (req, res) => {
  const students = await getStudents();
  res.json(students);
});

app.get('/api/alunos/:id', async (req, res) => {
  const id = req.params.id;
  const aluno = await getStudentsById(id);
  res.json(aluno);
});

app.post('/api/alunos', async (req, res) => {
  const aluno = req.body;
  const novoAluno = await createStudent(aluno);
  res.json(novoAluno);
});

app.put('/api/alunos/:id', async (req, res) => {
  const id = req.params.id;
  const aluno = req.body;
  await updateStudent(id, aluno);
  res.json({ message: 'Aluno atualizado com sucesso' });
});

app.delete('/api/alunos/:id', async (req, res) => {
  const id = req.params.id;
  await deleteStudent(id);
  res.json({ message: 'Aluno excluído com sucesso' });
});


