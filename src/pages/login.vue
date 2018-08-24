<template>
  <f7-page no-swipeback login-screen>
    <f7-login-screen-title>登录</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <input type="tel" placeholder="手机号" @input="telephone = $event.target.value" required validate />
      </f7-list-item>
      <f7-list-item>
        <input type="password" placeholder="密码" @input="password = $event.target.value" required validate />
      </f7-list-item>
    </f7-list>
    
    <f7-block text-color="red" v-show="errorMsg">
      <p>{{errorMsg}}</p>
    </f7-block>
    
    <f7-list>
      <f7-list-item>
        <f7-link href="/loginBySMS">短信登录</f7-link>
        <f7-link href="/resetPassword">忘记密码</f7-link>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">立即登录</f7-list-button>
    </f7-list>

    <f7-toolbar>
      <f7-link></f7-link>
      <f7-link href="/register">新用户注册</f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      telephone: '',
      password: '',
      errorMsg: ''
    };
  },
  methods: {
    async signIn() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (self.telephone && self.password) {
        const toastCenter = app.toast.create({
          text: '加载中',
          position: 'center',
        });
        toastCenter.open();
        const form = {
          telephone: self.telephone,
          password: self.password
        };
        self.errorMsg = '';

        const resp = await self.$service.loginByPwd(form);
        console.log(resp);
        toastCenter.close();
        if (resp.data && resp.data.loginToken) {
          // set session token
          sessionStorage.setItem('loginToken', resp.data.loginToken);
          router.navigate('/home');
        } else {
          self.errorMsg = resp.description;
        }
      }
    },
  },
  mounted() {
    // const self = this;
    // const app = self.$f7;
    // const router = self.$f7router;
  }
};
</script>