import fetch from './fetch';

const API_URL = {
  LOGIN_BY_PWD: '/api/loginByPwd',
  LOGIN_BY_SMS: '/api/loginBySms',
  REGISTER_BY_SMS: '/api/registerBySms',
  GET_LOGIN_SMS_CODE: '/api/loginCode',
  GET_REG_SMS_CODE: '/api/regCode',
  LOG_OUT: '/api/logout',
};

export const services = {
  loginByPwd: (username, password) => fetch(API_URL.LOGIN_BY_PWD, {username, password}, 'post'),
};
