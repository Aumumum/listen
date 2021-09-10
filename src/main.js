import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";import animate from "animate.css";
import "./static/normalize.css";

import "./plugins/element";

Vue.config.productionTip = false;

Vue.use(animate)
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
