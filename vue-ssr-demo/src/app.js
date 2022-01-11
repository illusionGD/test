import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
// import store from './store'

Vue.config.productionTip = false;

export function createApp() {
  const router = createRouter();
  const app = new Vue({
    router,
    // store,
    render: h => h(App)
  });

  return {app, router}
}