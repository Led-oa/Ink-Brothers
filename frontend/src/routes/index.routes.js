import { createRouter, createWebHistory } from "vue-router";

import * as StatusPages from "../views/status/index.status";

const routes = [
  {
    path: "/",
    name: "StatusApi",
    component: StatusPages.StatusApi,
  },
  {
    path: "/about",
    name: "StatusAbout",
    component: StatusPages.StatusAbout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
