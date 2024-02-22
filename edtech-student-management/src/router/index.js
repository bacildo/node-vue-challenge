import Vue from 'vue';
import Router from 'vue-router';

import StudentsList from "../components/StudentsList.vue"
import StudentsHome from "../components/StudentsHome.vue"


Vue.use(Router);

export default new Router({
  
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: StudentsHome
    },

    {
      path: '/alunos',
      name: 'lista de alunos',
      component: StudentsList
    },
   



   
  ]
});





