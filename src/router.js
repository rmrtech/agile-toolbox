import { createRouter, createWebHistory } from "vue-router";

import Scrumpoker from "./pages/Scrumpoker.vue";
import Retrospective from "./pages/Retrospective.vue";
import Login from "./pages/Login.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: Login,
      props: true,
      meta: { requiresUnAuth: true },
    },
    { path: "/", redirect: "/scrumpoker" },
    {
      path: "/scrumpoker",
      component: Scrumpoker,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/retrospective",
      component: Retrospective,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  store.dispatch("toggleLoading", false);
  console.log("Before router" + to.path);
  console.log("Authenticated:" + store.getters.authenticated);

  if (to.meta.requiresAuth && !store.getters.authenticated) {
    next("/login");
  } else if (to.meta.requiresUnAuth && store.getters.authenticated) {
    console.log("Authenticated");
    next("/");
  } else {
    next();
  }
});

export default router;
