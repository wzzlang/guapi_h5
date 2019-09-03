<template>
  <div class="balance pdt">
    <head-title :title="title"></head-title>
    <div class="lead-ser flex-box middle">
      <input @focus="showSerBtnTap" @blur="hideSerBtnTap" class="lead-ser-inp flex" type="text" v-model="keyword" placeholder="请填写搜索内容">
      <div v-if="showSerBtn" @click="searchTap" class="lead-ser-btn">搜索</div>
      <div v-else @click="resetTap" class="lead-ser-btn">重置</div>
    </div>
    <div class="balance-nav white">
      <p @click="sortNavTap()" class="title">所有行为</p>
      <div class="cloudlog-nav flex-box middle">
        <p class="active flex">
          <span @click="sortNavTap(0)" :class="{'active':otype==0}">商城购物</span>
        </p>
        <p class="flex">
          <span @click="sortNavTap(1)" :class="{'active':otype==1}">云仓运费</span>
        </p>
        <p class="flex">
          <span @click="sortNavTap(2)" :class="{'active':otype==2}">称重补差</span>
        </p>
        <p class="flex">
          <span @click="sortNavTap(3)" :class="{'active':otype==3}">退款批准</span>
        </p>
        <p class="flex">
          <span @click="sortNavTap(4)" :class="{'active':otype==4}">后台调整</span>
        </p>
      </div>
    </div>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="integ-ul">
          <li v-for="(item, index) in userlist" :key="item.id" class="integ-li white">
            <div class="integ-li-top flex-box middle between">
              <p class="num">{{item.logsn}}</p>
              <p v-if="item.otype==0" class="state">商城购物</p>
              <p v-if="item.otype==1" class="state">云仓运费</p>
              <p v-if="item.otype==2" class="state">称重补差</p>
              <p v-if="item.otype==3" class="state">退款批准</p>
              <p v-if="item.otype==4" class="state">后台调整</p>
            </div>
            <div class="integ-li-desc">
              <p>来源：{{item.comefrom}}</p>
              <div class="flex-box">
                <p class="flex">金额：<span>${{item.use_balance}}</span></p>
                <span>余额：<span>${{item.balance}}</span></span>
              </div>
              <p>备注：{{item.remark}}</p>
            </div>
            <div class="integ-li-bot flex-box middle between">
              <p v-if="index<9">#0{{index+1}}</p>
              <p v-else>#{{index+1}}</p>
              <p>{{item.createtime | time}}</p>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text">{{bottomPullText}}</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceLog',
  data () {
    return {
      title: '余额日志',
      userlist: [],
      userId: null,
      pn: 0,
      otype: 0,
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      showSerBtn: false,
      keyword: ''
    }
  },
  created: function () {
    this.getList()
  },
  mounted: function () {
    this.wareContHeight = document.documentElement.clientHeight - this.$refs.wareCont.getBoundingClientRect().top
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
    sortNavTap: function (otype) {
      this.otype = otype
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
    // 获取余额日志
    getList: function () {
      this.axios.post(this.api.get_blance_log, {
        phone: this.$store.state.isLogin,
        pn: this.pn,
        keyword: this.keyword,
        otype: this.otype
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.logs
          if (this.pn === 0) {
            this.userlist = list
          } else {
            this.userlist = this.userlist.concat(list)
          }
          if (list.length < 10) {
            this.bottomPullText = '没有更多了'
          } else {
            this.bottomPullText = '↑上拉加载'
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../../../static/style/addRecipient';
.recip-dt{width:rem(100);}
.ware-cont{overflow: scroll;}
</style>
