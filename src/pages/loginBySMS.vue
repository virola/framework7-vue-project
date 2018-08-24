<template>
  <f7-page no-navbar no-swipeback login-screen>
    <f7-login-screen-title>短信登录</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-input type="tel" placeholder="手机号" @input="telephone = $event.target.value"></f7-input>
      </f7-list-item>
      <f7-list-item v-if="codeIsSent">
        <f7-input type="tel" placeholder="验证码" @input="code = $event.target.value"></f7-input>
      </f7-list-item>
      <f7-list-button @click="getCode">获取验证码</f7-list-button>
    </f7-list>
    <f7-list v-if="codeIsSent">
      <f7-list-button @click="signIn">立即登录</f7-list-button>
    </f7-list>
    
    <f7-toolbar>
      <f7-link back>密码登录</f7-link>
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
        codeIsSent: false
      };
    },
    methods: {
      signIn() {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        app.dialog.alert(`telephone: ${self.telephone}<br>Code: ${self.code}`, () => {
          router.navigate('/home');
        });
      },
      getCode () {
        const self = this;
        const app = self.$f7;
        if (self.telephone) {
          app.dialog.alert(`已发送短信到: ${self.telephone}`);
          this.codeIsSent = true;
        } else {
          
        }
        
      }
    },
    mounted () {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
    }
  };
</script>