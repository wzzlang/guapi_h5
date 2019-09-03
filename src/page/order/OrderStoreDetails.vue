<template>
  <div class="detail pdt pbb">
    <head-title :title="title"></head-title>
    <div v-if="detail.length != 0" class="detail-status white">
      <div class="title flex-box middle">
        <p class="flex">订单状态</p>
        <!--订单提交状态显示-->
        <p v-if="detail.status==0" class="detail-pay-time">支付倒计时 {{detail.djs}}</p>
      </div>
      <!--取消订单状态显示-->
      <ul v-if="detail.status==-1" class="detail-status-ul clear">
        <li class="detail-status-li active">
          <i class="icon1"></i>
          <p class="status">订单提交</p>
          <div class="time">
            <p>{{detail.createtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.createtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li class="detail-status-li active">
          <i class="icon5"></i>
          <p class="status">订单取消</p>
          <div class="time">
            <p>{{detail.canceletime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.canceletime | time('hh:mm:ss')}}</p>
          </div>
        </li>
      </ul>
      <!--未取消订单状态显示商城下单订单状态-->
      <ul v-if="detail.status!=-1 && type==0" class="detail-status-ul clear">
        <li :class="['detail-status-li', {'active':detail.status>=0}]">
          <i class="icon1"></i>
          <p class="status">订单提交</p>
          <div class="time">
            <p>{{detail.createtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.createtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=1}]">
          <i class="icon2"></i>
          <p class="status">付款成功</p>
          <div v-if="detail.status>=1" class="time">
            <p>{{detail.paytime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.paytime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=2}]">
          <i class="icon3"></i>
          <p class="status">正在采购</p>
          <div v-if="detail.status>=2" class="time">
            <p>{{detail.sendtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.sendtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=3}]">
          <i class="icon4"></i>
          <p class="status">采购完成</p>
          <div v-if="detail.status>=3" class="time">
            <p>{{detail.finishtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.finishtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
      </ul>
      <!--未取消订单状态显示门店自取订单状态-->
      <ul v-if="detail.status!=-1 && type==1" class="detail-status-ul wid clear">
        <li :class="['detail-status-li', {'active':detail.status>=0}]">
          <i class="icon1"></i>
          <p class="status">订单提交</p>
          <div class="time">
            <p>{{detail.createtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.createtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=1}]">
          <i class="icon2"></i>
          <p class="status">付款成功</p>
          <div v-if="detail.status>=1" class="time">
            <p>{{detail.paytime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.paytime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=2}]">
          <i class="icon3"></i>
          <p class="status">正在配货</p>
          <div v-if="detail.status>=2" class="time">
            <p>{{detail.sendtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.sendtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=3}]">
          <i class="icon6"></i>
          <p class="status">等待自取</p>
          <div v-if="detail.status>=3" class="time">
            <p>{{detail.finishtime | time('yyyy-MM-dd')}}</p>
            <p>{{detail.finishtime | time('hh:mm:ss')}}</p>
          </div>
        </li>
        <li :class="['detail-status-li',{'active':detail.status>=4}]">
          <i class="icon4"></i>
          <p class="status">自取完成</p>
          <div v-if="detail.status>=4" class="time">
            <p>{{detail.finishtime2 | time('yyyy-MM-dd')}}</p>
            <p>{{detail.finishtime2 | time('hh:mm:ss')}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="detail-item white">
      <p class="detail-title">订单信息</p>
      <div class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">商城订单号</p>
          <p class="intro flex">{{detail.ordersn}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单渠道</p>
          <p v-if="detail.order_source==0" class="intro flex">门店自取</p>
          <p v-if="detail.order_source==1" class="intro flex">商城直发</p>
          <p v-if="detail.order_source==2" class="intro flex">放入云仓</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单状态</p>
          <!--商城下单显示-->
          <div v-if="type==0" class="intro flex">
            <p v-if="detail.status==0">订单提交</p>
            <p v-if="detail.status==1">付款成功</p>
            <p v-if="detail.status==2">正在采购</p>
            <p v-if="detail.status==3">采购完成</p>
            <p v-if="detail.status==-1">订单取消</p>
          </div>
          <!--门店自取显示-->
          <div v-if="type==1" class="intro flex">
            <p v-if="detail.status==0">订单提交</p>
            <p v-if="detail.status==1">付款成功</p>
            <p v-if="detail.status==2">正在配货</p>
            <p v-if="detail.status==3">等待自取</p>
            <p v-if="detail.status==4">自取完成</p>
            <p v-if="detail.status==-1">订单取消</p>
          </div>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单备注</p>
          <p class="intro flex">{{detail.remark}}</p>
        </div>
      </div>
    </div>
    <div class="detail-item white">
      <p class="detail-title">订单明细</p>
      <div class="detail-cont">
        <div v-for="item in detail.goods" :key="item.id">
          <!--refundstate:1,//为1 说明已经处于退款，处于退款时显示-->
          <div v-if="item.refundstate==1" class="pick-ware">
            <div class="pick-ware-item">
              <div class=" flex-box">
                <div class="pick-ware-img">
                  <img :src="item.images">
                </div>
                <div class="pick-ware-desc flex">
                  <div v-if="item.refude.status==0" class="flex-box">
                    <p class="title flex">{{item.goodname}}</p>
                    <p class="refund-btn">申请退款</p>
                  </div>
                  <p v-else class="title">{{item.goodname}}</p>
                  <p>{{item.warehouse}} ${{item.price}} X {{item.num}}</p>
                  <div class="pick-ware-spec flex-box">
                    <p v-if="item.refude.status==1" class="flex cor-red">退款中</p>
                    <p v-if="item.refude.status==2" class="flex cor-red">退款成功</p>
                    <p v-if="item.refude.status==-1" class="flex cor-red">取消退款</p>
                    <p class="price">${{item.total}}</p>
                  </div>
                </div>
                <p>{{item.refude.reason}}</p>
              </div>
            </div>
          </div>
          <div v-else class="pick-ware">
            <div class="pick-ware-item flex-box">
              <div class="pick-ware-img">
                <img :src="item.images">
              </div>
              <div class="pick-ware-desc flex">
                <p class="title">{{item.goodname}}</p>
                <p>{{item.warehouse}} ${{item.price}} X {{item.num}}</p>
                <div class="pick-ware-spec flex-box">
                  <p v-if="item.status==0" class="flex">待付款</p>
                  <p v-if="item.status==1" class="flex">付款成功</p>
                  <p v-if="item.status==2" class="flex">正在采购</p>
                  <p v-if="item.status==3" class="flex">采购完成</p>
                  <p v-if="item.status==-1" class="flex">订单取消</p>
                  <p class="price">${{item.total}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pick-ware-price flex-box">
          <p class="flex">已选择 {{goodNum}} 件商品</p>
          <p class="price">总价（不含运费）<span> ${{detail.goods_price}}</span></p>
        </div>
      </div>
    </div>
    <!--门店自取时显示附加信息-->
    <div v-if="type==1" class="detail-item white">
      <p class="detail-title">附加信息</p>
      <div v-if="detail.store" class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">门店名称</p>
          <p class="intro flex">${{detail.store.name}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">取货人姓名</p>
          <p class="intro flex">${{detail.store.name}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">取货人手机</p>
          <p class="intro flex">${{detail.store.name}}</p>
        </div>
      </div>
    </div>
    <!--关联的云仓订单 只有商城直发才会出现-->
    <div v-if="detail.order_source==1" class="detail-item white">
      <div class="pick-title flex-box middle">
        <p class="title flex">关联订单</p>
        <div class="pick-btn flex-box middle">
          <router-link :to="'/OrderCloudDetails/'+detail.cloud.id+'/'+ type" tag="p">查看订单</router-link>
        </div>
      </div>
      <div class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">云仓订单号</p>
          <p class="intro flex">${{detail.cloud.cloudsn}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">订单状态</p>
          <p v-if="detail.cloud.status==0" class="intro flex">订单提交</p>
          <p v-if="detail.cloud.status==1" class="intro flex">付款成功</p>
          <p v-if="detail.cloud.status==2" class="intro flex">等待出库</p>
          <p v-if="detail.cloud.status==3" class="intro flex">出库完成</p>
          <p v-if="detail.cloud.status==-1" class="intro flex">发货取消</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">转运费用</p>
          <p class="intro flex">${{detail.cloud.transferfee}}</p>
        </div>
      </div>
    </div>
    <div class="detail-item white">
      <p class="detail-title">订单小结</p>
      <div class="detail-cont">
        <div class="detail-intro flex-box">
          <p class="title">商品费用</p>
          <p class="intro flex">${{detail.goods_price}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">总计</p>
          <p class="intro flex">${{detail.goods_price}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">优惠代码</p>
          <p class="intro flex">{{detail.coupon}}</p>
        </div>
        <div class="border"></div>
        <div class="detail-intro flex-box">
          <p class="title">余额抵扣</p>
          <p class="intro flex">-${{detail.credit1}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">积分抵扣</p>
          <p class="intro flex">{{detail.credit2 ? '-$'+detail.credit2 : '无'}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">应付金额</p>
          <p class="intro flex">${{detail.handle_price}}</p>
        </div>
        <div class="border"></div>
        <div class="detail-intro flex-box">
          <p class="title">跨境支付渠道</p>
          <p v-if="detail.paystyle==0" class="intro flex">微信支付</p>
          <p v-if="detail.paystyle==1" class="intro flex">支付宝支付</p>
          <p v-if="detail.paystyle==2" class="intro flex">POIL支付</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">跨境支付手续费</p>
          <p class="intro flex">${{detail.pay_fee}}</p>
        </div>
        <div class="detail-intro flex-box">
          <p class="title">应付含手续费</p>
          <p class="intro flex">${{detail.total}}</p>
        </div>
      </div>
    </div>
    <!--订单提交状态显示-->
    <div v-if="detail.status==0" class="submit-btn flex-box">
      <div @click="showConfirm" class="submit-btn-a bkg1 flex">取消订单</div>
      <div @click="payNowTap" class="submit-btn-a flex">立即付款</div>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="confirm">
        <p class="confirm-title">温馨提示</p>
        <p>是否确认取消订单？</p>
        <div class="confirm-btn flex-box middle center">
          <p @click="cancalTap">取消</p>
          <p @click="deleteTap" class="bkg">确定</p>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'OrderStoreDetails',
  data () {
    return {
      title: '商城订单详情',
      type: null, // 0 商城订单 1 门店自取
      orderId: null,
      detail: [],
      goodNum: 0, // 商品数量
      popupVisible: false
    }
  },
  computed: {
  },
  created: function () {
    this.orderId = this.$route.params.id
    this.type = this.$route.params.type
    console.log(this.type)
    this.getDetail()
  },
  mounted: function () {
    setInterval(() => {
      let aaa = parseInt(this.detail.endtime) * 1000
      let bbb = new Date().getTime()
      let time = aaa - bbb
      if (time > 0) {
        let hh = Math.floor(time / 1000 / 60 / 60)
        let mm = Math.floor(time / 1000 / 60 % 60)
        let ss = Math.floor(time / 1000 % 60)
        this.$set(this.detail, 'djs', hh + ':' + mm + ':' + ss)
      }
    }, 1000)
  },
  methods: {
    // 获取订单详情
    getDetail: function () {
      this.axios.get(`${this.api.order_detail}?phone=${this.$store.state.isLogin}&id=${this.orderId}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.detail = res.data.data
          this.getGoodNum()
        }
      })
    },
    // 计算商品数量和总价
    getGoodNum: function () {
      let goodNum = 0
      this.detail.goods.map(item => {
        goodNum += item.num
      })
      this.goodNum = goodNum
    },
    // 提示
    showConfirm: function () {
      this.popupVisible = true
    },
    // 取消
    cancalTap: function () {
      this.popupVisible = false
    },
    // 取消订单
    deleteTap: function () {
      this.popupVisible = false
      this.axios.post(this.api.cancele_order, {
        phone: this.$store.state.isLogin,
        id: this.orderId
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('取消成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 立即付款
    payNowTap: function () {
      let list = {}
      list.pay_fee = this.detail.total // 应付含手续费
      list.total = this.detail.totals // 约多少人民币
      list.paystyle = this.detail.paystyle // 支付方式
      list.ordersn = this.detail.ordersn
      console.log(list)
      this.$router.push({path: `/OrderSuccess/${encodeURIComponent(JSON.stringify(list))}`})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/storePicking';
@import '../../../static/style/addRecipient';
.refund-btn{padding:0 rem(5);border:1px solid #268ECA;color:#268ECA;}
</style>
