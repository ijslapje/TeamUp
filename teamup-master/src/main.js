import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css' // import the croppie css manually

Vue.use(VueCroppie);

import './navbar'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

require('./assets/less/import.less');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
