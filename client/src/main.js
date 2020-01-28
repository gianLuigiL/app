import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  BootstrapVue,
  IconsPlugin
} from "bootstrap-vue";
import api from "./api/apiclient"

Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.prototype.api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");