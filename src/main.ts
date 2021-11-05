import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store, key } from "./store";
import "./index.scss";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(store, key);
app.use(VueApexCharts);
app.config.globalProperties.$store = store;
app.use(router).mount("#app");
