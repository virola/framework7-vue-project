<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>登录</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <input ref="inputTelephone" type="tel" placeholder="手机号码" @input="telephone = $event.target.value" required validate />
      </f7-list-item>
      <f7-list-item>
        <input type="password" placeholder="密码" @input="password = $event.target.value" required validate />
      </f7-list-item>
    </f7-list>
    
    <f7-block text-color="red" v-show="errorMsg">
      <p>{{errorMsg}}</p>
    </f7-block>
    
    
    <f7-list>
      <f7-list-button @click="signIn">立即登录</f7-list-button>
    </f7-list>

    <f7-list>
      <f7-list-item>
        <router-link class="external" to="/loginBySMS/">短信登录</router-link>
      </f7-list-item>
      <f7-list-item>
        <router-link class="external" to="/resetPassword/">忘记密码</router-link>
      </f7-list-item>
      <f7-list-item>
        <router-link class="external" to="/register/">新用户注册</router-link>
      </f7-list-item>
    </f7-list>

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
      // const router = self.$f7router;
      // const app = self.$f7;

      // 手机号验证
      const regex = /^1[0-9]{10}$/;
      if (!regex.test(self.telephone)) {
        self.$toast('请输入正确的手机号');
        self.$refs.inputTelephone.focus();
        return;
      }
      if (self.telephone && self.password) {
        self.errorMsg = '';

        // const resp = { code: 1, data: { loginToken: '11111' } };
        const resp = await self.$service.loginByPwd({
          telephone: self.telephone,
          password: self.password
        });
        console.log(resp);
        if (resp.data && resp.data.loginToken) {
          // set session token
          sessionStorage.setItem('loginToken', resp.data.loginToken);
          self.$router.push('/home/');
        } else {
          self.errorMsg = resp.msg;
        }
      }
    }
  },
  mounted() {}
};
</script>
