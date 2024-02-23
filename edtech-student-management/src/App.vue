<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item link @click="goToList">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Listar Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Módulo Acadêmico</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    goToList() {
      if (this.$route.path !== "/alunos") {
        this.$router.push("/alunos");
      }
      this.drawer = false; 
    },
  },
};
</script>
