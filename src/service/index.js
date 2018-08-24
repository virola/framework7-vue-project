import fetch from './fetch';

const API_URL = {
  // 手机号和密码登录
  LOGIN_BY_PWD: '/customer/access/login_by_password',
  // 手机号和验证码登录
  LOGIN_BY_SMS: '/customer/access/login_by_sms_code',
  // 获取登录验证码
  GET_LOGIN_SMS_CODE: '/customer/access/send_login_sms_code',
  // 注册获取验证码
  GET_REG_SMS_CODE: '/customer/access/send_registry_sms_code',
  // 手机号注册并登录
  REGISTER_BY_SMS: '/customer/access/registry_and_login_by_sms_code',
  // 退出
  LOG_OUT: '/customer/access/logout',
  // 忘记密码获取验证码
  GET_RESET_PWD_CODE: '/customer/access/send_forgot_password_sms_code',
  // 重设密码
  POST_RESET_PWD_BY_CODE: '/customer/access/forget_password'
};

export default {
  /**
   * 用户名密码登录接口
   */
  loginByPwd({ telephone, password }) {
    return fetch(API_URL.LOGIN_BY_PWD, { mobileNo: telephone, password }, 'post');
  },

  /**
   * 手机号验证码登录
   * @param {Object} params 手机号，验证码
   */
  loginByCode({ telephone, code }) {
    return fetch(API_URL.LOGIN_BY_SMS, { telephone, code }, 'post');
  },

  /**
   * 获取登录验证码
   * @param {string} telephone 手机号
   */
  getLoginCode(telephone) {
    return fetch(API_URL.GET_LOGIN_SMS_CODE, { mobileNo: telephone });
  },

  /**
   * 获取注册短信验证码
   */
  getRegCode(telephone) {
    return fetch(API_URL.GET_REG_SMS_CODE, { mobileNo: telephone });
  },

  /**
   * 手机号注册并登录
   */
  registerByCode({ telephone, code }) {
    return fetch(
      API_URL.REGISTER_BY_SMS,
      {
        mobileNo: telephone,
        smsCode: code
      },
      'post'
    );
  },

  /**
   * 重设密码POST请求
   * @param {Object} param 参数
   */
  resetPassword({ telephone, password, code }) {
    return fetch(
      API_URL.POST_RESET_PWD_BY_CODE,
      {
        mobileNo: telephone,
        smsCode: code,
        userPass: password
      },
      'post'
    );
  },

  /**
   * 退出登录POST请求
   */
  logout() {
    return fetch(
      API_URL.LOG_OUT,
      {
        loginToken: sessionStorage.loginToken
      },
      'post'
    );
  }
};
