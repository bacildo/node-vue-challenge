import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import StudentsActions from "../components/StudentsActions.vue"
import StudentsList from "../components/StudentsList.vue";
Vue.use(VueRouter);

const routes = [


  { path: "/list", component: StudentsList },
  { path: "/aluno/novo", component: StudentsActions },
  { path: "/aluno/:id", component: StudentsActions },

  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
