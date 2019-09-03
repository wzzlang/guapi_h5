<template>
  <div class="integ pdt">
    <head-title :title="title"></head-title>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="integ-ul">
          <li v-for="(item, index) in integList" :key="item.name" class="integ-li white">
            <div class="integ-li-top flex-box middle between">
              <p class="num">{{item.ordersn}}</p>
              <p class="state">佣金发放</p>
            </div>
            <div class="integ-li-desc">
              <p>会员名称：{{item.name}}</p>
              <p>付款时间：{{item.paytime}}</p>
              <p>订单应付金额：${{item.total}}</p>
              <p class="flex-box">
                <span class="flex">所得佣金：${{item.commisson}}</span>
                <span v-if="item.is_send == 1">佣金奖励发放：已发放</span>
                <span v-else>佣金奖励发放：未发放</span>
              </p>
            </div>
            <div class="integ-li-bot flex-box middle between">
              <p v-if="index<9">#0{{index+1}}</p>
              <p v-else>#{{index+1}}</p>
              <p>{{item.finishtime}}</p>
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
  name: 'MyIntegralInvite',
  data () {
    return {
      title: '佣金流水',
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      integList: [],
      pn: 0
    }
  },
  computed: {
  },
  created: function () {
    this.getList()
  },
  mounted: function () {
    this.wareContHeight = document.documentElement.clientHeight - this.$refs.wareCont.getBoundingClientRect().top
  },
  methods: {
    // 上拉加载
    loadBottom: function (e) {
      this.$refs.loadmore.onBottomLoaded()
      this.pn++
      this.getCollectList()
    },
    getList: function () {
      this.axios.get(`${this.api.get_commisson}?phone=${this.$store.state.isLogin}&pn=${this.pn}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.orders
          if (this.pn === 0) {
            this.integList = list
          } else {
            this.integList = this.integList.concat(list)
          }
          if (list.length < 10) {
            this.bottomPullText = '没有更多了'
          }
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
