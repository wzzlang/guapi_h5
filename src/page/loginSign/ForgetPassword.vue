<template>
  <div class="login pdt">
    <head-title :title="title"></head-title>
    <div class="login-form white">
      <div class="login-phone flex-box">
        <select v-model="areacode" class="login-sel">
          <option value="0">中国</option>
          <option value="1">澳洲</option>
        </select>
        <input class="login-inp flex" type="text" name="" v-model="phone" placeholder="请填写手机号码">
      </div>
      <div class="border"></div>
      <div class="login-phone flex-box middle">
        <input class="login-inp flex" type="text" name="" v-model="code" placeholder="请填写短信验证码">
        <div @click="getCodeTap" class="login-code">{{sendCode}}</div>
      </div>
    </div>
    <div class="login-form white">
      <input class="login-inp" type="password" name="" v-model="password" placeholder="请填写新密码">
      <div class="border"></div>
      <input class="login-inp" type="password" name="" v-model="oncepassword" placeholder="请再次填写新密码">
    </div>
    <div class="login-main">
      <button @click="updatePasswordTap" class="login-btn">更新密码</button>
      <div class="login-else">
        <router-link to="/LoginPhone" tag="p">已经想起密码？</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPassword',
  data () {
    return {
      title: '忘记密码',
      sendCode: '获取验证码',
      phone: '',
      areacode: 1, // 中国传0 澳洲传1
      password: '',
      oncepassword: '',
      code: ''
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    // 发送验证码
    getCodeTap: function () {
      if (typeof this.sendCode === 'number') {
        return
      }
      if (!(this.util.isPhone(this.phone))) {
        return
      }
      this.axios.post(this.api.getCode, {
        phone: this.phone,
        areacode: parseInt(this.areacode)
      }).then(res => {
        console.log(res)
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
    // 确认修改密码
    updatePasswordTap: function () {
      if (!(this.util.isPhone(this.phone))) {
        return
      }
      if (!(this.util.isEmpty(this.code, '请输入验证码'))) {
        return
      }
      if (!(this.util.isPassword(this.password))) {
        return
      }
      if (!(this.util.isPassword(this.oncepassword))) {
        return
      }
      if (!(this.password === this.oncepassword)) {
        this.util.toast('两次输入的密码不一致')
        return
      }
      this.util.loading()
      this.axios.post(this.api.update_password, {
        areacode: this.areacode + '',
        phone: this.phone,
        code: this.code,
        password: this.password
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('修改密码成功')
          setTimeout(() => {
            this.$router.push({path: '/LoginPhone'})
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
