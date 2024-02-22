<template>
  <div>
    <v-list>
      <v-list-item
        v-for="student in students"
        :key="student.id"
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
          <v-btn @click="editStudentModal(student)">Editar</v-btn>
          <v-btn @click="deleteStudentModal(student.id_student)">Excluir</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-dialog v-model="showEditModal">
      <template v-if="showEditModal">
        <StudentsEdit
          :student="selectedStudent"
          @save="handleSave"
          :show="showEditModal"
          @close="handleCloseModal"
        />
      </template>
    </v-dialog>

    <v-dialog v-model="showDeleteModal">
      <template v-if="showDeleteModal">
        <StudentsDelete
          :student="selectedStudent"
          @delete="handleDelete"
          @close="handleCloseModal"
        />
      </template>
    </v-dialog>

    <StudentsAdd
      :show="showAddModal"
      @save="handleAdd"
      @close="handleCloseAddModal"
    />

    <v-btn @click="showAddModal = true">Adicionar Aluno</v-btn>
  </div>
</template>

<script>
import StudentsEdit from "../components/StudentsEdit.vue";
import StudentsDelete from "../components/StudentsDelete.vue";
import StudentsAdd from "../components/StudentsAdd.vue";
const apiService = require("../api/students");

export default {
  data() {
    return {
      students: [],
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      selectedStudent: {},
    };
  },
  created() {
    this.loadStudents();
    this.$on('add-student', () => {
      this.showAddModal = true;
    });
  },
  methods: {
    loadStudents() {
      apiService
        .getStudents()
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.error("Error loading students:", error);
        });
    },
    editStudentModal(student) {
      this.selectedStudent = student;
      this.showEditModal = true;
      
    },

    deleteStudentModal(id_student) {
      if (Number.isInteger(id_student)) {
        this.selectedStudent = { id: id_student };
        this.showDeleteModal = true;
      } else {
        console.error(
          "Error deleting student: Selected student id is not a number."
        );
      }
    },

    handleCloseModal() {
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.selectedStudent = null;
    },
    handleSave(editedStudent) {
      apiService
        .updateStudent(editedStudent)
        .then(() => {
          this.loadStudents();
          this.handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    },
    handleDelete() {
      if (!this.selectedStudent || !Number.isInteger(this.selectedStudent.id)) {
        console.error(
          "Error deleting student: Selected student id is undefined or not a number."
        );
        return;
      }

      apiService
        .deleteStudent(this.selectedStudent.id)
        .then(() => {
          this.loadStudents();
          this.handleCloseModal();
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    },

    handleAdd(newStudent) {
      apiService
        .addStudent(newStudent)
        .then(() => {
          this.loadStudents();
          this.handleCloseAddModal();
        })
        .catch((error) => {
          console.error("Error adding student:", error);
        });
    },
    handleCloseAddModal() {
      this.showAddModal = false;
    },
  },
  components: {
    StudentsEdit,
    StudentsDelete,
    StudentsAdd,
  },
};
</script>
