import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routes from "./router";

Vue.config.productionTip = false;
Vue.use(VueRouter);

var router = new VueRouter({
  routes: Routes
  //mode: 'history'
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
