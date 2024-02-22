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
            :disabled="editForm"
          ></v-text-field>
          <v-text-field
            label="CPF"
            :disabled="editForm"
            v-model="editedStudent.cpf"
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="editedStudent.email"
            @input="validateEmail"
          ></v-text-field>
          <span v-if="invalidEmail" class="error-message">E-mail inválido</span>
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
            type="text"
          ></v-text-field>
          <v-text-field
            label="Matrícula"
            v-model="createdStudent.register"
            @input="validateRegister"
          ></v-text-field>
          <span v-if="invalidRegister" class="error-message"
            >Matrícula inválida, insira apenas números</span
          >
          <v-text-field
            label="CPF"
            @input="validateCpf"
            v-model="createdStudent.cpf"
          ></v-text-field>
          <span v-if="invalidCpf" class="error-message"
            >CPF inválido, insira apenas números</span
          >
          <v-text-field
            label="E-mail"
            v-model="createdStudent.email"
            @input="validateEmail"
          ></v-text-field>
          <span v-if="invalidEmail" class="error-message">E-mail inválido</span>

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
      showDeleteModal: false,
      showSaveSuccessDialog: false,
      editedStudent: {
        name: "",
        register: "",
        cpf: "",
        email: "",
      },
      editForm: false,
      showEditModal: false,
      showCreateModal: false,
      studentToDelete: null,
      createdStudent: {
        name: "",
        register: "",
        cpf: "",
        email: "",
      },
      invalidCpf: false,
      invalidRegister: false,
      invalidEmail: false,
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
        !student.email ||
        this.invalidCpf ||
        this.invalidRegister ||
        this.invalidEmail
      ) {
        console.error("All fields are required or have invalid data");
        return;
      }

      try {
        const response = await httpRequest.post("/students", student);
        console.log("Student created:", response.data);
        this.showSaveSuccessDialog = true;
        (this.showCreateModal = false), this.loadStudents();

        setTimeout(() => {
          this.showSaveSuccessDialog = false;
        }, 3000); // 3 seconds
      } catch (error) {
        console.error("Error to save the student:", error);
      }
    },

    async updateStudent() {
      if (
        !this.editedStudent.name ||
        !this.editedStudent.register ||
        !this.editedStudent.cpf ||
        !this.editedStudent.email ||
        this.invalidCpf ||
        this.invalidRegister ||
        this.invalidEmail
      ) {
        console.error("All fields are required or have invalid data");
        return;
      }

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
        }, 3000); // 3 seconds
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
        }, 3000); // 3 seconds
      } catch (error) {
        console.error("Error to delete the student:", error);
      }
      this.showDeleteModal = false;
    },

    confirmDeleteStudent() {
      if (this.studentToDelete) {
        this.deleteStudent(this.studentToDelete.id_student);
        this.showDeleteModal = false;
      }
    },

    updateStudentModal(student) {
      this.editedStudent = { ...student };
      this.editForm = true;
      this.showEditModal = true;
    },

    createStudentModal(student) {
      this.createdStudent = { ...student };
      this.showCreateModal = true;
    },

    deleteStudentModal(student) {
      this.studentToDelete = student;
      this.showDeleteModal = true;
    },

    cancelUpdateStudent() {
      this.showEditModal = false;
    },

    cancelSaveStudent() {
      this.showCreateModal = false;
    },
    cancelDeleteStudent() {
      this.showDeleteModal = false;
    },

    validateCpf() {
      if (!/^\d+$/.test(this.createdStudent.cpf)) {
        this.invalidCpf = true;
      } else {
        this.invalidCpf = false;
      }
    },

    validateRegister() {
      if (!/^\d+$/.test(this.createdStudent.register)) {
        this.invalidRegister = true;
      } else {
        this.invalidRegister = false;
      }
    },

    validateEmail() {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.createdStudent.email)) {
        this.invalidEmail = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editedStudent.email)) {
        this.invalidEmail = true;
      } else {
        this.invalidEmail = false;
      }
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
