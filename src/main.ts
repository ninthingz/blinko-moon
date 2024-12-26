import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import createTray from "./tray";
import { router } from "./router";

const app = createApp(App);
app.use(router);
createTray();

app.mount("#app");
