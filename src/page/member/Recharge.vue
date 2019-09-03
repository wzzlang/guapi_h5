<template>
  <div class="recharge pdt pbb">
    <head-title :title="title"></head-title>
    <div class="pick-item top white">
      <div class="pick-title flex-box middle">
        <p class="title flex">充值金额</p>
      </div>
      <ul class="recharge-ul clear">
        <li v-for="(item, index) in rechargeList" :key="index" class="recharge-li">
          <p @click="moneyTap(index)" :class="{'active':moneyType==index}">${{item | toFixed}}</p>
        </li>
      </ul>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">支付方式</p>
      </div>
      <div class="pick-cont bor">
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">微信支付</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">需要额外支付手续 1.5%</p>
            <p @click="choosePayTap(0)" :class="['pick-pay-check', {'active':payType==0}]"></p>
          </div>
        </div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">支付宝支付</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">需要额外支付手续 1.5%</p>
            <p @click="choosePayTap(1)" :class="['pick-pay-check', {'active':payType==1}]"></p>
          </div>
        </div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">POLI</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">安全澳币支付方式，无手续费</p>
            <p @click="choosePayTap(2)" :class="['pick-pay-check', {'active':payType==2}]"></p>
          </div>
        </div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">澳洲银行转账</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">人工审核到账较慢，无手续费</p>
            <p @click="choosePayTap(3)" :class="['pick-pay-check', {'active':payType==3}]"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">订单小结</p>
      </div>
      <div class="pick-cont">
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">应付金额</p>
          <p class="pick-sec-p flex">${{rechargeList[moneyType] | toFixed}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">跨境支付手续费</p>
          <p class="pick-sec-p flex">${{charge}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">应付含手续费</p>
          <p class="pick-sec-p flex">${{money}}</p>
        </div>
      </div>
    </div>
    <div @click="submitTap" class="submit-btn">提交</div>
  </div>
</template>

<script>
export default {
  name: 'MyIntegral',
  data () {
    return {
      title: '余额充值',
      rechargeList: [200, 300, 500, 1000, 1500, 2000],
      moneyType: 0, // 选择冲多少钱下标
      payType: 0, // 支付方式 0 微信支付 1 支付宝 2 POLI
      charge: 0, // 手续费
      money: 0 // 应付含手续费
    }
  },
  computed: {
  },
  created: function () {
    this.getMoney()
  },
  methods: {
    // 选择冲多少钱
    moneyTap: function (index) {
      this.moneyType = index
      this.getMoney()
    },
    // 选择支付方式
    choosePayTap: function (pay) {
      this.payType = pay
      this.getMoney()
    },
    // 计算手续费和应付含手续费
    getMoney: function () {
      let rechargeList = this.rechargeList
      let moneyType = this.moneyType
      let payType = this.payType
      if ((payType === 0) || (payType === 1)) {
        this.charge = rechargeList[moneyType] * 0.015
        this.money = rechargeList[moneyType] + this.charge
      } else {
        this.charge = 0
        this.money = rechargeList[moneyType]
      }
    },
    submitTap: function () {
      if (this.payType !== 3) {
        this.axios.post(this.api.recharge, {
          phone: this.$store.state.isLogin,
          money: this.money * 100,
          paystyle: this.payType
        }).then(res => {
          console.log(res)
          if (res.data.code === '200') {
            window.location.href = res.data.data
          } else {
            this.util.toast(res.data.msg)
          }
        })
      } else if (this.payType === 3) {
        this.axios.post(this.api.tantrer, {
          phone: this.$store.state.isLogin,
          money: this.money * 100
        }).then(res => {
          console.log(res)
          this.util.toast(res.data.msg)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/storePicking';
.recharge{margin-bottom:rem(10);}
.recharge-ul{padding:rem(10)}
.recharge-li{padding:rem(5);float:left;width:33.33%;text-align:center;
  p{background-color:#F8F8F8;line-height:rem(80);border-radius:rem(5);
    &.active{background-color:$red;color:#fff;background-repeat:no-repeat;background-position:95% 5%;background-image:url(../../assets/icon26.png);background-size:rem(20);}
  }
}
</style>
