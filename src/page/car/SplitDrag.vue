<template>
  <div class="pick pdt pbb">
    <head-title :title="title"></head-title>
    <div class="pick-top white">
      <p class="title">商城直发</p>
      <p>如果您不想将商品放入云仓，而是想要直接帮您发出。您可以通过商场直发，快速下单，由我们给您配货，打包并发货，足不出货，帮您完成一笔又一笔代购生意。</p>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">发件信息</p>
        <div class="pick-btn flex-box middle">
          <router-link to="/AddresserAdd" class="bkg" tag="p">添加</router-link>
          <router-link to="/AddresserLead/1" class="bkg" tag="p">导入</router-link>
        </div>
      </div>
      <div class="pick-cont">
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">发件人姓名</p>
          <p class="pick-sec-p flex">{{sender.name}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">发件人澳洲手机</p>
          <p class="pick-sec-p flex">{{sender.amobile}}</p>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">收件信息</p>
        <div class="pick-btn flex-box middle">
          <router-link to="/RecipientKuAdd/0" tag="p">添加</router-link>
          <router-link to="/RecipientLead/0" tag="p">导入</router-link>
        </div>
      </div>
      <div class="pick-cont">
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">收件人姓名</p>
          <p class="pick-sec-p flex">{{recipient ? recipient.realname : ''}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">收件人手机</p>
          <p class="pick-sec-p flex">{{recipient ? recipient.mobile : ''}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">收件人地址</p>
          <p class="pick-sec-p flex">{{recipient ? recipient.area : ''}} {{recipient ? recipient.address : ''}}</p>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">包裹拆分</p>
        <div class="pick-btn flex-box middle">
          <router-link :to="'/RecipientZuAdd/'+ids" tag="p">添加收件人组</router-link>
          <router-link :to="'/LeadRecipientZu/'+ids" tag="p">导入收件人组</router-link>
        </div>
      </div>
      <div class="pick-cont">
        <div class="pick-parcel">
          <div v-for="(item, index) in list.parces" :key="index" class="pick-parcel-item">
            <div class="flex-box middle">
              <p class="title flex">包裹{{index+1}}</p>
              <p @click="deleteParceTap(item.id, index)" class="delete-parce">删除包裹</p>
            </div>
            <div class="flex-box">
              <p class="flex">所属类型：{{item.typename}}</p>
              <p class="flex">包裹备注：{{item.remark}}</p>
            </div>
            <div class="flex-box">
              <p class="flex">预估重量：{{item.weight/1000}}</p>
              <p class="flex">单位运费：{{item.unintdispatch}}</p>
            </div>
            <div class="flex-box">
              <p class="flex">预估费用：{{item.dispatch}}</p>
              <p class="flex">额外补税：{{item.addtax}}</p>
            </div>
            <div class="flex-box">
              <p class="flex">代发费用：{{item.issuingfee}}</p>
              <p class="flex">物料费用：{{item.materialfee}}</p>
            </div>
            <div class="border"></div>
            <div class="pick-parcel-remark flex-box middle">
              <div class="pick-parcel-serv flex">
                <p class="price">额外服务(<span>$1.00</span>/项)</p>
                <div class="pick-parcel-serv-choose flex-box">
                  <label class="flex-box middle"><div @click="serviceTap(index, 0)" :class="['pick-searve', {'active': item.service[0]==1}]"></div><p>拍照</p></label>
                  <label class="flex-box middle"><div @click="serviceTap(index, 1)" :class="['pick-searve', {'active': item.service[1]==1}]"></div><p>标记</p></label>
                  <label class="flex-box middle"><div @click="serviceTap(index, 2)" :class="['pick-searve', {'active': item.service[2]==1}]"></div><p>视频</p></label>
                  <label class="flex-box middle"><div @click="serviceTap(index, 3)" :class="['pick-searve', {'active': item.service[3]==1}]"></div><p>其它</p></label>
                </div>
              </div>
              <input class="pick-parcel-serv-btn" type="text" name="" placeholder="额外服务备注">
            </div>
            <div class="pick-parcel-est flex-box middle">
              <p class="title flex">预估小计：<span>$14.00</span></p>
              <p class="state flex-box middle"><span>包裹空间：</span> <i v-if="item.space==0" class="blue"></i><i v-if="item.space==1" class="yellow"></i><i v-if="item.space==2"></i></p>
            </div>
            <div class="detail-parcel-desc">
              <div class="flex-box middle detail-parcel-top">
                <p class="title flex">包裹明细</p>
                <p @click="parceEditTap(item.id)" class="delete-parce">编辑包裹</p>
              </div>
              <div v-if="item.children.length > 0">
                <div v-for="sec in item.children[0].children" :key="sec.id" class="detail-parcel-a flex-box middle">
                  <p class="flex name">{{sec.goodname}}</p>
                  <p>{{sec.num}}</p>
                </div>
              </div>
            </div>
            <div v-if="item.address" class="detail-parcel-intro">
              <div class="title flex-box middle">
                <p class="flex">收件信息</p>
                <!--订单提交,付款成功状态显示-->
                <div class="detail-title-btn flex-box middle">
                  <router-link :to="`/SplitDragRecipientKuAdd/${item.id}`" tag="span">添加</router-link>
                  <router-link :to="`/SplitDragRecipientLead/${item.id}`" tag="span">替换</router-link>
                </div>
              </div>
              <p>{{item.address.realname}} {{item.address.mobile}} {{item.address.area}} {{item.address.address}}</p>
            </div>
            <div class="border"></div>
            <p v-if="item.address" class="detail-parcel-pep">身份信息：<span v-if="item.address.status==0">未上传身份证</span><span v-else>已上传身份证</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="pick-item white">
      <div class="pick-cont">
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">预估重量</p>
          <p class="pick-sec-p flex flex-box middle">
            <span class="flex">{{list.weight/1000}}KG</span>
          </p>
        </div>
        <div class="pick-sec flex-box middle">
          <p class="pick-sec-tit">转运费用</p>
          <p class="pick-sec-p flex flex-box middle">
            <span class="flex">${{list.total_fee}}</span>
          </p>
        </div>
        <p>以上分箱结果将作为您包裹拆分的最终明细，如果您对分箱结果不满意，请通过“编辑包裹”的方式来自行调整包裹明细，但受系统的分箱标准约束。所有的运费均为预估费用，在核实了实际重量后，会将多收的钱退还到会员余额中。</p>
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
          <p class="pick-sec-tit">转运费用</p>
          <p class="pick-sec-p flex">${{list.total_fee}}</p>
        </div>
        <div class="pick-sec flex-box">
          <p class="pick-sec-tit">总计</p>
          <p class="pick-sec-p flex">${{(parseFloat(totalPrice)+parseFloat(list.total_fee)) | toFixed}}</p>
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
    <div class="submit-btn flex-box">
      <div @click="addParceTap" class="submit-btn-a flex">添加包裹</div>
      <div @click="submitTap" class="submit-btn-a bkg flex">提交商城直发</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreDeliverAustra',
  data () {
    return {
      title: '拆分拖拽',
      parcesParams: null, // 拆分拖拽接口参数
      showIDIntro: false,
      list: [],
      ids: '', // 包裹id
      totalNum: 0, // 总共多少件商品
      totalPrice: 0, // 总价格多少
      sender: {}, // 发件人 (即取件人)
      recipient: null, // 收件人
      remark: '', // 订单备注
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
    this.parcesParams = JSON.parse(localStorage.getItem('parcesParams'))
    this.getSplitDrag()
  },
  methods: {
    // 获取包裹拆分数据
    getSplitDrag: function () {
      this.axios.post(this.api.auto_mall_good_infos, this.parcesParams).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data
          let ids = ''
          list.parces.map(item => {
            ids += item.id + ','
          })
          ids = ids.substring(0, ids.length - 1)
          this.ids = ids
          let totalNum = 0
          let totalPrice = 0
          list.goods.map(item => {
            totalNum += item.num
            totalPrice += item.total
          })
          this.list = list
          this.totalNum = totalNum
          this.totalPrice = totalPrice
          if (!this.$store.state.picker) {
            this.$store.commit('picker', list.sender)
          }
          if (!this.$store.state.recipient) {
            this.$store.commit('recipient', list.receipt)
          }
          this.sender = this.$store.state.picker // 取件人
          this.recipient = this.$store.state.recipient // 收件人
          this.getPayMoney()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 删除包裹
    deleteParceTap: function (id, index) {
      this.axios.get(`${this.api.delete_bkg}?phone${this.$store.state.isLogin}&id=${id}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          console.log(id)
          this.parcesParams.bids = this.parcesParams.bids.split(',')
          this.parcesParams.bids.splice(index, 1)
          this.parcesParams.bids = this.parcesParams.bids.join(',')
          localStorage.setItem('parcesParams', JSON.stringify(this.parcesParams))
          this.getSplitDrag()
          this.util.toast('删除成功')
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 添加包裹
    addParceTap: function () {
      this.axios.get(`${this.api.add_bkg}?phone=${this.$store.state.isLogin}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.parcesParams.bids = this.parcesParams.bids + ',' + res.data.data.id
          console.log(this.parcesParams.bids)
          localStorage.setItem('parcesParams', JSON.stringify(this.parcesParams))
          this.getSplitDrag()
          this.util.toast('添加成功')
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 编辑包裹
    parceEditTap: function (id) {
      let ids = this.parcesParams.bids // 所有包裹id
      this.$router.push({path: `/ParcelEdit/${id}/${ids}`})
    },
    // 显示自行上传身份证介绍
    showIDIntroTap: function () {
      this.showIDIntro = !this.showIDIntro
    },
    // 服务选择
    serviceTap: function (index, ind) {
      if (parseInt(this.list.parces[index].service[ind]) === 0) {
        this.$set(this.list.parces[index].service, ind, 1)
      } else {
        this.$set(this.list.parces[index].service, ind, 0)
      }
    },
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
      let payMoney = parseFloat(this.totalPrice) + parseFloat(this.list.total_fee)
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
      let senderid = this.sender.id
      let addressid = this.recipient.id
      if (!senderid) {
        this.util.toast('还没有填写发件信息')
        return
      }
      console.log(addressid)
      if (!addressid) {
        this.util.toast('还没有填写收件信息')
        return
      }
      if (!this.agree) {
        this.util.toast('请先同意服务条款！')
        return
      }
      this.util.loading()
      let formdata = {
        areacode: 1,
        senderid: senderid,
        addressid: addressid, // 收件人id
        coupon: this.couponCode,
        phone: this.$store.state.isLogin,
        remark: this.remark,
        paystyle: this.payType, // 0 微信支付 1支付支付
        credit1: this.isBalance ? parseFloat(this.list.credit1) : null, // 余额
        credit2: this.isInteg ? this.list.credit2 : 0, // 积分
        total: this.payAllMoney,
        goods_price: this.totalPrice,
        handle_price: this.payMoney,
        pay_fee: this.payType === 0 ? this.wxPayCharge : this.aliPayCharge,
        order_source: 1,
        num: this.list.parces.length, // 包裹数量
        transferfee: this.list.total_fee, // 转运费用
        weight: this.list.weight, // 预估重量
        goods: this.list.goods,
        parcels: this.list.parces
      }
      this.axios.post(this.api.h5_commit_mall, {
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
@import '../../../static/style/storePicking';
@import '../../../static/style/addRecipient';
</style>
