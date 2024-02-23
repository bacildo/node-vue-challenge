<template>
  <v-dialog v-model="dialogVisible">
    <v-card>
      <v-card-title>Editar Aluno</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="editedStudent.name"
            :rules="[(v) => !!v || 'Nome é obrigatório']"
            label="Nome"
          ></v-text-field>
          <v-text-field
            v-model="editedStudent.register"
            :rules="[
              (v) => !!v || 'Matrícula é obrigatória',
              (v) => /^\d+$/.test(v) || 'Matrícula deve conter apenas números',
            ]"
            label="Matrícula"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="editedStudent.cpf"
            :rules="[
              (v) => !!v || 'CPF é obrigatório',
              (v) => /^\d+$/.test(v) || 'CPF deve conter apenas números',
            ]"
            label="CPF"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="editedStudent.email"
            :rules="[
              (v) => !!v || 'E-mail é obrigatório',
              (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
            ]"
            label="E-mail"
          ></v-text-field>
        </v-form>
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
    show: Boolean,
    student: Object,
  },
  data() {
    return {
      dialogVisible: this.show,
      editedStudent: { ...this.student },
    };
  },
  watch: {
    show(newValue) {
      this.dialogVisible = newValue;
      this.editedStudent = { ...this.student };
    },
    student(newStudent) {
      this.editedStudent = { ...newStudent };
    },
  },
  methods: {
    saveStudent() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.$emit("save", this.editedStudent);
        this.dialogVisible = false;
      } else {
        console.error(" Invalid Form");
      }
    },
    closeModal() {
      this.dialogVisible = false;
      this.$emit("close");
    },
  },
};
</script>
