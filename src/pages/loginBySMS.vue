<template>
<f7-page no-navbar no-swipeback login-screen>
  <f7-login-screen-title>手机号登录</f7-login-screen-title>
  <f7-list form>
    <f7-list-item v-show="!codeIsSent">
      <f7-input type="tel" placeholder="手机号" @input="telephone = $event.target.value"></f7-input>
    </f7-list-item>
    <f7-list-item v-show="codeIsSent">
      <f7-input type="tel" placeholder="验证码" @input="code = $event.target.value"></f7-input>
    </f7-list-item>
    <f7-list-button v-show="!remainSeconds" @click="getCode">获取验证码</f7-list-button>
    <f7-list-button v-show="remainSeconds > 0">重新获取({{remainSeconds}})</f7-list-button>
  </f7-list>
  <f7-list v-show="!codeIsSent">
    <f7-list-item>
      <f7-link back>密码登录</f7-link>
    </f7-list-item>
  </f7-list>
  <f7-list v-if="codeIsSent">
    <f7-list-button @click="signIn">立即登录</f7-list-button>
  </f7-list>

  <f7-toolbar>
    <f7-link></f7-link>
    <f7-link href="/register">注册</f7-link>
  </f7-toolbar>

</f7-page>
</template>

<script>
export default {
  data() {
    return {
      telephone: '',
      code: '',
      codeIsSent: false,
      remainSeconds: 0,
      intervalId: null,
    };
  },
  methods: {
    async signIn() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (self.telephone && self.code) {
        const toastCenter = app.toast.create({
          text: '加载中',
          position: 'center',
        });
        toastCenter.open();
        const form = {
          telephone: self.telephone,
          code: self.code
        };

        const resp = await self.$service.loginByCode(form);
        console.log(resp);
        toastCenter.close();
        if (resp.data && resp.data.loginToken) {
          // set session token
          sessionStorage.setItem('loginToken', resp.data.loginToken);
          router.navigate('/home');
        }
      }
    },
    async getCode() {
      const self = this;
      const app = self.$f7;
      if (self.telephone) {
        // show toast
        const toastCenter = app.toast.create({
          text: '加载中',
          position: 'center',
        });
        toastCenter.open();
        // const resp = {
        //   code: '000'
        // };
        const resp = await self.$service.getLoginCode(self.telephone);
        toastCenter.close();
        console.log(resp);

        if (resp.code) {
          self.$toast(`已发送短信到: ${self.telephone}`);
          self.codeIsSent = true;
          self.remainSeconds = 60;
          self.intervalId = setInterval(() => {
            self.remainSeconds--;
            if (self.remainSeconds <= 0) {
              clearInterval(self.intervalId);
            }
          }, 1000);
        }
      }
    }
  },
  mounted() {
    // const self = this;
    // const app = self.$f7;
    // const router = self.$f7router;
  }
};
</script>
