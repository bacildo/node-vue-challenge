<template>
  <div>
    <router-view></router-view>
    <StudentsAdd
      :show="showAddModal"
      @save="handleAdd"
      @close="handleCloseAddModal"
    />
  </div>
</template>

<script>
import StudentsAdd from "../components/StudentsAdd.vue";
const apiService = require("../api/students");

export default {
  data() {
    return {
      showAddModal: false,
    };
  },
  methods: {
    goToList() {
      this.$router.push("/alunos");
    },
    handleAdd(newStudent) {
      apiService
        .addStudent(newStudent)
        .then(() => {
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
    StudentsAdd,
  },
};
</script>
