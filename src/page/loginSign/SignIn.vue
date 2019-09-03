<template>
  <div class="login pdt">
    <head-title :title="title"></head-title>
    <div class="login-form white">
      <div class="login-phone flex-box">
        <select v-model="areacode" class="login-sel">
          <option value="0">中国</option>
          <option value="1">澳洲</option>
        </select>
        <input class="login-inp flex" type="number" name="" v-model="phone"  placeholder="请填写手机号码">
      </div>
      <div class="border"></div>
      <div class="login-phone flex-box middle">
        <input class="login-inp flex" type="text" name="" v-model="code" placeholder="请填写短信验证码">
        <div @click="getCodeTap" class="login-code">{{sendCode}}</div>
      </div>
    </div>
    <div class="login-form white">
      <input class="login-inp" type="password" v-model="password" name="" placeholder="请填写登录密码">
      <div class="border"></div>
      <input class="login-inp" type="text" name="" v-model="name" placeholder="请填写会员名称">
    </div>
    <div class="login-main">
      <button @click="signTap" class="login-btn">注册</button>
      <div class="login-else">
        <router-link to="/LoginPhone" tag="p">已经拥有帐号？</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPhone',
  data () {
    return {
      title: '注册',
      sendCode: '获取验证码',
      phone: '',
      areacode: 1, // 中国传0 澳洲传1
      password: '',
      name: '',
      code: ''
    }
  },
  computed: {
  },
  created: function () {},
  methods: {
    // 发送验证码
    getCodeTap: function () {
      console.log(this.api.getCode)
      if (typeof this.sendCode === 'number') {
        return
      }
      if (!(this.util.isPhone(this.phone))) {
        return
      }
      this.util.loading()
      this.axios.post(this.api.getCode, {
        phone: this.phone,
        areacode: parseInt(this.areacode)
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.status === 200) {
          let time = 90
          let countTime = setInterval(() => {
            this.sendCode = time--
            if (time < 0) {
              clearInterval(countTime)
              this.sendCode = '重新发送'
            }
          }, 1000)
        } else {
          this.util.toast('验证码发送失败')
        }
      })
    },
    // 确认注册
    signTap: function () {
      if (!(this.util.isPhone(this.phone))) {
        return
      }
      if (!(this.util.isEmpty(this.code, '请输入验证码'))) {
        return
      }
      if (!(this.util.isPassword(this.password))) {
        return
      }
      if (!(this.util.isEmpty(this.name, '请输入会员名称'))) {
        return
      }
      this.util.loading()
      this.axios.post(this.api.reg, {
        areacode: this.areacode,
        phone: this.phone,
        code: this.code,
        password: this.password,
        name: this.name
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('注册成功')
          this.$store.commit('isLogin', this.phone)
          setTimeout(() => {
            this.$router.push({path: '/'})
          }, 1500)
        } else {
          this.util.toast(res.data.msg)
        }
        this.util.close()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
