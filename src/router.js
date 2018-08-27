import Vue from 'vue';
import Router from 'vue-router';
import login from '@/pages/login';
import loginBySMS from '@/pages/loginBySMS';
import register from '@/pages/register';
import home from '@/pages/home';
import resetPassword from '@/pages/resetPassword';

import NotFound from '@/pages/404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login/',
      component: login
    },
    {
      path: '/loginBySMS/',
      component: loginBySMS
    },
    {
      path: '/register/',
      component: register
    },
    {
      path: '/resetPassword/',
      component: resetPassword
    },
    // 登录成功后主页
    {
      path: '/home/',
      component: home,
      beforeEnter: (to, from, next) => {
        console.log(to, from);
        if (sessionStorage.loginToken) {
          next();
        } else {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          next({
            path: '/login/',
            query: { redirect: to.fullPath }
          });
        }
        // ...
      }
    },
    // 404 not found
    {
      path: '(.*)',
      component: NotFound
    }
  ]
});