<template>
  <f7-page name="main">

    <f7-navbar title="格尔智慧" :sliding="false"></f7-navbar>

    <f7-block>
      <f7-block-title>登录成功</f7-block-title>

      <f7-list simple-list>
        <f7-list-item :title="token"></f7-list-item>
        <f7-list-item>
          <f7-link @click="pwdPopupOpened = true">设置密码</f7-link>
        </f7-list-item>
        <f7-list-item>
          <f7-link @click="mobilePopupOpened = true">设置手机号</f7-link>
        </f7-list-item>
      </f7-list>

    </f7-block>

    <f7-list>
      <f7-list-button color="red" @click="logout">退出登录</f7-list-button>
    </f7-list>

    <f7-popup :opened="pwdPopupOpened" @popup:closed="pwdPopupOpened = false">
      <f7-page>
        <f7-navbar title="设置密码">
          <f7-nav-right>
            <f7-link popup-close>取消</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-list form>
            <f7-list-item>
              <input type="password" placeholder="新密码" @input="password = $event.target.value">
            </f7-list-item>
            <f7-list-item>
              <input type="password" placeholder="确认密码" @input="confirmPassword = $event.target.value">
            </f7-list-item>
          </f7-list>
          <f7-block text-color="red" v-show="errorMsgPwd">
            <p>{{errorMsgPwd}}</p>
          </f7-block>

          <f7-list>
            <f7-list-button @click="setPwd">设置密码</f7-list-button>
          </f7-list>

        </f7-block>
      </f7-page>
    </f7-popup>

    <f7-popup :opened="mobilePopupOpened" @popup:closed="mobilePopupOpened = false">
      <f7-page>
        <f7-navbar title="设置手机号码">
          <f7-nav-right>
            <f7-link popup-close>取消</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>设置mobilePopupOpened</p>
        </f7-block>
      </f7-page>
    </f7-popup>

  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      pwdPopupOpened: false,
      mobilePopupOpened: false,
      token: sessionStorage.loginToken,
      // 设置密码dialog
      password: '',
      confirmPassword: '',
      errorMsgPwd: ''
    };
  },
  methods: {
    async logout() {
      const self = this;
      const app = self.$f7;
      // const resp = { code: 111 };
      const resp = await this.$service.logout();
      console.log(resp);
      if (resp.status == 0) {
        sessionStorage.removeItem('loginToken');
        self.$router.push('/login/');
      } else {
        // self.$toast(resp.msg);
        app.dialog.alert(resp.msg);
      }
    },
    // 设置新密码
    async setPwd() {
      const self = this;
      const app = self.$f7;
      if (!self.password) {
        self.errorMsgPwd = '请输入密码';
        return;
      }
      if (self.confirmPassword !== self.password) {
        self.errorMsgPwd = '两次密码输入不一致';
        return;
      }
      self.errorMsgPwd = '';
      const resp = await this.$service.setInitPassword(self.password);
      console.log(resp);
      if (resp.status == 0) {
        self.pwdPopupOpened = false;
        app.dialog.alert(resp.msg);
      } else {
        app.dialog.alert(resp.msg);
      }
    }
  }
};
</script>
