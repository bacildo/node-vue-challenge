<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>Confirmar exclusão</v-card-title>
      <v-card-text>Tem certeza que deseja excluir este estudante?</v-card-text>
      <v-card-actions>
        <v-btn @click="deleteStudent">Sim</v-btn>
        <v-btn @click="closeModal">Não</v-btn>
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
      show: true
    };
  },
  methods: {
    deleteStudent() {
      this.$emit('delete');
      this.show = false;
    },
    closeModal() {
      this.show = false;
      this.$emit('close');
    }
  }
};
</script>
