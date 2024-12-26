import { createMemoryHistory, createRouter } from "vue-router";

import Note from "../views/Note.vue";
import Settings from "../views/Settings.vue";

const routes = [
  { path: "/", component: Note },
  { path: "/settings", component: Settings },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
