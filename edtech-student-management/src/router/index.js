import Vue from "vue";
import VueRouter from "vue-router";
// import StudentsActions from "../components/StudentsActions.vue"
import StudentsList from "../components/StudentsList.vue";
Vue.use(VueRouter);

const routes = [


  { path: "/", component: StudentsList },
  // { path: "/aluno/novo", component: StudentsActions },
  // { path: "/aluno/:id", component: StudentsActions },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
