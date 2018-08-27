import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import service from './service';
import fetch from './service/fetch';
import router from './router';

// Import App Custom Styles
// import 'framework7/css/framework7.min.css';
// import 'framework7-icons/css/framework7-icons.css';

// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7-Vue Plugin Bundle (with all F7 components registered)
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Init F7-Vue Plugin
Framework7.use(Framework7Vue);

// msg plugin
Vue.prototype.$toast = function(msg, config = {}) {
  const app = this.$f7;
  let icon = null;
  if (config.icon) {
    icon =
      app.theme === 'ios' ? `<i class="f7-icons">${config.icon}</i>` : `<i class="material-icons">${config.icon}</i>`;
  }
  const toast = app.toast.create({
    icon: icon,
    text: msg,
    position: config.position || 'center',
    closeTimeout: config.duration || 3000
  });
  toast.open();
};

// service 注入
Vue.prototype.$service = service;
Vue.prototype.$fetch = fetch;

Vue.config.productionTip = false;

// Init App
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
