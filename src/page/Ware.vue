<template>
  <div class="ware">
    <div class="head">
      <div class="head-top flex-box middle">
        <router-link to="/" class="head-logo" tag="span">
          <img src="../assets/logo.png">
        </router-link>
        <router-link to="/SearchWare" class="head-search flex" tag="div">搜索</router-link>
        <div @click="showType" class="ware-type"></div>
      </div>
      <div class="ware-filt flex-box">
        <div :class="['flex', 'ware-filt-b', {'top': sales == 'asc','bot': sales == 'desc'}]" @click="salesTap"><span>销量</span></div>
        <div :class="['flex', 'ware-filt-a', {'active': isnew}]" @click="isnewTap">新品</div>
        <div :class="['flex', 'ware-filt-b', {'top': price == 'asc','bot': price == 'desc'}]" @click="priceTap"><span>价格</span></div>
        <div :class="['flex', 'ware-filt-c', {'active': showFilt}]" @click="showFiltTap"><span>筛选</span></div>
        <div :class="['flex', 'ware-filt-d', {'active':stock==3}]" @click="stockFiltTap(3)"><span>有货</span></div>
      </div>
      <div v-if="showFilt" class="ware-sort white">
        <div class="ware-sort-main">
          <p class="ware-sort-tit">选择分类</p>
          <ul class="ware-sort-ul clear">
            <li v-for="item in categoryList" :key="item.id" @click="pcateTap(item.id)" :class="{'active': pcate==item.id}">{{item.name}}</li>
          </ul>
          <p class="ware-sort-tit">选择库存</p>
          <ul class="ware-sort-ul clear">
            <li @click="stockTap(0)" :class="{'active':stock==0}">药房仓库有货</li>
            <li @click="stockTap(1)" :class="{'active':stock==1}">药房仓库有货</li>
            <li @click="stockTap(2)" :class="{'active':stock==2}">药房仓库有货</li>
          </ul>
          <p class="ware-sort-tit">选择品牌</p>
          <ul class="ware-sort-ul clear">
            <li v-for="item in brandList" :key="item.id" @click="brandTap(item.id)" :class="{'active': brand_id==item.id}">{{item.name}}</li>
          </ul>
        </div>
        <div class="ware-sort-btn flex-box">
          <p @click="cancelFiltTap" class="flex">取消筛选</p>
          <p @click="filtTap" class="flex">确认</p>
        </div>
      </div>
    </div>
    <div class="ware-cont" ref="wareCont" :style="{ height: (wareContHeight-50) + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ware-item :isList="isList" :wareList="wareList" @show-austra="showAustraToCarTap" @show-china="showChinaToCarTap"></ware-item>
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
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import FootNav from '../components/FootNav'
import WareItem from '../components/WareItem'
import ChinaToCar from '../components/ChinaToCar'
import AustraToCar from '../components/AustraToCar'
export default {
  name: 'ware',
  components: {
    FootNav,
    WareItem,
    ChinaToCar,
    AustraToCar
  },
  data () {
    return {
      showAustraToCar: false,
      showChinaToCar: false,
      isList: false,
      itemWare: [],
      wareContHeight: 0,
      showFilt: false, // 显示分类
      bottomPullText: '↑上拉加载',
      pn: 0, // 分页第一页
      sales: null, // 销量排序 desc 降序 asc 升序
      isnew: null, // 新品上架 选中传1
      price: null, // 价格排序 desc 降序 asc 升序
      pcate: null, // 商品分类id
      brand_id: null, // 商品品牌id
      stock: null, // 0 药房采购有货 1:境外仓库有货 2:国内仓库有货 3：有货
      wareList: [], // 商品列表
      brandList: [], // 商品筛选品牌列表
      categoryList: [] // 商品筛选分类列表
    }
  },
  computed: {
  },
  created: function () {
    this.getWareList()
    this.getFiltList()
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
    showType: function () {
      this.isList = !this.isList
    },
    // 上拉加载
    loadBottom: function (e) {
      this.pn++
      this.getWareList()
      this.$refs.loadmore.onBottomLoaded()
    },
    // 销量筛选
    salesTap: function () {
      if (!this.sales) {
        this.sales = 'asc'
      } else if (this.sales === 'asc') {
        this.sales = 'desc'
      } else if (this.sales === 'desc') {
        this.sales = null
      }
      this.pn = 0
      this.isnew = null
      this.price = null
      this.showFilt = false
      this.pcate = null
      this.brand_id = null
      this.stock = null
      this.getWareList()
    },
    // 新品筛选
    isnewTap: function () {
      if (!this.isnew) {
        this.isnew = 1
      } else {
        this.isnew = null
      }
      this.pn = 0
      this.sales = null
      this.price = null
      this.showFilt = false
      this.pcate = null
      this.brand_id = null
      this.stock = null
      this.getWareList()
    },
    // 价格筛选
    priceTap: function () {
      if (!this.price) {
        this.price = 'asc'
      } else if (this.price === 'asc') {
        this.price = 'desc'
      } else if (this.price === 'desc') {
        this.price = null
      }
      this.pn = 0
      this.sales = null
      this.isnew = null
      this.showFilt = false
      this.pcate = null
      this.brand_id = null
      this.stock = null
      this.getWareList()
    },
    // 显示筛选分类
    showFiltTap: function () {
      this.pn = 0
      this.sales = null
      this.isnew = null
      this.price = null
      this.showFilt = !this.showFilt
    },
    // 取消筛选
    cancelFiltTap: function () {
      this.showFilt = false
    },
    // 筛选品牌点击
    brandTap: function (id) {
      this.brand_id = id
    },
    // 筛选分类点击
    pcateTap: function (id) {
      this.pcate = id
    },
    // 筛选库存点击
    stockTap: function (id) {
      this.stock = id
    },
    // 筛选
    filtTap: function () {
      this.showFilt = false
      this.getWareList()
    },
    // 筛选有货
    stockFiltTap: function (stock) {
      this.pn = 0
      this.sales = null
      this.isnew = null
      this.showFilt = false
      this.pcate = null
      this.brand_id = null
      if (this.stock !== stock) {
        this.stock = stock
      } else {
        this.stock = null
      }
      this.getWareList()
    },
    // 获取全部商品列表
    getWareList: function () {
      this.axios.post(this.api.get_good_lists, {
        phone: this.$store.state.isLogin,
        pn: this.pn,
        keyword: null,
        pcate: this.pcate,
        brand_id: this.brand_id,
        stock: this.stock,
        tig: null,
        isrecommand: null,
        ishot: null,
        isnew: this.isnew,
        price: this.price,
        sales: this.sales
      }).then(res => {
        console.log('全部商品=>', res)
        if (res.data.code === '200') {
          let list = res.data.data.goods
          if (this.pn === 0) {
            this.wareList = list
          } else {
            this.wareList = this.wareList.concat(list)
          }
          if (list.length < 10) {
            this.bottomPullText = '没有更多了'
          } else {
            this.bottomPullText = '↑上拉加载'
          }
        }
      })
    },
    // 获取分类和品牌筛选列表
    getFiltList: function () {
      this.axios.get(this.api.get_caregory_brand).then(res => {
        console.log('商品筛选分类列表', res)
        if (res.data.code === '200') {
          this.brandList = res.data.data.brand
          this.categoryList = res.data.data.category
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ware-cont{overflow: scroll;}
.ware{padding-top:rem(80);}
.ware-type{margin-left:rem(10);width:rem(20);height:rem(20);background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url(../assets/icon16.png)}
.ware-filt{padding-top:rem(15);text-align:center;color:#fff;}
.ware-filt .flex{opacity:.5;
  &.active{opacity:1;}
  span{display:inline-block;}
}
.ware-filt-a{}
.ware-filt-b span{padding-right:rem(15);background-repeat:no-repeat;background-position:right center;background-size:rem(10);background-image:url(../assets/icon19.png);}
.ware-filt-b.top{opacity:1;
  span{background-image:url(../assets/icon18.png);}
}
.ware-filt-b.bot{opacity:1;
  span{background-image:url(../assets/icon17.png);}
}
.ware-filt-c span{padding-right:rem(18);background-repeat:no-repeat;background-position:right center;background-size:rem(13);background-image:url(../assets/icon20.png);}
.ware-filt-d span{padding-left:rem(20);background-repeat:no-repeat;background-position:left center;background-size:rem(15);background-image:url(../assets/icon21.png);}
.ware-filt-d.active span{background-image:url(../assets/icon22.png);}
.ware-sort{position:absolute;left:0;top:100%;z-index:2;width:100%;text-align:center;}
.ware-sort-main{padding-bottom:rem(30);height:rem(300);overflow-y:scroll;}
.ware-sort-tit{padding:rem(10);}
.ware-sort-ul{padding:0 rem(15);
  li{float:left;width:33.3333%;line-height:rem(30);background:#F8F8F8;border:1px solid #fff;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    &.active{background:$red;color:#fff;}
  }
}
.ware-sort-btn{color:#fff;text-align:center;font-size:rem(15);
  p{line-height:rem(40);background:#268ECA;
    &:first-child{background:#fff;color:#999;border:1px solid #f1f1f1;}
  }
}

</style>
