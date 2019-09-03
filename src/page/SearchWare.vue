<template>
  <div class="search">
    <div class="search-top flex-box middle">
      <input class="flex search-inp" type="text" v-model="keyword" name="" placeholder="请输入搜索内容">
      <div @click="goBack" v-if="!keyword" class="search-btn">取消</div>
      <div @click="searchTap" v-else class="search-btn">搜索</div>
    </div>
    <div class="search-main">
      <ware-item :wareList="wareList" @show-austra="showAustraToCarTap" @show-china="showChinaToCarTap"></ware-item>
      <!--悬浮购物车按钮-->
      <router-link v-if="showAustraToCar || showChinaToCar" class="fixd-car" to="/car" >
        <img src="../assets/icon15.png">
      </router-link>
      <!--显示弹出阴影层-->
      <div v-if="showAustraToCar || showChinaToCar" class="shade"></div>
      <china-to-car :itemWare="itemWare" :is-show="showChinaToCar" @hideMyself="hideChineToCarTap"></china-to-car>
      <austra-to-car :itemWare="itemWare" :is-show="showAustraToCar" @hideMyself="hideAustraToCarTap"></austra-to-car>
    </div>
  </div>
</template>

<script>
import WareItem from '../components/WareItem'
import ChinaToCar from '../components/ChinaToCar'
import AustraToCar from '../components/AustraToCar'
export default {
  name: 'SearchWare',
  components: {
    WareItem,
    ChinaToCar,
    AustraToCar
  },
  data () {
    return {
      showAustraToCar: false,
      showChinaToCar: false,
      wareList: [], // 商品列表
      itemWare: [],
      keyword: '',
      result: []
    }
  },
  computed: {
  },
  created: function () {
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
    // 返回上一页
    goBack: function () {
      this.$router.go(-1)
    },
    // 搜索
    searchTap: function () {
      this.axios.post(this.api.get_good_lists, {
        keyword: this.keyword,
        phone: this.$store.state.isLogin
      }).then(res => {
        console.log(res)
        this.keyword = null
        if (res.data.code === '200') {
          this.wareList = res.data.data.goods
          if (res.data.data.goods.length === 0) {
            this.util.toast('没有您搜索的商品')
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
.search{padding-top:rem(60);}
.search-top{position:fixed;top:0;left:50%;top:0;z-index:2;transform:translateX(-50%);width:100%;max-width:15rem;padding:rem(10);width:100%;background-color:$red;}
.search-inp{padding-left:rem(40);height:rem(30);line-height:rem(30);border-radius:rem(15);background:#fff url(../assets/icon1.png) no-repeat rem(15) center;background-size:rem(20);}
.search-btn{padding-left:rem(10);color:#fff;}
</style>
