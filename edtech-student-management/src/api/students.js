const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const addStudent = (student) => {
  return api.post('/students', student);
};

const updateStudent = (student) => {
  return api.put(`/students/${student.id_student}`, student);
};

const deleteStudent = (id_student) => {
  return api.delete(`/students/${id_student}`);
};

const getStudents = () => {
  return api.get('/students');
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getStudents,
};
