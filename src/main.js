import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import common_api from './common-utils/common_api'
Vue.use(common_api);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
