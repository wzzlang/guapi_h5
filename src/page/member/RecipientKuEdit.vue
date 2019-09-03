<template>
  <div class="recip pdt pbb">
    <head-title :title="title"></head-title>
    <div class="recip-notice flex-box white">
      <img src="../../assets/icon44.png">
      <p class="flex">更新收件人信息并不影响已经生成的订单。若您需要更新现有订单的收件信息，请联络客服更新。</p>
    </div>
    <div v-if="userInfo" class="recip-form white">
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">姓名<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="userInfo.realname" placeholder="请填写姓名">
        </dd>
      </dl>
      <p v-show="false" id="output" v-py.upperfirst="userInfo.realname"></p>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">手机<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="userInfo.mobile" placeholder="请填写手机号码">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">省市区<span>*</span></dt>
        <dd class="recip-dd flex flex-box">
          <v-distpicker :province="userInfo.area[0]" :city="userInfo.area[1]" :area="userInfo.area[2]" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
        </dd>
      </dl>
      <div class="border"></div>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">地址<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="userInfo.address" placeholder="请填写详细地址">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">邮编</dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="userInfo.zipcode" placeholder="请填写邮政编码">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">默认收件人</dt>
        <dd class="recip-dd flex">
          <div class="recip-default flex-box middle right">
            <img @click="isDefaultTap" v-if="userInfo.isdefault == 0" src="../../assets/icon52.png">
            <img @click="isDefaultTap" v-else src="../../assets/icon53.png">
          </div>
        </dd>
      </dl>
    </div>
    <div v-if="userInfo" class="recip-remark white">
      <p class="title">备注</p>
      <textarea class="remark-remark-area" placeholder="请填写备注" v-model="userInfo.remark"></textarea>
    </div>
    <div @click="submitTap" class="submit-btn">提交</div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import('../../plugins/vue-py.js')
export default {
  name: 'WareDetails',
  components: {
    VDistpicker
  },
  data () {
    return {
      title: '编辑收件人',
      id: null,
      userInfo: null
    }
  },
  computed: {
  },
  created: function () {
    this.id = this.$route.params.id
    this.getUSerInfo()
  },
  methods: {
    // 获取收件人信息
    getUSerInfo: function () {
      this.axios.get(`${this.api.get_recipt_info}?phone=${this.$store.state.isLogin}&id=${this.id}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let userInfo = res.data.data
          userInfo.area = userInfo.area.split('/')
          this.userInfo = userInfo
          console.log('收件人信息', this.userInfo)
        }
      })
    },
    // 省选择
    onChangeProvince: function (e) {
      console.log(e)
      this.userInfo.area[0] = e.value
    },
    // 市选择
    onChangeCity: function (e) {
      console.log(e)
      this.userInfo.area[1] = e.value
    },
    // 区选择
    onChangeArea: function (e) {
      console.log(e)
      this.userInfo.area[2] = e.value
    },
    // 是否设置为默认
    isDefaultTap: function () {
      this.userInfo.isdefault = this.userInfo.isdefault === 0 ? 1 : 0
    },
    // 提交
    submitTap: function () {
      if (!(this.util.isEmpty(this.userInfo.realname, '请填写姓名'))) {
        return
      }
      if (!(this.util.isPhone(this.userInfo.mobile))) {
        return
      }
      if (!this.userInfo.area[0] || this.userInfo.area[0] === '省') {
        this.util.toast('请选择省份')
        return
      }
      if (!this.userInfo.area[1] || this.userInfo.area[1] === '市') {
        this.util.toast('请选择市')
        return
      }
      if (!this.userInfo.area[2] || this.userInfo.area[2] === '区') {
        this.util.toast('请选择区')
        return
      }
      if (!(this.util.isEmpty(this.userInfo.address, '请填写详细地址'))) {
        return
      }
      this.util.loading()
      console.log({
        phone: this.$store.state.isLogin,
        id: this.id,
        realname: this.userInfo.realname,
        ename: document.querySelector('#output').innerHTML,
        mobile: this.userInfo.mobile,
        area: `${this.userInfo.area[0]},${this.userInfo.area[1]},${this.userInfo.area[2]}`,
        address: this.userInfo.address,
        zipcode: this.userInfo.zipcode,
        remark: this.userInfo.remark,
        isdefault: this.userInfo.isdefault
      })
      this.axios.post(this.api.update_receipt, {
        phone: this.$store.state.isLogin,
        id: this.id,
        realname: this.userInfo.realname,
        ename: document.querySelector('#output').innerHTML,
        mobile: this.userInfo.mobile,
        area: `${this.userInfo.area[0]},${this.userInfo.area[1]},${this.userInfo.area[2]}`,
        address: this.userInfo.address,
        zipcode: this.userInfo.zipcode,
        remark: this.userInfo.remark,
        isdefault: this.userInfo.isdefault
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.data.code === '200') {
          this.$router.go(-1)
        } else {
          this.util.toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../static/style/addRecipient'
</style>
