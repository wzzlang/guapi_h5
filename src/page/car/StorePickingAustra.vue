<template>
  <div class="pick pdt pbb">
    <head-title :title="title"></head-title>
    <div class="pick-top white">
      <p class="title">门店自取</p>
      <p>澳洲直邮的购物车的商品只能在澳大利亚的门店自取，国内现货购物车的商品只能在中国的门店自取，门店自取需额外支付服务费，此费用下单后不能退回</p>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">门店信息</p>
        <div class="pick-btn flex-box middle">
          <p @click="chooseStoreTap">选择</p>
        </div>
      </div>
      <div class="pick-cont">
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">门店名称</p>
          <p class="pick-sec-p flex">{{list.stores[storeIndex].name}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">联络电话</p>
          <p class="pick-sec-p flex">{{list.stores[storeIndex].mobile}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">详细地址</p>
          <p class="pick-sec-p flex">{{list.stores[storeIndex].address}}</p>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">取货信息</p>
        <div class="pick-btn flex-box middle">
          <router-link to="/AddresserAdd" class="bkg" tag="p">添加</router-link>
          <router-link to="/AddresserLead/1" class="bkg" tag="p">导入</router-link>
        </div>
      </div>
      <div class="pick-cont">
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">取货人姓名</p>
          <p class="pick-sec-p flex">{{picker ? picker.name : ''}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">取货人澳洲手机</p>
          <p class="pick-sec-p flex">{{picker ? picker.amobile : ''}}</p>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">确认商品</p>
        <div class="pick-btn flex-box middle">
          <p @click="backCarTap">返回修改购物车</p>
        </div>
      </div>
      <div class="pick-cont">
        <div v-for="item in list.goods" :key="item.id" class="pick-ware">
          <div class="pick-ware-item flex-box">
            <div class="pick-ware-img">
              <img :src="item.images">
            </div>
            <div class="pick-ware-desc flex">
              <p class="title">{{item.goodname}}</p>
              <p>{{item.goodename}}</p>
              <div class="pick-ware-spec flex-box">
                <p class="flex">{{item.warehouse}} ${{item.price}} X {{item.num}}</p>
                <p class="price">${{item.total}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="pick-ware-price flex-box">
          <p class="flex">已选择 {{totalNum}} 件商品</p>
          <p class="price">总价（不含运费）<span> ${{totalPrice}}</span></p>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">订单备注</p>
      </div>
      <div class="pick-cont">
        <textarea class="pick-area" v-model="remark" placeholder="请填写订单备注"></textarea>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">支付方式</p>
      </div>
      <div class="pick-cont bor">
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">优惠代码</p>
          <div class="pick-pay flex flex-box">
            <p class="pick-pay-p flex">
              <input class="pick-pay-span" type="" name="" v-model="couponCode" placeholder="请填写可用的优惠代码">
            </p>
            <p @click="useCouponCodeTap" class="pick-pay-use">应用</p>
          </div>
        </div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">余额支付</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">您当前余额 ${{list.credit1}}</p>
            <img @click="isBalanceTap" v-if="!isBalance" class="pick-pay-switch" src="../../assets/icon52.png">
            <img @click="isBalanceTap" v-else class="pick-pay-switch" src="../../assets/icon53.png">
          </div>
        </div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">积分支付</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">您当前积分 {{list.credit2}}分</p>
            <img @click="isIntegTap" v-if="!isInteg" class="pick-pay-switch" src="../../assets/icon52.png">
            <img @click="isIntegTap" v-else class="pick-pay-switch" src="../../assets/icon53.png">
          </div>
        </div>
        <div class="border"></div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">微信支付</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">需要额外支付手续 {{list.wxcharge}}%</p>
            <p @click="choosePayTap(0)" :class="['pick-pay-check', {'active':payType==0}]"></p>
          </div>
        </div>
        <div v-if="this.$store.state.environ != 1" class="pick-sec flex-box middle">
          <p class="pick-sec-tit">支付宝支付</p>
          <div class="pick-pay flex flex-box middle">
            <p class="pick-pay-p flex">需要额外支付手续 {{list.apipaycharge}}%</p>
            <p @click="choosePayTap(1)" :class="['pick-pay-check', {'active':payType==1}]"></p>
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
          <p class="pick-sec-tit">商品费用</p>
          <p class="pick-sec-p flex">${{totalPrice | toFixed}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">门店自取费用</p>
          <p class="pick-sec-p flex">${{list.store_fee | toFixed}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">总计</p>
          <p class="pick-sec-p flex">${{(parseFloat(totalPrice)+parseFloat(list.store_fee)) | toFixed}}</p>
        </div>
        <div class="border"></div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">优惠代码</p>
          <p class="pick-sec-p flex">{{couponCodeMoney ? '-$'+couponCodeMoney+'（'+couponCode+'）' : '没有选择优惠代码'}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">余额抵扣</p>
          <p class="pick-sec-p flex">{{isBalance ? '$'+balanceDde : '没有选择余额抵扣'}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">积分抵扣</p>
          <p class="pick-sec-p flex">{{isInteg ? '-$'+isIntegDed+'（'+list.credit2+'分）' : '没有选择积分抵扣'}}</p>
        </div>
        <div class="border"></div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">应付金额</p>
          <p class="pick-sec-p flex">${{payMoney | toFixed}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">跨境支付手续费</p>
          <p class="pick-sec-p flex">${{(payType==0 ? wxPayCharge : aliPayCharge) | toFixed}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">应付含手续费</p>
          <p class="pick-sec-p flex">${{payAllMoney | toFixed}}</p>
        </div>
      </div>
    </div>
    <div class="pick-read flex-box middle">
      <div @click="agreeTap" :class="['pick-read-check', {'active':agree}]"></div>
      <p class="flex">我已阅读并同意服务条款</p>
    </div>
    <button @click="submitTap" class="submit-btn">提交门店自取</button>
  </div>
</template>

<script>
export default {
  name: 'StorePickingAustra',
  data () {
    return {
      title: '门店自取',
      list: [],
      totalNum: 0, // 总共多少件商品
      totalPrice: 0, // 总价格多少
      picker: {}, // 取件人
      remark: '', // 订单备注
      storeIndex: 0, // 选择第几个门店
      payType: 0, // 0-微信支付 1-支付宝支付
      balanceDde: 0, // 余额抵扣
      isIntegDed: 0, // 积分抵扣金额
      wxPayCharge: 0, // 微信支付手续费
      aliPayCharge: 0, // 支付宝支付手续费
      couponCode: '', // 优惠代码
      couponCodeMoney: 0, // 优惠代码减免多少钱
      isBalance: false, // 是否余额支付
      isInteg: false, // 是否积分抵扣
      payMoney: 0, // 应付金额
      payAllMoney: 0, // 应付金额含税
      agree: true
    }
  },
  computed: {
  },
  created: function () {
    let params = JSON.parse(decodeURIComponent(this.$route.params.list))
    this.axios.post(this.api.save_store_good_info, params).then(res => {
      console.log(res)
      if (res.data.code === '200') {
        this.list = res.data.data
        let totalNum = 0
        let totalPrice = 0
        this.list.goods.map(item => {
          totalNum += item.num
          totalPrice += item.total
        })
        this.totalNum = totalNum
        this.totalPrice = totalPrice
        this.getPayMoney()
        this.storeIndex = this.$store.state.storeIndex
        this.picker = this.$store.state.picker // 取件人
      } else {
        this.util.toast(res.data.msg)
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      }
    })
  },
  methods: {
    // 选择微信支付和支付宝支付
    choosePayTap: function (pay) {
      this.payType = pay
      this.getPayMoney()
    },
    // 选择门店
    chooseStoreTap: function () {
      let storeList = encodeURIComponent(JSON.stringify(this.list.stores))
      this.$router.push({path: `/ChooseStore/${storeList}`})
    },
    // 应用优惠代码
    useCouponCodeTap: function () {
      if (!(this.util.isEmpty(this.couponCode, '请输入优惠代码'))) {
        return
      }
      this.axios.post(this.api.use_coupon, {
        phone: this.$store.state.isLogin,
        coupon: this.couponCode,
        money: this.totalPrice,
        scenario: 2
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('使用成功')
          if (res.data.data.way === 0) {
            this.couponCodeMoney = res.data.data.knock
          } else {
            this.couponCodeMoney = res.data.data.discount / 10 * this.totalPrice
          }
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 选择余额支付
    isBalanceTap: function () {
      this.isBalance = !this.isBalance
      this.getPayMoney()
    },
    // 选择积分支付
    isIntegTap: function () {
      this.isInteg = !this.isInteg
      this.getPayMoney()
    },
    // 计算应付金额
    getPayMoney: function () {
      let payMoney = parseFloat(this.totalPrice) + parseFloat(this.list.store_fee)
      if (this.isBalance) {
        if (parseFloat(this.list.credit1) - parseFloat(this.couponCodeMoney) > parseFloat(payMoney)) {
          this.balanceDde = payMoney
          payMoney = 0
        } else {
          this.balanceDde = this.list.credit1
          payMoney = parseFloat(payMoney) - parseFloat(this.list.credit1) - parseFloat(this.couponCodeMoney)
        }
      }
      if (this.isInteg) {
        if (parseFloat(this.list.discount) - parseFloat(this.couponCodeMoney) > parseFloat(payMoney)) {
          this.isIntegDed = payMoney
          payMoney = 0
        } else {
          this.isIntegDed = this.list.discount
          payMoney = parseFloat(payMoney) - parseFloat(this.list.discount) - parseFloat(this.couponCodeMoney)
        }
      }
      this.payMoney = payMoney
      this.getPayAllMoney()
    },
    // 计算应付金额含税
    getPayAllMoney: function () {
      this.getCharge()
      let payAllMoney = 0
      if (this.payType === 0) {
        payAllMoney = parseFloat(this.payMoney) + parseFloat(this.wxPayCharge)
      } else if (this.payType === 1) {
        payAllMoney = parseFloat(this.payMoney) + parseFloat(this.aliPayCharge)
      }
      this.payAllMoney = payAllMoney
    },
    // 计算支付手续费
    getCharge: function () {
      let payMoney = this.payMoney
      this.wxPayCharge = payMoney * this.list.wxcharge / 1000
      this.aliPayCharge = payMoney * this.list.apipaycharge / 1000
    },
    // 返回购物车
    backCarTap: function () {
      this.$router.go(-1)
    },
    // 同意用户协议
    agreeTap: function () {
      this.agree = !this.agree
    },
    // 提交门店自取
    submitTap: function () {
      let storeid = this.list.stores[this.storeIndex].id
      let addressid = this.$store.state.picker ? this.$store.state.picker.id : null
      console.log(addressid)
      if (!storeid) {
        this.util.toast('还没有填写门店信息')
        return
      }
      if (!addressid) {
        this.util.toast('还没有填写取货信息')
        return
      }
      if (!this.agree) {
        this.util.toast('请先同意服务条款！')
        return
      }
      this.util.loading()
      let formdata = {
        areacode: 1,
        storeid: storeid,
        addressid: addressid, // 收件人id
        coupon: this.couponCode,
        phone: this.$store.state.isLogin,
        remark: this.remark,
        paystyle: this.payType, // 0 微信支付 1支付支付
        credit1: this.isBalance ? parseFloat(this.list.credit1) : null, // 余额
        credit2: this.isInteg ? this.list.credit2 : null, // 积分
        total: this.payAllMoney,
        goods_price: this.totalPrice,
        handle_price: this.payMoney,
        pay_fee: this.payType === 0 ? this.wxPayCharge : this.aliPayCharge,
        store_fee: this.list.store_fee,
        dispatch: 0, // 运费
        order_source: 0,
        goods: this.list.goods
      }
      this.axios.post(this.api.commit_store, {
        formdata: JSON.stringify(formdata)
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.data.code === '200') {
          let list = encodeURIComponent(JSON.stringify(res.data.data))
          let environ = this.$store.state.environ // 判断是小程序环境还是微信环境
          if (environ === 1) {
            // 微信小程序
            // eslint-disable-next-line
            wx.miniProgram.navigateTo({url: '/pages/pay/pay?list=' + list + '&type=1' + '&phone=' + this.$store.state.isLogin}) // type 1-商城订单 2-云仓订单
          } else {
            this.$router.push({path: `/OrderSuccess/${list}/1`})
          }
        } else {
          this.util.toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../static/style/storePicking'
</style>
