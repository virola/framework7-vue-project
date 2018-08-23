<template>
  <!-- App -->
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <!-- initial page is specified in routes -->
    <f7-view main url="/"></f7-view>
  </f7-app>
</template>

<script>

import routes from './routes';

export default {
  data() {
    return {
      // Framework7 parameters that we pass to <f7-app> component
      f7params: {
        // Array with app routes
        routes,
        // App Name
        name: '格尔智慧',
        // App id
        id: 'com.myapp.test',
        // ...
      }
    }
  }
};
</script>
<style lang="less">
@import './less/app';
</style>
