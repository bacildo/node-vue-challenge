import Vue from 'vue';
import Router from 'vue-router';

import StudentsList from "../components/StudentsList.vue"
import StudentsEdit from "../components/StudentsEdit.vue"
import StudentsDelete from "../components/StudentsDelete.vue"
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
    {
      path: '/edit/:id',
      name: 'edit',
      component: StudentsEdit,
      props: true
    },

    {
      path: '/alunos',
      name: 'adicionar aluno',
      component: StudentsEdit,
      props: true
    },


    {
      path: '/delete/:id',
      name: 'delete',
      component: StudentsDelete,
      props: true
    }
  ]
});





