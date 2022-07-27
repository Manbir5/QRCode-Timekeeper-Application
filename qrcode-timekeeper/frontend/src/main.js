import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import router from "./router";
library.add(fas);
dom.watch();

createApp(App)
  .use(router)
  .use(PrimeVue)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
