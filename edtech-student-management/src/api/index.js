import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api' // URL da sua API
});

export const getAlunos = () => api.get('/alunos');
export const getAluno = id => api.get(`/alunos/${id}`);
export const adicionarAluno = aluno => api.post('/alunos', aluno);
export const editarAluno = (id, aluno) => api.put(`/alunos/${id}`, aluno);
export const excluirAluno = id => api.delete(`/alunos/${id}`);

export default api;