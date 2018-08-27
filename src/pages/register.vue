<template>
<f7-page no-toolbar no-navbar no-swipeback login-screen>
  <f7-login-screen-title>新用户注册</f7-login-screen-title>
  
  <f7-list form>
    <f7-list-item v-show="!codeIsSent">
      <input ref="inputTelephone" type="tel" placeholder="手机号" @input="telephone = $event.target.value" required validate />
    </f7-list-item>
    <f7-list-item v-show="codeIsSent">
      {{telephone}}
    </f7-list-item>
    <f7-list-item v-show="codeIsSent">
      <input type="tel" placeholder="验证码" @input="code = $event.target.value" />
    </f7-list-item>
    <f7-list-button v-show="!remainSeconds" @click="getCode">获取验证码</f7-list-button>
    <f7-list-button v-show="remainSeconds > 0" color="gray">重新获取({{remainSeconds}})</f7-list-button>
  </f7-list>

  <f7-block text-color="red" v-show="errorMsg">
    <p>{{errorMsg}}</p>
  </f7-block>

  <f7-list v-if="codeIsSent">
    <f7-list-button @click="signUp">立即注册</f7-list-button>
  </f7-list>

  <f7-list v-show="!codeIsSent">
    <f7-list-item>
      <router-link class="external" to="/login/">密码登录</router-link>
    </f7-list-item>
  </f7-list>

  <div class="fixed-bottom">
    <f7-block class="center">
      <p>注册即代表同意<f7-link @click="openPolicy = true">个人信息保护政策</f7-link></p>
    </f7-block>
  </div>
  
  <f7-popup :opened="openPolicy" @popup:closed="openPolicy = false">
    <f7-page>
      <f7-navbar title="个人信息保护政策">
        <f7-nav-right>
          <f7-link popup-close>关闭</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-block>
        <p>Here comes popup. You can put here anything, even independent view with its own navigation. Also not, that by default popup looks a bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
        <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
      </f7-block>
    </f7-page>
  </f7-popup>

</f7-page>
</template>

<script>
export default {
  data() {
    return {
      telephone: '',
      code: '',
      codeIsSent: false,
      remainSeconds: 0,
      errorMsg: '',
      openPolicy: false
    };
  },
  methods: {
    async signUp() {
      const self = this;

      if (self.telephone && self.code) {
        const form = {
          telephone: self.telephone,
          code: self.code
        };
        self.errorMsg = '';
        const resp = await self.$service.registerByCode(form);
        console.log(resp);
        if (resp.data && resp.data.loginToken) {
          // set session token
          sessionStorage.setItem('loginToken', resp.data.loginToken);
          self.$router.push('/home/');
        } else {
          self.errorMsg = resp.msg;
        }
      }
    },
    async getCode() {
      const self = this;
      // const app = self.$f7;
      // 手机号验证
      const regex = /^1[0-9]{10}$/;
      if (!regex.test(self.telephone)) {
        self.$toast('请输入正确的手机号');
        self.$refs.inputTelephone.focus();
        return;
      }
      if (self.telephone) {
        // const resp = { code: 1 };
        self.errorMsg = '';
        const resp = await self.$service.getRegCode(self.telephone);
        console.log(resp);

        if (resp.status == 0) {
          self.$toast(`已发送短信到: ${self.telephone}`);
          self.codeIsSent = true;
          self.remainSeconds = 60;
          self.intervalId = setInterval(() => {
            self.remainSeconds--;
            if (self.remainSeconds <= 0) {
              clearInterval(self.intervalId);
            }
          }, 1000);
        } else {
          self.$toast(resp.msg);
          self.errorMsg = resp.msg;
        }
      }
    }
  },
  mounted() {
    // const self = this;
    // console.log(self.$service);
    // console.log(service);
    // const app = self.$f7;
    // const router = self.$f7router;
  }
};
</script>
