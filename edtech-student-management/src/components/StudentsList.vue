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
            <v-btn @click="updateStudentModal(student)">Editar</v-btn>
            <v-btn @click="deleteStudentModal(student)">Excluir</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- Dialog de sucesso ao excluir -->
    <v-dialog v-model="showSuccessDialog" max-width="500px">
      <v-card>
        <v-card-title>Sucesso!</v-card-title>
        <v-card-text> Aluno excluído com sucesso! </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showSuccessDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de sucesso ao editar -->
    <v-dialog v-model="showEditSuccessDialog" max-width="500px">
      <v-card>
        <v-card-title>Sucesso!</v-card-title>
        <v-card-text> Aluno editado com sucesso! </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showEditSuccessDialog = false"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de sucesso ao salvar -->
    <v-dialog v-model="showSaveSuccessDialog" max-width="500px">
      <v-card>
        <v-card-title>Sucesso!</v-card-title>
        <v-card-text> Aluno salvo com sucesso! </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showSaveSuccessDialog = false"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de confirmação de exclusão -->
    <v-dialog v-model="showDeleteModal" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text> Tem certeza que deseja excluir este aluno? </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click="confirmDeleteStudent"
            >Confirmar</v-btn
          >
          <v-btn color="blue darken-1" @click="cancelDeleteStudent"
            >Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-actions>
      <v-btn @click="toggleListaAlunos">{{
        showStudentList ? "Ocultar Alunos" : "Mostrar Alunos"
      }}</v-btn>
      <v-btn @click="createStudentModal(student)">Criar Aluno</v-btn>
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
          <v-btn color="blue darken-1" @click="updateStudent">Salvar</v-btn>
          <v-btn color="red darken-1" @click="cancelUpdateStudent"
            >Cancelar</v-btn
          >
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
          <span
            v-if="
              !createdStudent.name ||
              !createdStudent.register ||
              !createdStudent.cpf ||
              !createdStudent.email
            "
            class="error-message"
            >Todos os campos são obrigatórios</span
          >
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="saveStudent(createdStudent)"
            >Salvar</v-btn
          >
          <v-btn color="red darken-1" @click="cancelSaveStudent"
            >Cancelar</v-btn
          >
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
      showSuccessDialog: false,
      showEditSuccessDialog: false,
      showSaveSuccessDialog: false,
      editedStudent: {}, // Armazena as informações do aluno em edição
      showEditModal: false, // Controla a modal de editing
      showCreateModal: false,
      showDeleteModal: false, // Controla a modal de exclusão
      studentToDelete: null, // Armazena o aluno a ser excluído
      createdStudent: {
        name: "",
        register: "",
        cpf: "",
        email: "",
      },
    };
  },
  methods: {
    async loadStudents() {
      try {
        const response = await httpRequest.get("/students");
        this.students = response.data;
      } catch (error) {
        console.error("Error while loading students:", error);
      }
    },
    async saveStudent(student) {
      if (
        !student.name ||
        !student.register ||
        !student.cpf ||
        !student.email
      ) {
        console.error("Todos os campos são obrigatórios");
        return;
      }

      try {
        const response = await httpRequest.post("/students", student);
        console.log("Student created:", response.data);
        this.showSaveSuccessDialog = true;
        (this.showCreateModal = false), this.loadStudents();

        setTimeout(() => {
          this.showSaveSuccessDialog = false;
        }, 3000); // 3 segundos        this.showCreateModal = false;
      } catch (error) {
        console.error("Error to save the student:", error);
      }
    },

    async updateStudent() {
      try {
        const response = await httpRequest.put(
          `/students/${this.editedStudent.id_student}`,
          this.editedStudent
        );
        console.log("Student updated:", response.data);
        this.showEditSuccessDialog = true;
        (this.showEditModal = false), this.loadStudents();

        setTimeout(() => {
          this.showEditSuccessDialog = false;
        }, 3000); // 3 segundos
      } catch (error) {
        console.error("Error to update the student:", error);
      }
    },

    async deleteStudent(id) {
      try {
        await httpRequest.delete(`/students/${id}`);
        console.log("Student deleted");
        this.showSuccessDialog = true;
        this.loadStudents();

        setTimeout(() => {
          this.showSuccessDialog = false;
        }, 3000); // 3 segundos
      } catch (error) {
        console.error("Error to delete the student:", error);
      }
      this.showDeleteModal = false;
    },

    confirmDeleteStudent() {
      if (this.studentToDelete) {
        // Se houver um aluno para excluir
        this.deleteStudent(this.studentToDelete.id_student); // Exclui o aluno
        this.showDeleteModal = false; // Fecha a modal de exclusão
      }
    },

    updateStudentModal(student) {
      this.editedStudent = { ...student }; // Clona os dados do aluno para a variável editedStudent
      this.showEditModal = true; // Abre o modal de edição
    },

    createStudentModal(student) {
      this.createdStudent = { ...student }; // Clona os dados do aluno para a variável createdStudent
      this.showCreateModal = true; // Abre o modal de criação
    },

    deleteStudentModal(student) {
      this.studentToDelete = student; // Armazena o aluno a ser excluído
      this.showDeleteModal = true; // Abre a modal de exclusão
    },

    cancelUpdateStudent() {
      this.showEditModal = false; // Fecha o modal sem salvar
    },

    cancelSaveStudent() {
      this.showCreateModal = false; // Fecha o modal sem salvar
    },
    cancelDeleteStudent() {
      this.showDeleteModal = false;
    },

    toggleListaAlunos() {
      this.showStudentList = !this.showStudentList;
    },
  },
  created() {
    this.loadStudents();
  },
};
</script>
