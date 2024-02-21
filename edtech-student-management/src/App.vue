<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-navigation-drawer />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
/* Estilos globais para a aplicação */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* #app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: aqua;
} */

/* Estilos adicionais específicos do App.vue */
</style>

<!-- <template>
  <div id="app">
    <h1>Minha Aplicação Vue</h1>
    <router-view />
  </div>
</template>

<script>
import "@/assets/styles.css"; // Importa o arquivo CSS

export default {
  name: "App",
};
</script>

<style>
/* Estilos globais para a aplicação */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: aqua;
}

h1 {
  color: #333;
  text-align: center;
}

/* Estilos adicionais específicos do App.vue */
</style> -->
