
<template>
  <v-card>
    <v-card-title>
      {{ editing ? 'Editar Aluno' : 'Adicionar Aluno' }}
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="aluno.nome" label="Nome"></v-text-field>
      <v-text-field v-model="aluno.matricula" label="Matrícula"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="salvarAluno">{{ editing ? 'Salvar' : 'Adicionar' }}</v-btn>
      <v-btn @click="cancelarEdicao">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      aluno: {
        nome: '',
        matricula: ''
      },
      editing: false
    };
  },
  methods: {
    salvarAluno() {
      if (this.editing) {
        // Chamar a API para editar o aluno
      } else {
        // Chamar a API para adicionar o aluno
      }
      this.cancelarEdicao();
    },
    cancelarEdicao() {
      this.$emit('fechar');
    }
  },
  created() {
    if (this.$route.params.id) {
      this.editing = true;
      // Chamar a API para carregar os dados do aluno com ID this.$route.params.id
    }
  }
};
</script>