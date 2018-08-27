<template>
  <!-- App -->
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <!-- Main Views -->
    <f7-views>
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
      <!-- <f7-view url="/" :main="true" :allowDuplicateUrls="true" class="ios-edges"></f7-view> -->
    </f7-views>
  </f7-app>
</template>

<script>
// import routes from './routes';

export default {
  data() {
    return {
      // Framework7 parameters that we pass to <f7-app> component
      f7params: {
        // Array with app routes
        // routes,
        // App Name
        name: '格尔智慧',
        // App id
        id: 'com.myapp.test',
        // ...
      },
      transitionName: 'slide'
    };
  },
  watch: {
    // 监听路由变化
    // $route(to, from) {
    //   console.log(this.transitionName);
    //   console.log(to, from);
    //   // const toDepth = to.path;
    //   // const fromDepth = from.path;
    //   // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    // }
  },
  mounted() {}
};
</script>
<style lang="less">
@import '/node_modules/framework7/css/framework7.min.css';
@import '/node_modules/framework7-icons/css/framework7-icons.css';
@import './less/app';
</style>
