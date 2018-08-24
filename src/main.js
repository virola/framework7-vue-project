import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import axios from 'axios';

// Import App Custom Styles
import 'framework7/css/framework7.min.css';
import 'framework7-icons/css/framework7-icons.css';

// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Init F7-Vue Plugin
Framework7.use(Framework7Vue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
