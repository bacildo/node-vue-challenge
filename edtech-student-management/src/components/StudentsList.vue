<template>
  <v-card>
    <v-card-title class="h1">Módulo Acadêmico</v-card-title>

    <v-card-text v-if="showStudentList">
      <v-list>
        <v-list-item
          v-for="student in students"
          :key="student.id_student"
          class="student-card"
        >
          <v-list-item-content>
            <v-list-item-title>{{ student.name }}</v-list-item-title>
            <v-list-item-subtitle
              >Matrícula: {{ student.register }}</v-list-item-subtitle
            >
            <v-list-item-subtitle>CPF: {{ student.cpf }}</v-list-item-subtitle>
            <v-list-item-subtitle
              >E-mail: {{ student.email }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="updateStudent(student)">Editar</v-btn>
            <v-btn @click="deleteStudent(student.id_student)">Excluir</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-alert v-if="showAlertOnDelete" type="success" dismissible>
      Aluno excluído com sucesso!
    </v-alert>

    <v-alert v-if="showAlertOnSave" type="success" dismissible>
      Aluno salvo com sucesso!
    </v-alert>

    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="showStudentList = false">Voltar</v-btn>
    </v-card-actions> -->
    <v-card-actions>
      <v-btn @click="toggleListaAlunos">{{
        showStudentList ? "Ocultar Alunos" : "Mostrar Alunos"
      }}</v-btn>
      <v-btn @click="createStudent(student)">Criar Aluno</v-btn>
    </v-card-actions>

    <!-- Modal de edição -->
    <v-dialog v-model="showEditModal" max-width="500px">
      <v-card>
        <v-card-title>Editar Aluno</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nome"
            v-model="editedStudent.name"
          ></v-text-field>
          <v-text-field
            label="Matrícula"
            v-model="editedStudent.register"
          ></v-text-field>
          <v-text-field label="CPF" v-model="editedStudent.cpf"></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="editedStudent.email"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="saveUpdateStudent">Salvar</v-btn>
          <v-btn color="red darken-1" @click="cancelUpdate">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de criação -->
    <v-dialog v-model="showCreateModal" max-width="500px">
      <v-card>
        <v-card-title>Criar Aluno</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nome"
            v-model="createdStudent.name"
          ></v-text-field>
          <v-text-field
            label="Matrícula"
            v-model="createdStudent.register"
          ></v-text-field>
          <v-text-field label="CPF" v-model="createdStudent.cpf"></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="createdStudent.email"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="saveStudent(createdStudent)"
            >Salvar</v-btn
          >
          <v-btn color="red darken-1" @click="cancelSaveStudent">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
const httpRequest = require("../api/students");
import "@/assets/styles.css";
export default {
  data() {
    return {
      students: [],
      showStudentList: false,
      showAlertOnDelete: false,
      showAlertOnSave: false,
      editedStudent: {}, // Armazena as informações do aluno em edição
      showEditModal: false, // Controla a modal de editing
      showCreateModal: false,
      createdStudent: {
        name: "",
        register: "",
        cpf: "",
        email: "",
      },
    };
  },
  methods: {
    async carregarAlunos() {
      try {
        const response = await httpRequest.get("/students");
        this.students = response.data;
      } catch (error) {
        console.error("Error while loading students:", error);
      }
    },
    async saveStudent(student) {
      try {
        const response = await httpRequest.post("/students", student);
        console.log("Student created:", response.data);
        this.showAlertOnSave = true;
        this.carregarAlunos();

        setTimeout(() => {
          this.showAlertOnSave = false;
        }, 3000); // 3 segundos        this.showCreateModal = false;
      } catch (error) {
        console.error("Error to save the student:", error);
      }
    },

    updateStudent(student) {
      this.editedStudent = { ...student }; // Clona os dados do aluno para a variável editedStudent
      this.showEditModal = true; // Abre o modal de edição
    },

    createStudent(student) {
     
      this.createdStudent = { ...student }; // Clona os dados do aluno para a variável createdStudent
      this.showCreateModal = true; // Abre o modal de criação
    },

    async saveUpdateStudent() {
      try {
        const response = await httpRequest.put(
          `/students/${this.editedStudent.id_student}`,
          this.editedStudent
        );
        console.log("Student updated:", response.data);
        this.carregarAlunos(); // Atualize a lista de alunos após salvar as alterações
        this.showEditModal = false; // Feche o modal
      } catch (error) {
        console.error("Error to update the student:", error);
      }
    },
    cancelUpdate() {
      this.showEditModal = false; // Fecha o modal sem salvar
    },

    cancelSaveStudent() {
      this.showCreateModal = false; // Fecha o modal sem salvar
    },

    async deleteStudent(id) {
      try {
        await httpRequest.delete(`/students/${id}`);
        console.log("Student deleted");
        this.showAlertOnDelete = true;
        this.carregarAlunos();

        setTimeout(() => {
          this.showAlertOnDelete = false;
        }, 3000); // 3 segundos
      } catch (error) {
        console.error("Error to delete the student:", error);
      }
    },
    toggleListaAlunos() {
      this.showStudentList = !this.showStudentList;
    },
  },
  created() {
    this.carregarAlunos();
  },
};
</script>
