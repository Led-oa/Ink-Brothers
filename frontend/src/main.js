import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routes/index.routes";
import App from "./App.vue";
import "./style.css";

// PrimeVue (optionnel, à décommenter si vous l'utilisez)
// import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/lara-light-blue/theme.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(PrimeVue)

app.mount("#app");
