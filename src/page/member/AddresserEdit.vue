<template>
  <div class="recip pdt pbb">
    <head-title :title="title"></head-title>
    <div v-if="userInfo" class="recip-form white">
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">姓名<span>*</span></dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" name="" v-model="userInfo.name" placeholder="请填写姓名">
        </dd>
      </dl>
      <p v-show="false" id="output" v-py.upperfirst="userInfo.name"></p>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">澳洲手机(可留空)</dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" name="" v-model="userInfo.amobile" placeholder="请填写澳洲手机">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">默认海外发件人</dt>
        <dd class="recip-dd flex">
          <div class="recip-default flex-box middle right">
            <img @click="isDefaultAustraTap" v-if="userInfo.isoverseas==0" src="../../assets/icon52.png">
            <img @click="isDefaultAustraTap" v-else src="../../assets/icon53.png">
          </div>
        </dd>
      </dl>
      <div class="border"></div>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">中国手机(可留空)</dt>
        <dd class="recip-dd flex">
          <input class="recip-dd-inp" type="text" name="" v-model="userInfo.cmobile" placeholder="请填写中国手机">
        </dd>
      </dl>
      <dl class="recip-dl flex-box middle">
        <dt class="recip-dt">默认国内发件人</dt>
        <dd class="recip-dd flex">
          <div class="recip-default flex-box middle right">
            <img @click="isDefaultChinaTap"  v-if="userInfo.isdomestic==0" src="../../assets/icon52.png">
            <img @click="isDefaultChinaTap" v-else src="../../assets/icon53.png">
          </div>
        </dd>
      </dl>
    </div>
    <div class="recip-remark white">
      <p class="title">备注</p>
      <textarea class="remark-remark-area" v-model="userInfo.remark" placeholder="请填写备注"></textarea>
    </div>
    <div @click="submitTap" class="submit-btn">提交</div>
  </div>
</template>

<script>
import('../../plugins/vue-py.js')
export default {
  name: 'AddPickerAustra',
  data () {
    return {
      title: '编辑发件人',
      id: null,
      userInfo: []
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
      this.axios.get(`${this.api.get_sender_Info}?phone=${this.$store.state.isLogin}&id=${this.id}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let userInfo = res.data.data
          this.userInfo = userInfo
        }
      })
    },
    // 默认海外发件人
    isDefaultAustraTap: function () {
      this.userInfo.isoverseas = this.userInfo.isoverseas === 0 ? 1 : 0
    },
    // 默认国内发件人
    isDefaultChinaTap: function () {
      this.userInfo.isdomestic = this.userInfo.isdomestic === 0 ? 1 : 0
    },
    // 提交
    submitTap: function () {
      if (!(this.util.isEmpty(this.userInfo.name, '请填写姓名'))) {
        return
      }
      this.axios.post(this.api.update_sender, {
        phone: this.$store.state.isLogin,
        id: this.id,
        name: this.userInfo.name,
        ename: document.querySelector('#output').innerHTML,
        amobile: this.userInfo.amobile,
        isoverseas: this.userInfo.isoverseas,
        cmobile: this.userInfo.cmobile,
        isdomestic: this.userInfo.isdomestic,
        remark: this.userInfo.remark
      }).then(res => {
        console.log(res)
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
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
.recip-dt{width:rem(120);}
</style>
