<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>密码登录</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-input type="text" placeholder="用户名" @input="username = $event.target.value"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-input type="password" placeholder="密码" @input="password = $event.target.value"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">立即登录</f7-list-button>
    </f7-list>
    <f7-list>
      <f7-list-item>
        <f7-link href="/loginBySMS">短信登录</f7-link>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        loginType: 'password'
      };
    },
    methods: {
      signIn() {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        app.dialog.alert(`Username: ${self.username}<br>Password: ${self.password}`, () => {
          router.navigate('/home');
        });
      },
    },
    mounted () {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      console.log(router);
    }
  };
</script>