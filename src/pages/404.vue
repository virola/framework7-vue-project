<template>
  <f7-page>
    <f7-navbar title="404" backLink="返回" :sliding="false"></f7-navbar>
    <f7-block strong>
      <p>404</p>
      <p>没有找到页面</p>
    </f7-block>
  </f7-page>
</template>

<script>
import { f7Page, f7Navbar, f7Block } from 'framework7-vue';
export default {
  components: {
    f7Page,
    f7Navbar,
    f7Block
  }
};
</script>