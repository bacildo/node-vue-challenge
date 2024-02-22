<template>
  <v-dialog v-model="dialogVisible">
    <v-card>
      <v-card-title>Editar Aluno</v-card-title>
      <v-card-text>
        <v-text-field v-model="editedStudent.name" label="Nome"></v-text-field>
        <v-text-field v-model="editedStudent.register" label="Matrícula"></v-text-field>
        <v-text-field v-model="editedStudent.cpf" label="CPF"></v-text-field>
        <v-text-field v-model="editedStudent.email" label="E-mail"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="saveStudent">Salvar</v-btn>
        <v-btn @click="closeModal">Fechar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    student: Object,
    show: Boolean
  },
  data() {
    return {
      dialogVisible: this.show,
      editedStudent: { ...this.student }
    };
  },
  watch: {
    show(newVal) {
      this.dialogVisible = newVal;
    },
    student(newVal) {
      this.editedStudent = { ...newVal };
    }
  },
  methods: {
    saveStudent() {
      this.$emit('save', this.editedStudent);
      this.dialogVisible = false;
    },
    closeModal() {
      this.dialogVisible = false;
      this.$emit('close');
    }
  }
};
</script>
