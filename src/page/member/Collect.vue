<template>
  <div class="collect pdt">
    <head-title :title="title"></head-title>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ware-item :wareList="wareList" @show-austra="showAustraToCarTap" @show-china="showChinaToCarTap"></ware-item>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text">{{bottomPullText}}</span>
        </div>
      </mt-loadmore>
    </div>
    <!--悬浮购物车按钮-->
    <router-link v-if="showAustraToCar || showChinaToCar" class="fixd-car" to="/car" >
      <img src="../../assets/icon15.png">
    </router-link>
    <!--显示弹出阴影层-->
    <div v-if="showAustraToCar || showChinaToCar" class="shade"></div>
    <china-to-car :itemWare="itemWare" :is-show="showChinaToCar" @hideMyself="hideChineToCarTap"></china-to-car>
    <austra-to-car :itemWare="itemWare" :is-show="showAustraToCar" @hideMyself="hideAustraToCarTap"></austra-to-car>
  </div>
</template>

<script>
import WareItem from '../../components/WareItem'
import ChinaToCar from '../../components/ChinaToCar'
import AustraToCar from '../../components/AustraToCar'
export default {
  name: 'Collect',
  components: {
    WareItem,
    ChinaToCar,
    AustraToCar
  },
  data () {
    return {
      title: '商品收藏',
      showAustraToCar: false,
      showChinaToCar: false,
      itemWare: [],
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      wareList: [],
      pn: 0
    }
  },
  computed: {
  },
  created: function () {
    this.getCollectList()
  },
  mounted: function () {
    this.wareContHeight = document.documentElement.clientHeight - this.$refs.wareCont.getBoundingClientRect().top
  },
  methods: {
    showAustraToCarTap: function (item) {
      this.itemWare = item
      this.showAustraToCar = true
    },
    hideAustraToCarTap: function () {
      this.showAustraToCar = false
    },
    showChinaToCarTap: function (item) {
      this.itemWare = item
      this.showChinaToCar = true
    },
    hideChineToCarTap: function () {
      this.showChinaToCar = false
    },
    // 上拉加载
    loadBottom: function (e) {
      this.$refs.loadmore.onBottomLoaded()
      this.pn++
      this.getCollectList()
    },
    getCollectList: function () {
      this.axios.post(this.api.get_favorite_good, {
        phone: this.$store.state.isLogin,
        pn: this.pn
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.goods
          if (this.pn === 0) {
            this.wareList = list
          } else {
            this.wareList = this.wareList.concat(list)
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
.ware-cont{overflow: scroll;}
</style>
