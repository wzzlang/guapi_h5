<template>
  <div class="recip pdt pbb">
    <head-title :title="title"></head-title>
    <div class="recip-form white">
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">姓名<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="realname" placeholder="请填写姓名">
        </dd>
      </dl>
      <p v-show="false" id="output" v-py.upperfirst="realname"></p>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">手机<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="mobile" placeholder="请填写手机号码">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">省市区<span>*</span></dt>
        <dd class="recip-dd flex flex-box">
          <v-distpicker province="省" city="市" area="区" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
        </dd>
      </dl>
      <div class="border"></div>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">地址<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="address" placeholder="请填写详细地址">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">邮编</dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" v-model="zipcode" placeholder="请填写邮政编码">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">默认收件人</dt>
        <dd class="recip-dd flex">
          <div class="recip-default flex-box middle right">
            <img @click="isDefaultTap" v-if="isdefault==0" src="../../assets/icon52.png">
            <img @click="isDefaultTap" v-else src="../../assets/icon53.png">
          </div>
        </dd>
      </dl>
    </div>
    <div class="recip-remark white">
      <p class="title">备注</p>
      <textarea class="remark-remark-area" placeholder="请填写备注" v-model="remark"></textarea>
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
      title: '添加收件人',
      parcelId: 0, // 包裹id
      realname: null, // 真实姓名
      mobile: null, // 手机
      province: null, // 省
      city: null, // 市
      area: null, // 区
      address: null, // 地址
      zipcode: null, // 邮编
      remark: null, // 备注
      isdefault: 0
    }
  },
  computed: {
  },
  created: function () {
    this.parcelId = this.$route.params.id
  },
  methods: {
    onChangeProvince: function (e) {
      console.log(e)
      this.province = e.value
    },
    onChangeCity: function (e) {
      console.log(e)
      this.city = e.value
    },
    onChangeArea: function (e) {
      console.log(e)
      this.area = e.value
    },
    // 是否设置为默认
    isDefaultTap: function () {
      this.isdefault = this.isdefault === 0 ? 1 : 0
    },
    // 提交
    submitTap: function () {
      if (!(this.util.isEmpty(this.realname, '请填写姓名'))) {
        return
      }
      if (!(this.util.isPhone(this.mobile))) {
        return
      }
      if (!this.province || this.province === '省') {
        this.util.toast('请选择省份')
        return
      }
      if (!this.city || this.city === '市') {
        this.util.toast('请选择市')
        return
      }
      if (!this.area || this.area === '区') {
        this.util.toast('请选择区')
        return
      }
      if (!(this.util.isEmpty(this.address, '请填写详细地址'))) {
        return
      }
      this.util.loading()
      console.log({
        phone: this.$store.state.isLogin,
        realname: this.realname,
        ename: document.querySelector('#output').innerHTML,
        mobile: this.mobile,
        area: `${this.province},${this.city},${this.area}`,
        address: this.address,
        zipcode: this.zipcode,
        remark: this.remark,
        isdefault: this.isdefault
      })
      this.axios.post(this.api.add_receipt, {
        phone: this.$store.state.isLogin,
        realname: this.realname,
        ename: document.querySelector('#output').innerHTML,
        mobile: this.mobile,
        area: `${this.province},${this.city},${this.area}`,
        address: this.address,
        zipcode: this.zipcode,
        remark: this.remark,
        isdefault: this.isdefault
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.data.code === '200') {
          console.log({
            phone: this.$store.state.isLogin,
            bkg_id: this.parcelId,
            id: res.data.data.info.id
          })
          this.axios.post(this.api.replace_recipet_to_bkg, {
            phone: this.$store.state.isLogin,
            bkg_id: this.parcelId,
            id: parseInt(res.data.data.info.id)
          }).then(res => {
            console.log(res)
            if (res.data.code === '200') {
              this.$router.go(-1)
            } else {
              this.util.toast(res.data.msg)
            }
          })
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
