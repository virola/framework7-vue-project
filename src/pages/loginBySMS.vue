<template>
<f7-page no-toolbar no-navbar no-swipeback login-screen>
  <f7-login-screen-title>短信登录</f7-login-screen-title>
  <f7-list form>
    <f7-list-item v-show="!codeIsSent">
      <input ref="inputTelephone" type="tel" placeholder="请输入手机号码" @input="telephone = $event.target.value"/>
    </f7-list-item>
    <f7-list-item v-show="codeIsSent">
      {{telephone}}
    </f7-list-item>
    <f7-list-item v-show="codeIsSent">
      <input type="tel" placeholder="验证码" @input="code = $event.target.value"/>
    </f7-list-item>
    <f7-list-button v-show="!remainSeconds" @click="getCode">获取验证码</f7-list-button>
    <f7-list-button v-show="remainSeconds > 0" color="gray">重新获取({{remainSeconds}})</f7-list-button>
  </f7-list>
  <f7-block text-color="red" v-show="errorMsg">
    <p>{{errorMsg}}</p>
  </f7-block>

  <f7-list v-show="!codeIsSent">
    <f7-list-item>
      <router-link class="external" to="/login/">密码登录</router-link>
    </f7-list-item>
    <f7-list-item>
      <router-link class="external" to="/register/">新用户注册</router-link>
    </f7-list-item>
  </f7-list>

  <f7-list v-if="codeIsSent">
    <f7-list-button @click="signIn">立即登录</f7-list-button>
  </f7-list>

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
      errorMsg: ''
    };
  },
  methods: {
    async signIn() {
      const self = this;
      // const app = self.$f7;
      // const router = self.$f7router;

      if (self.telephone && self.code) {
        self.errorMsg = '';
        const form = {
          telephone: self.telephone,
          code: self.code
        };

        const resp = await self.$service.loginByCode(form);
        console.log(resp);
        if (resp.data && resp.data.loginToken) {
          // set session token
          sessionStorage.setItem('loginToken', resp.data.loginToken);
          self.$router.push('/home/');
        } else {
          self.errorMsg = resp.msg;
        }
      }
    },
    async getCode() {
      const self = this;
      // const app = self.$f7;
      // 手机号验证
      const regex = /^1[0-9]{10}$/;
      if (!regex.test(self.telephone)) {
        self.$toast('请输入正确的手机号');
        // console.log(self.$refs.inputTelephone);
        self.$refs.inputTelephone.focus();
        return;
      }
      if (self.telephone) {
        self.errorMsg = '';
        // const resp = { code: 1 };
        const resp = await self.$service.getLoginCode(self.telephone);
        console.log(resp);

        if (resp.status == 0) {
          self.$toast(`已发送短信到: ${self.telephone}`);
          self.codeIsSent = true;
          self.remainSeconds = 60;
          self.intervalId = setInterval(() => {
            self.remainSeconds--;
            if (self.remainSeconds <= 0) {
              clearInterval(self.intervalId);
            }
          }, 1000);
        } else {
          self.$toast(resp.msg);
          self.errorMsg = resp.msg;
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
