<template>
  <v-card >
    <v-card-title class="h1">Módulo Acadêmico</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="student in students" :key="student.id_student" class="aluno-card">
          <v-list-item-content>
            <v-list-item-title>{{ student.name }}</v-list-item-title>
            <v-list-item-subtitle
              >Matrícula: {{ student.register }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >CPF: {{ student.cpf }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >E-mail: {{ student.email }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="editarAluno(aluno.id)">Editar</v-btn>
            <v-btn @click="excluirAluno(aluno.id)">Excluir</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="adicionarAluno">Adicionar Aluno</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const httpRequest = require("../api/students");
import '@/assets/styles.css'
export default {
  data() {
    return {
      students: [],
    };
  },
  methods: {
    async carregarAlunos() {
      try {
        const response = await httpRequest.get("/students");
        console.log(response)
        this.students = response.data;
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
      }
    },
    async adicionarAluno(aluno) {
      try {
        const response = await httpRequest.post("/alunos", aluno);
        console.log("Aluno adicionado com sucesso:", response.data);
        // Atualize a lista de alunos após adicionar um novo aluno
        this.carregarAlunos();
      } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
      }
    },
    async editarAluno(aluno) {
      try {
        const response = await httpRequest.put(`/alunos/${aluno.id}`, aluno);
        console.log("Aluno editado com sucesso:", response.data);
        // Atualize a lista de alunos após editar o aluno
        this.carregarAlunos();
      } catch (error) {
        console.error("Erro ao editar aluno:", error);
      }
    },
    async excluirAluno(id) {
      try {
        await httpRequest.delete(`/alunos/${id}`);
        console.log("Aluno excluído com sucesso");
        // Atualize a lista de alunos após excluir o aluno
        this.carregarAlunos();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    },
  },
  created() {
    this.carregarAlunos();
  },
};
</script>
