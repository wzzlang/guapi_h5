<template>
  <div class="login pdt">
    <head-title :title="title"></head-title>
    <div class="login-form white">
      <input class="login-inp flex" type="text" name="" v-model="name" placeholder="请填写会员名称">
      <div class="border"></div>
      <input class="login-inp" type="password" name="" v-model="password" placeholder="请填写登录密码">
    </div>
    <div class="login-main">
      <button @click="loginTap" class="login-btn">登录</button>
      <div class="login-com flex-box middle between">
        <router-link to="/ForgetPassword" tag="p">忘记密码？</router-link>
        <router-link to="/SignIn" tag="span">注册</router-link>
      </div>
      <div @click="weChatLoginTap" class="login-wechat">
        <img src="../../assets/icon47.png">
        <p>微信登录</p>
      </div>
      <div class="login-else">
        <router-link to="/LoginPhone" tag="p">使用手机号码登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPhone',
  data () {
    return {
      title: '登录',
      name: '',
      password: ''
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    // 用户昵称登录
    loginTap: function () {
      if (!(this.util.isEmpty(this.name, '请输入会员名称'))) {
        return
      }
      if (!(this.util.isPassword(this.password))) {
        return
      }
      this.util.loading()
      this.axios.post(this.api.login, {
        name: this.name,
        password: this.password
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('登录成功')
          this.$store.commit('isLogin', res.data.data.phone)
          setTimeout(() => {
            this.$router.push({path: '/'})
          }, 1500)
        } else {
          this.util.toast(res.data.msg)
        }
        this.util.close()
      })
    },
    // 微信登录
    weChatLoginTap: function () {
      let local = this.api.h5_login
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9c7f9426e8f27d56&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
