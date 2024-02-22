<template>
  <v-dialog v-model="dialogVisible">
    <v-card>
      <v-card-title>Adicionar Aluno</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="newStudent.name"
            :rules="[(v) => !!v || 'Nome é obrigatório']"
            label="Nome"
          ></v-text-field>
          <v-text-field
            v-model="newStudent.register"
            :rules="[
              (v) => !!v || 'Matrícula é obrigatória',
              (v) => /^\d+$/.test(v) || 'Matrícula deve conter apenas números',
            ]"
            label="Matrícula"
          ></v-text-field>
          <v-text-field
            v-model="newStudent.cpf"
            :rules="[
              (v) => !!v || 'CPF é obrigatório',
              (v) => /^\d+$/.test(v) || 'CPF deve conter apenas números',
            ]"
            label="CPF"
          ></v-text-field>
          <v-text-field
            v-model="newStudent.email"
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
  },
  data() {
    return {
      dialogVisible: this.show,
      newStudent: {
        name: "",
        register: "",
        cpf: "",
        email: "",
      },
    };
  },
  watch: {
    show(newValue) {
      this.dialogVisible = newValue;
    },
  },
  methods: {
    saveStudent() {
      // Validar os campos
      const valid = this.$refs.form.validate();
      if (valid) {
        // Emitir o evento de salvar apenas se os campos forem válidos
        this.$emit("save", this.newStudent);
        this.dialogVisible = false;
      } else {
        // Mostrar uma mensagem de erro ou tomar alguma outra ação
        console.error("Invalid form");
      }
    },
    closeModal() {
      this.dialogVisible = false;
      this.$emit("close"); // Emitir evento de fechar modal
    },
  },
};
</script>
