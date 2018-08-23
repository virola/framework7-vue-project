import login from '@/pages/login';
import loginBySMS from '@/pages/loginBySMS';
import register from '@/pages/register';
import home from '@/pages/home';

export default [
  {
    path: '/',
    redirect: 'login'
    // async(routeTo, routeFrom, resolve, reject) {
    //   // dynamic import component; returns promise
    //   const vueComponent = () => import('./pages/login.vue');
    //   // resolve promise
    //   vueComponent().then((vc) => {
    //     // resolve with component
    //     resolve({ component: vc.default })
    //   });
    // }
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/loginBySMS',
    component: loginBySMS
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/home',
    component: home
  }
];
