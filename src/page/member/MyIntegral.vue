<template>
  <div class="integ pdt pbb">
    <head-title :title="title"></head-title>
    <div class="integ-main">
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">我的积分</p>
          <p class="num">当前积分：4000分</p>
        </div>
        <div class="flex-box">
          <p class="flex">500分=$1，积分可以用来抵用现金，每个订单最多可使用5000个积分，积分和优惠代码可同时使用</p>
          <router-link to="/Help" class="integ-btn" tag="p">积分规则</router-link>
        </div>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">邀请，奖励积分</p>
        </div>
        <p>每成功通过链接，邀请一位好友成功注册，奖励200个积分。好友完成首次商品结账后，再奖励500个积分</p>
        <div class="integ-link">
          <p>您的推广链接</p>
          <div class="integ-link-a flex-box middle between">
            <span>{{shareUrl}}</span>
            <p class="integ-btn">复制</p>
          </div>
        </div>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">签到，奖励积分</p>
          <router-link to="/Mine" class="integ-btn bkg" tag="p">立即签到</router-link>
        </div>
        <p>每个会员每天在平台官方微信公众号(GuaPiDaiFa)或小程序签到，可以获得相应积分奖励！可以获得相应积分奖励！最高每天可以领取40个积分</p>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">分享，奖励积分</p>
          <p class="integ-btn">分享</p>
        </div>
        <p>每天首次分享平台链接，或者评价到微信朋友圈，</p>
        <p>或微博等社交平台，奖励100个积分</p>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">晒单，奖励积分</p>
        </div>
        <p>会员收货后，在微信朋友圈，或微博等社交平台，每个晒单奖励5元人名币现金红包，和200个积分</p>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">登录，奖励积分</p>
        </div>
        <p>首次登录微信商城，奖励100个积分。现在就关注平台官方微信公众号(GuaPiDaiFa)</p>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">注册，奖励积分</p>
        </div>
        <p>新会员注册，奖励500个积分</p>
      </div>
      <div class="integ-item white">
        <div class="integ-title flex-box middle">
          <p class="title flex">互动，奖励积分</p>
        </div>
        <p>关注平台官方微信客服(待定)，小助理不定时发放积分</p>
      </div>
    </div>
    <div class="submit-btn flex-box">
      <router-link to="/MyIntegralInvite" tag="div" class="submit-btn-a bkg flex">受邀好友</router-link>
      <router-link to="/MyIntegralWater" tag="div" class="submit-btn-a flex">佣金流水</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIntegral',
  data () {
    return {
      title: '我的积分',
      shareUrl: '' // 推广链接
    }
  },
  computed: {
  },
  created: function () {
    this.getCollectList()
  },
  methods: {
    // 获取推广链接
    getCollectList: function () {
      this.axios.post(this.api.shares, {
        phone: this.$store.state.isLogin
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.shareUrl = res.data.data.url
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
</style>
