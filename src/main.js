import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
// Import App Custom Styles
import 'framework7/css/framework7.min.css';
// Import F7 iOS Theme Styles
// import Framework7Theme from 'framework7/css/framework7.ios.min.css';
import Framework7Theme from 'framework7/css/framework7.md.min.css';

// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Init F7-Vue Plugin
Framework7.use(Framework7Vue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
