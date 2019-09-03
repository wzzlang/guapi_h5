<template>
  <div class="order pdt">
    <head-title :title="title"></head-title>
    <div class="order-nav flex-box white">
      <p @click="sortNavTap(0)" :class="['flex', 'order-nav-a', {'active':type==0}]">商城下单</p>
      <p @click="sortNavTap(1)" :class="['flex', 'order-nav-a', {'active':type==1}]">门店自取</p>
    </div>
    <div class="lead-ser flex-box middle">
      <input @focus="showSerBtnTap" @blur="hideSerBtnTap" class="lead-ser-inp flex" type="text" v-model="keyword" placeholder="请输入搜索内容">
      <div v-if="showSerBtn" @click="searchTap" class="lead-ser-btn">搜索</div>
      <div v-else @click="resetTap" class="lead-ser-btn">重置</div>
    </div>
    <div class="order-menu white">
      <p class="title">所有订单</p>
      <!--商城订单显示-->
      <div v-if="type==0" class="order-menu-a flex-box middle">
        <p @click="statusTap(0)" :class="['flex', {'active': status==0}]"><span>订单提交</span></p>
        <p @click="statusTap(2)" :class="['flex', {'active': status==2}]"><span>正在采购</span></p>
        <p @click="statusTap(3)" :class="['flex', {'active': status==3}]"><span>采购完成</span></p>
        <p @click="statusTap(-1)" :class="['flex', {'active': status==-1}]"><span>订单取消</span></p>
      </div>
      <!--门店自取显示-->
      <div v-if="type==1" class="order-menu-a flex-box middle">
        <p @click="statusTap(0)" :class="['flex', {'active': status==0}]"><span>订单提交</span></p>
        <p @click="statusTap(2)" :class="['flex', {'active': status==2}]"><span>正在配货</span></p>
        <p @click="statusTap(3)" :class="['flex', {'active': status==3}]"><span>等待自取</span></p>
        <p @click="statusTap(4)" :class="['flex', {'active': status==4}]"><span>自取完成</span></p>
        <p @click="statusTap(-1)" :class="['flex', {'active': status==-1}]"><span>订单取消</span></p>
      </div>
    </div>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="order-ul">
          <li v-for="item in orderList" :key="item.id" class="order-li white">
            <router-link :to="'/OrderStoreDetails/'+item.id+'/'+ type" class="order-li-title flex-box middle" tag="div">
              <p class="title flex">{{item.ordersn}}</p>
              <!--商城订单显示订单状态-->
              <div v-if="type==0">
                <p v-if="item.status==0" class="state">订单提交</p>
                <p v-if="item.status==2" class="state">正在采购</p>
                <p v-if="item.status==3" class="state">采购完成</p>
                <p v-if="item.status==-1" class="state">订单取消</p>
              </div>
              <!--门店自取显示订单状态-->
              <div v-if="type==1">
                <p v-if="item.status==0" class="state">订单提交</p>
                <p v-if="item.status==2" class="state">正在配货</p>
                <p v-if="item.status==3" class="state">等待自取</p>
                <p v-if="item.status==4" class="state">自取完成</p>
                <p v-if="item.status==-1" class="state">订单取消</p>
              </div>
            </router-link>
            <router-link :to="'/OrderStoreDetails/'+item.id+'/'+ type" class="order-li-ware clear" tag="div">
              <div v-for="sec in item.goods" :key="sec.id" class="order-li-ware-a flex-box middle">
                <div class="order-li-ware-img">
                  <img :src="sec.images">
                </div>
                <div class="order-li-ware-num flex">X{{sec.num}}</div>
              </div>
            </router-link>
            <div class="order-li-state flex-box">
              <p class="time flex">{{item.createtime | time}}</p>
              <p class="price">
                <span v-if="item.order_source==0">门店自取：</span>
                <span v-if="item.order_source==1">商城直发：</span>
                <span v-if="item.order_source==2">放入云仓：</span>
                <span class="cor">$544</span></p>
            </div>
            <!--订单提交状态显示-->
            <div v-if="item.status==0" class="order-li-com flex-box middle">
              <p class="time">倒计时:{{item.djs}}</p>
              <div class="order-li-btn flex flex-box right">
                <p @click="showConfirm(item.id)">取消订单</p>
                <p @click="payNowTap(item)" class="bkg">立即付款</p>
              </div>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text">{{bottomPullText}}</span>
        </div>
      </mt-loadmore>
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
  name: 'OrderStore',
  data () {
    return {
      title: '商城订单',
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      showSerBtn: false,
      type: null, // 0 商城订单 1 门店自取
      pn: 0,
      status: 0, // 默认全部 0=订单提交，1=付款成功，2=正在配货(正在采购)，3=等待自取(采购完成)，4=自取完成，-1=订单取消
      keyword: '',
      orderList: [],
      orderId: null, // 订单id
      popupVisible: false
    }
  },
  computed: {
  },
  created: function () {
    this.type = this.$route.params.type
    this.getList()
  },
  mounted: function () {
    this.wareContHeight = document.documentElement.clientHeight - this.$refs.wareCont.getBoundingClientRect().top
    setInterval(() => {
      for (let i = 0; i < this.orderList.length; i++) {
        let aaa = parseInt(this.orderList[i].endtime) * 1000
        let bbb = new Date().getTime()
        let time = aaa - bbb
        if (time > 0) {
          let hh = Math.floor(time / 1000 / 60 / 60)
          let mm = Math.floor(time / 1000 / 60 % 60)
          let ss = Math.floor(time / 1000 % 60)
          this.$set(this.orderList[i], 'djs', hh + ':' + mm + ':' + ss)
        }
      }
    }, 1000)
  },
  methods: {
    // 输入框获得焦点
    showSerBtnTap: function () {
      this.showSerBtn = true
    },
    // 输入框失去焦点
    hideSerBtnTap: function () {
      this.showSerBtn = false
    },
    // 重置
    resetTap: function () {
      this.keyword = ''
      this.pn = 0
      this.getList()
    },
    searchTap: function () {
      this.pn = 0
      this.getList()
    },
    // 分类点击
    sortNavTap: function (type) {
      this.type = type
      this.keyword = ''
      this.pn = 0
      this.status = 0
      this.getList()
    },
    // 订单状态点击
    statusTap: function (status) {
      this.status = status
      this.keyword = ''
      this.pn = 0
      this.getList()
    },
    // 上拉加载
    loadBottom: function (e) {
      this.$refs.loadmore.onBottomLoaded()
      this.pn++
      this.getList()
    },
    getList: function () {
      this.axios.get(`${this.api.get_order_list}?phone=${this.$store.state.isLogin}&otype=${this.type}&pn=${this.pn}&status=${this.status}&keyword=${this.keyword}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.orders
          if (this.pn === 0) {
            this.orderList = list
          } else {
            this.orderList = this.orderList.concat(list)
          }
          if (list.length < 10) {
            this.bottomPullText = '没有更多了'
          } else {
            this.bottomPullText = '↑上拉加载'
          }
        }
      })
    },
    // 提示
    showConfirm: function (id) {
      this.orderId = id
      console.log(id)
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
          this.pn = 0
          this.getList()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 立即付款
    payNowTap: function (item) {
      console.log(item)
      let list = {}
      list.pay_fee = item.total // 应付含手续费
      list.total = item.totals // 约多少人民币
      list.paystyle = item.paystyle // 支付方式
      list.ordersn = item.ordersn
      console.log(list)
      this.$router.push({path: `/OrderSuccess/${encodeURIComponent(JSON.stringify(list))}`})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
.ware-cont{overflow: scroll;}
</style>
