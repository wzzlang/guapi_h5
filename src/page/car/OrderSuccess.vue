<template>
  <div class="success pdt">
    <head-title href="/" :title="title"></head-title>
    <div class="success-top white">
      <img src="../../assets/icon61.png">
      <p class="title">提交成功</p>
      <p>您的订单已经成功提交，请您在一小时内付款</p>
      <p>成功付款后，我们将尽快处理</p>
    </div>
    <div class="success-cont white">
      <div class="flex-box middle">
        <p class="title flex">应付含手续费</p>
        <p class="intro">${{list.pay_fee | toFixed}}</p>
      </div>
      <div class="flex-box middle">
        <p class="title flex">约人民币</p>
        <p class="intro">￥{{list.total | toFixed}}</p>
      </div>
    </div>
    <div @click="payTap" class="submit-btn">确认进行支付</div>
  </div>
</template>

<script>
export default {
  name: 'OrderSuccess',
  data () {
    return {
      title: '订单提交',
      type: null, // 1-商城订单 2-云仓订单
      list: []
    }
  },
  computed: {
  },
  created: function () {
    this.list = JSON.parse(decodeURIComponent(this.$route.params.list))
    this.type = this.$route.params.type
    console.log(this.type, this.list)
  },
  methods: {
    // 确认进行支付
    payTap: function () {
      // 微信浏览器
      let url = null
      if (parseInt(this.type) === 1) {
        url = this.api.pay_orders
      } else {
        url = this.api.pay_clouds
      }
      console.log(url)
      console.log({
        ordersn: this.list.ordersn,
        phone: this.$store.state.isLogin,
        paystyle: this.list.paystyle
      })
      this.axios.post(url, {
        ordersn: this.list.ordersn,
        phone: this.$store.state.isLogin,
        paystyle: this.list.paystyle
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.data.code === '200') {
          window.location.href = res.data.data.url
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
.success{}
.success-top{margin-bottom:rem(15);padding:rem(20) 0;text-align:center;color:#565656;
  img{display:block;margin:0 auto rem(5) auto;width:rem(50);}
  .title{margin-bottom:rem(10);font-size:rem(18);color:#333;}
}
.success-cont{padding:rem(10) rem(15);font-size:rem(14);line-height:rem(30);
  .intro{color:#565656;}
}
</style>
