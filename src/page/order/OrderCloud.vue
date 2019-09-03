<template>
  <div class="order pdt">
    <head-title :title="title"></head-title>
    <div class="order-nav flex-box white">
      <p @click="sortNavTap(1)" :class="['flex', 'order-nav-a', {'active':areacode==1}]">澳洲直邮</p>
      <p @click="sortNavTap(0)" :class="['flex', 'order-nav-a', {'active':areacode==0}]">国内现货</p>
    </div>
    <div class="lead-ser flex-box middle">
      <input @focus="showSerBtnTap" @blur="hideSerBtnTap" class="lead-ser-inp flex" type="text" v-model="keyword" placeholder="请输入搜索内容">
      <div v-if="showSerBtn" @click="searchTap" class="lead-ser-btn">搜索</div>
      <div v-else @click="resetTap" class="lead-ser-btn">重置</div>
    </div>
    <div class="order-menu white">
      <p class="title">全部包裹</p>
      <div class="order-menu-a flex-box middle">
        <p @click="statusTap(0)" :class="['flex', {'active': status==0}]"><span>等待付款</span></p>
        <p @click="statusTap(1)" :class="['flex', {'active': status==1}]"><span>等待发货</span></p>
        <p @click="statusTap(2)" :class="['flex', {'active': status==2}]"><span>正在发货</span></p>
        <p @click="statusTap(3)" :class="['flex', {'active': status==3}]"><span>已经发货</span></p>
        <p @click="statusTap(-1)" :class="['flex', {'active': status==-1}]"><span>发货取消</span></p>
      </div>
    </div>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="order-ul">
          <li v-for="item in orderList" :key="item.id" class="order-li white">
            <router-link :to="'/OrderCloudDetails/'+item.cloudid+'/'+areacode" class="order-li-title flex-box middle" tag="div">
              <p class="title flex">{{item.parcelsn}}</p>
              <p class="desc">{{item.address.realname}} | {{item.address.mobile}} | <span v-if="item.is_card==1">已上传身份证</span><span v-else>未上传身份证</span></p>
            </router-link>
            <router-link :to="'/OrderCloudDetails/'+item.cloudid+'/'+areacode" class="order-li-ware clear" tag="div">
              <div v-for="sec in item.goodsinfo" :key="sec.id" class="order-li-ware-a flex-box middle">
                <div class="order-li-ware-img">
                  <img :src="sec.images">
                </div>
                <div class="order-li-ware-num flex">X{{sec.num}}</div>
              </div>
            </router-link>
            <div class="order-li-state flex-box">
              <p class="title flex">{{item.status | cstatus}}</p>
              <p class="time">{{item.remark}} <span v-if="item.remark">|</span> {{item.createtime | time}}</p>
            </div>
            <!--待付款状态显示-->
            <div v-if="item.status==0" class="order-li-com flex-box middle">
              <p class="time">倒计时:{{item.djs}}</p>
              <div class="order-li-btn flex flex-box right">
                <p @click="showConfirm(item.cloudid)">取消订单</p>
                <p @click="payNowTap(item)" class="bkg">立即付款</p>
              </div>
            </div>
            <!--已经发货状态显示-->
            <div v-if="item.status==3" class="order-li-com flex-box middle">
              <p>韵达快递：{{item.expresscom}}</p>
              <div class="order-li-btn flex flex-box right">
                <p>复制信息</p>
                <p class="bkg">查看物流</p>
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
  name: 'OrderCloud',
  data () {
    return {
      title: '云仓订单',
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      showSerBtn: false,
      areacode: null,
      pn: 0,
      status: null, // 默认获取全部, 0 等待付款 ,1 等待发货, 2 正在发货 ,3 已经发货 ,-1 发货取消
      keyword: '',
      orderList: [],
      cloudid: null, // 订单id
      popupVisible: false
    }
  },
  computed: {
  },
  created: function () {
    this.areacode = this.$route.params.areacode
    this.getList()
    this.$store.commit('picker', null) // 更新取件人即发件人
    this.$store.recipientCloudList = null // 云仓订单详情收件人列表
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
    sortNavTap: function (areacode) {
      this.areacode = areacode
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
      this.axios.post(this.api.get_cloud_orders_lists, {
        phone: this.$store.state.isLogin,
        areacode: this.areacode,
        pn: this.pn,
        status: this.status,
        keyword: this.keyword
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.parcels
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
      this.cloudid = id
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
      this.axios.get(`${this.api.cancele_cloud_order}?phone=${this.$store.state.isLogin}&cloudid=${this.cloudid}`).then(res => {
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
      let list = {}
      list.pay_fee = item.fee // 应付含手续费
      list.total = item.fees // 约多少人民币
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
