<template>
  <v-card>
    <v-card-title>Lista de Alunos</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="aluno in alunos" :key="aluno.id">
          <v-list-item-content>
            <v-list-item-title>{{ aluno.nome }}</v-list-item-title>
            <v-list-item-subtitle>Matrícula: {{ aluno.matricula }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="editarAluno(aluno.id)">Editar</v-btn>
            <v-btn @click="excluirAluno(aluno.id)">Excluir</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="adicionarAluno">Adicionar Aluno</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      alunos: []
    };
  },
  methods: {
    carregarAlunos() {
      // Chamar a API para carregar a lista de alunos
    },
    adicionarAluno() {
      this.$router.push('/aluno/novo');
    },
    editarAluno(id) {
      this.$router.push(`/aluno/${id}`);
    },
    excluirAluno(id) {
      // Chamar a API para excluir o aluno com ID id
    }
  },
  created() {
    this.carregarAlunos();
  }
};
</script>