<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>Editar Aluno</v-card-title>
      <v-card-text>
        <v-text-field v-model="editedStudent.name" label="Nome"></v-text-field>
        <!-- O campo CPF só será exibido se o usuário não estiver editando -->
        <v-text-field v-if="!editing" v-model="editedStudent.cpf" label="CPF" readonly></v-text-field>
        <!-- O campo Matrícula só será exibido se o usuário não estiver editando -->
        <v-text-field v-if="!editing" v-model="editedStudent.register" label="Matrícula" readonly></v-text-field>
        <!-- O campo CPF será exibido apenas se o usuário estiver editando -->
        <v-text-field v-if="editing" v-model="editedStudent.cpf" label="CPF"></v-text-field>
        <!-- O campo Matrícula será exibido apenas se o usuário estiver editando -->
        <v-text-field v-if="editing" v-model="editedStudent.register" label="Matrícula"></v-text-field>
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
    student: Object
  },
  data() {
    return {
      show: true,
      editing: false, // Indica se o usuário está editando ou não
      editedStudent: { ...this.student }
    };
  },
  methods: {
    saveStudent() {
      this.$emit('save', this.editedStudent);
      this.show = false; // Fechar o modal após salvar
    },
    closeModal() {
      this.show = false;
      this.$emit('close'); // Emitir evento de fechar modal
    }
  }
};
</script>
