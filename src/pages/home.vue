<template>
  <f7-page>

    <f7-navbar title="格尔智慧">
      <f7-nav-right>
        <f7-link icon="icon-bars"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <f7-block-title>登录成功</f7-block-title>

      <f7-list simple-list>
        <f7-list-item>
          <p>{{token}}</p>
        </f7-list-item>
        <f7-list-item>
          <f7-link back>返回</f7-link>
        </f7-list-item>
        <f7-list-item>
          <f7-link @click="pwdPopupOpened = true">设置密码</f7-link>
        </f7-list-item>
        
      </f7-list>

    </f7-block>

    <f7-list>
      <f7-list-button color="red">退出登录</f7-list-button>
    </f7-list>

    <f7-toolbar tabbar labels :bottom-md="true">
      <f7-link tab-link="#tab-1" tab-link-active>
        <span class="tabbar-label">1111</span>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <span class="tabbar-label">2222</span>
      </f7-link>
      <f7-link tab-link="#tab-3">
        <span class="tabbar-label">333</span>
      </f7-link>
    </f7-toolbar>

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
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      pwdPopupOpened: false,
      token: sessionStorage.loginToken
    }
  }
}
</script>
