import login from '@/pages/login';
import loginBySMS from '@/pages/loginBySMS';
import register from '@/pages/register';
import home from '@/pages/home';
import resetPassword from '@/pages/resetPassword';

export default [
  {
    path: '/',
    redirect: 'login'
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
  },
  {
    path: '/resetPassword',
    component: resetPassword
  }
];
