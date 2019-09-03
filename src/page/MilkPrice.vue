<template>
  <div class="milk pdt">
    <head-title :title="title"></head-title>
    <router-link :to="'/WareDetails/'+banner.id" tag="img" :src="banner.images" class="milk-banner"></router-link>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <table class="milk-table">
          <tr>
            <th width="40%">瓜皮奶粉价格表</th>
            <th colspan="2">澳洲直邮</th>
            <th>国内现货</th>
          </tr>
          <tr>
            <td>(每罐奶价)</td>
            <td>三件含运费</td>
            <td>六件含运费</td>
            <td>一件含运费</td>
          </tr>
          <tr v-for="item in wareList" :key="item.id">
            <td>
              <router-link :to="'/WareDetails/'+item.id" tag="div" :src="banner.images" class="milk-ware flex-box">
                <img :src="item.images">
                <div class="milk-ware-tit flex">
                  <p>{{item.name}}</p>
                  <p>{{item.ename}}</p>
                </div>
              </router-link>
            </td>
            <td>
              <div v-if="item.total>0" class="milk-car">
                <p>${{item.there_oprice}}</p>
                <img @click="showAustraToCarTap(item)" src="../assets/icon49.png">
              </div>
              <p v-else>无货</p>
            </td>
            <td>
              <div v-if="item.total>0" class="milk-car">
                <p>${{item.six_oprice}}</p>
                <img @click="showAustraToCarTap(item)" src="../assets/icon49.png">
              </div>
              <p v-else>无货</p>
            </td>
            <td>
              <div v-if="item.total>0" class="milk-car">
                <p>${{item.one_price}}</p>
                <img @click="showChinaToCarTap(item)" src="../assets/icon50.png">
              </div>
              <p v-else>无货</p>
            </td>
          </tr>
        </table>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text">{{bottomPullText}}</span>
        </div>
      </mt-loadmore>
    </div>
    <!--悬浮购物车按钮-->
    <router-link v-if="showAustraToCar || showChinaToCar" class="fixd-car" to="/car" >
      <img src="../assets/icon15.png">
    </router-link>
    <!--显示弹出阴影层-->
    <div v-if="showAustraToCar || showChinaToCar" class="shade"></div>
    <china-to-car :itemWare="itemWare" :is-show="showChinaToCar" @hideMyself="hideChineToCarTap"></china-to-car>
    <austra-to-car :itemWare="itemWare" :is-show="showAustraToCar" @hideMyself="hideAustraToCarTap"></austra-to-car>
  </div>
</template>

<script>
import ChinaToCar from '../components/ChinaToCar'
import AustraToCar from '../components/AustraToCar'
export default {
  name: 'MilkPrice',
  components: {
    ChinaToCar,
    AustraToCar
  },
  data () {
    return {
      title: '每日奶价',
      showAustraToCar: false,
      showChinaToCar: false,
      itemWare: [],
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      wareList: [],
      banner: [],
      pn: 0
    }
  },
  computed: {
  },
  created: function () {
    this.getWareList()
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
      this.getWareList()
    },
    // 获取商品列表
    getWareList: function () {
      this.axios.get(`${this.api.milk_goods}?pn=${this.pn}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.goods
          this.banner = res.data.data.banner
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
<style scoped lang="scss">
.ware-cont{overflow: scroll;}
.milk{}
.milk-banner{display:block;width:100%;height:rem(200);}
.milk-table{width:100%;text-align:center;color:#454547;
  tr th{padding:rem(5);vertical-align: middle;font-weight:normal;border-left:1px solid #F3F5F6;border-bottom:1px solid #F3F5F6;}
  tr td{padding:rem(5);vertical-align: middle;border-left:1px solid #F3F5F6;border-bottom:1px solid #F3F5F6;}
}
.milk-ware{text-align:left;
  img{margin-right:rem(5);display:block;width:rem(40);height:rem(40);}
}
.milk-ware-tit{
  p{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
}
.milk-car{
  img{margin:rem(5) auto 0 auto;display:block;width:rem(50);}
}
</style>
