<template>
  <f7-page name="main">

    <f7-navbar title="格尔智慧">
    </f7-navbar>

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
          <p>设置密码</p>
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
      token: sessionStorage.loginToken
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
    }
  }
}
</script>
