<template>
  <f7-page>

    <f7-navbar title="格尔智慧">
      <f7-nav-right>
        <f7-link icon="icon-bars"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-block>
      <p>登录成功！</p>
      <p>你可以 <f7-link back>返回</f7-link></p>
    </f7-block>

    <f7-list>
      <f7-list-button color="red">退出登录</f7-list-button>
    </f7-list>

    <f7-toolbar tabbar labels>
      <f7-link tab-link="#tab-1" tab-link-active>
        <f7-icon class="icon-fill" ios="f7:email_fill" md="material:email">
          <f7-badge color="green">5</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Inbox</span>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon ios="f7:today" md="material:today">
          <f7-badge color="red">7</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Calendar</span>
      </f7-link>
      <f7-link tab-link="#tab-3">
        <f7-icon ios="f7:cloud" md="material:file_upload">
          <f7-badge color="red">1</f7-badge>
        </f7-icon>
        <span class="tabbar-label">Upload</span>
      </f7-link>
    </f7-toolbar>

    <f7-popup :opened="pwdPopupOpened" @popup:closed="pwdPopupOpened = false">
      <f7-page>
        <f7-navbar title="设置密码">
          <f7-nav-right>
            <f7-link popup-close>跳过</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Here comes popup. You can put here anything, even independent view with its own navigation. Also not, that by default popup looks a bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula...</p>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
export default {
  data () {
    return {
      pwdPopupOpened: false
    }
  }
}
</script>
