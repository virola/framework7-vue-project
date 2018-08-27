import login from '@/pages/login';
import loginBySMS from '@/pages/loginBySMS';
import register from '@/pages/register';
import home from '@/pages/home';
import resetPassword from '@/pages/resetPassword';

import NotFound from '@/pages/404';

export default [
  {
    path: '#/',
    component: login
    // redirect: function(route, resolve) {
    //   console.log(route);
    //   if (sessionStorage.loginToken) {
    //     // redirect to such url
    //     resolve('/home/');
    //   } else {
    //     resolve('/login/')
    //   }
    // }
  },
  {
    path: '#/login/',
    component: login
  },
  {
    path: '#/loginBySMS/',
    component: loginBySMS
  },
  {
    path: '#/register/',
    component: register
  },
  {
    path: '#/resetPassword/',
    component: resetPassword
  },
  // 登录成功后主页
  {
    path: '#/home/',
    component: home
  },

  // 404 not found
  {
    path: '#(.*)',
    component: NotFound
  }
];
