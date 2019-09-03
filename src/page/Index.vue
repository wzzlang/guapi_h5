<template>
  <div class="index pbb">
    <div class="head">
      <div class="head-top flex-box middle">
        <router-link to="/" class="head-logo" tag="span">
          <img src="../assets/logo.png">
        </router-link>
        <router-link to="/SearchWare" class="head-search flex" tag="div">搜索</router-link>
      </div>
      <div class="head-menu">
        <div class="head-menu-p clear flex-box">
          <p v-for="(item, index) in wareList" :key="item.id" @click="categoryTap(index)" :class="{active: categoryIndex == index}" ref="sort">
            <a :href="'#animate'+index">{{item.title}}</a>
          </p>
        </div>
      </div>
    </div>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in bannerList" :key="item.id"><img :src="item.image"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="ware-menu white clear">
      <router-link to="/MilkPrice" class="ware-menu-a" tag="div">
        <img src="../assets/img1.png">
        <div class="ware-menu-p">
          <p>每日奶价</p>
          <span>DAILY</span>
        </div>
      </router-link>
      <router-link to="/SortWare/1" class="ware-menu-a" tag="div">
        <img src="../assets/img4.png">
        <div class="ware-menu-p">
          <p>新品上架</p>
          <span>DAILY</span>
        </div>
      </router-link>
      <router-link to="/SortWare/2" class="ware-menu-a" tag="div">
        <img src="../assets/img5.png">
        <div class="ware-menu-p">
          <p>特价推荐</p>
          <span>DAILY</span>
        </div>
      </router-link>
      <router-link to="/SortWare/3" class="ware-menu-a" tag="div">
        <img src="../assets/img6.png">
        <div class="ware-menu-p">
          <p>热销爆款</p>
          <span>DAILY</span>
        </div>
      </router-link>
    </div>
    <div class="notice flex-box middle white">
      <p class="notice-tit">通知</p>
      <div class="notice-main">
        <ul class="notice-ul" :style="{transform: transform}">
          <li class="notice-li" v-for="item in noticeList" :key="item.id">
            <p>{{item.title}}</p>
            <span>{{item.content}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="ware">
      <div v-for="(item, index) in wareList" :key="index" class="ware-item white">
        <a :name="'animate'+index"></a>
        <div class="ware-title flex-box middle">
          <p class="flex">{{item.title}}</p>
          <router-link tag="span" :to="'/MoreWare/'+item.cateid+'/'+item.title">查看更多 ></router-link>
        </div>
        <ware-item v-bind:wareList="item.warelist.goods"  @show-austra="showAustraToCarTap" @show-china="showChinaToCarTap"></ware-item>
      </div>
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
function getRequest () {
  let href = location.href
  let index = href.indexOf('?')
  if (index === -1) {
    return false
  }
  let url = href.substring(index + 1, href.length)
  console.log(url)
  let theRequest = {}
  let strs = url.split('&')
  console.log(strs)
  for (let i = 0; i < strs.length; i++) {
    theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
  }
  return theRequest
}
export default {
  name: 'index',
  components: {
    FootNav,
    WareItem,
    ChinaToCar,
    AustraToCar
  },
  data () {
    return {
      url: this.api.url, // 图片拼接地址
      noticeHeight: 46,
      num: 0,
      bannerList: [], // banner列表
      categoryList: [], // 分类标签列表
      categoryIndex: 0,
      noticeList: [], // 公告列表
      wareList: [], // 商品列表
      showAustraToCar: false,
      showChinaToCar: false,
      itemWare: []
    }
  },
  computed: {
    transform: function () {
      return 'translateY(-' + (this.num * this.noticeHeight) + 'px)'
    }
  },
  created: function () {
    let request = {}
    request = getRequest()
    if (request) {
      let phone = decodeURI(request['phone'])
      phone = phone.replace('#/', '')
      console.log(phone)
      this.$store.commit('isLogin', phone)
    }
    this.util.loading()
    let _this = this
    setInterval(function () {
      if (_this.num < _this.noticeList.length - 1) {
        _this.num++
      } else {
        _this.num = 0
      }
    }, 3000)
    // 获取首页数据
    this.axios.get(this.api.app_index + '?phone=' + this.$store.state.isLogin).then(res => {
      console.log(res)
      if (res.data.code === '200') {
        this.bannerList = res.data.data.slideshow
        this.noticeList = res.data.data.announcement
        this.wareList = res.data.data.goodlist
      }
      this.util.close()
    })
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
    // 商品分类标签点击
    categoryTap: function (index) {
      this.categoryIndex = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index{padding-top:rem(100);}
.head-menu{position:relative;margin-top:rem(20);text-align:center;background-color:$red;height:rem(30);line-height:rem(30);color:#fff;overflow-x:scroll;
  .head-menu-p{position:absolute;left:0;top:0;height:rem(30);line-height:rem(29);}
  a{display:inline-block;border-bottom:rem(1) solid transparent;color:#fff;}
  p{padding:0 rem(8);float:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
  p.active{
    a{border-color:#fff;}
  }
}
.banner{height:rem(202);
  img{display:block;width:100%;height:100%;}
}
.ware-menu{padding:rem(5);background:#fff;}
.ware-menu-a{position:relative;padding:rem(5);float:left;width:50%;
  img{display:block;width:100%;height:rem(65)}
}
.ware-menu-p{position:absolute;left:rem(15);top:rem(20);line-height:rem(18);
  p{padding-right:rem(10);font-size:rem(14);color:$red;font-weight:bold;background:url(../assets/icon10.png) no-repeat center right;background-size:rem(6);}
  span{color:#888;}
}
.notice{padding:rem(15) 0;margin-bottom:rem(10);}
.notice-tit{padding:0 rem(10);color:$red;font-size:14px;}
.notice-main{padding-left:35px;width:rem(320);height:46px;overflow:hidden;background:url(../assets/icon2.png) no-repeat left center;background-size:25px;}
.notice-ul{transition:all .1s ease;}
.notice-li{line-height:23px;font-size:12px;
  p{font-size:14px;color:#454547;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
  span{display:block;color:#918D8D;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;}
}
.ware{}
.ware-item{margin-bottom:rem(15);}
.ware-title{padding:rem(10);
  p{text-align:center;font-size:rem(16);color:#2BAE45;}
  span{color:#868686;}
}
.ware-ul{}
.ware-li{padding:rem(5);float:left;width:50%;}
.ware-li-img{position:relative;height:rem(178);overflow:hidden;
  img{display:block;width:100%;
    &.collect{position:absolute;right:rem(10);top:rem(10);width:rem(30);}
  }
}
.ware-li-desc{padding:rem(10);}
.ware-li-p{line-height:rem(20);
  .title{color:#333;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;font-size:rem(14);}
  .desc{height:rem(40);color:#8F8F90;overflow:hidden;}
}
.ware-li-btn{}
.ware-li-btn-a{width:rem(78);border:1px solid #268ECA;color:#268ECA;text-align:center;border-radius:rem(5);
  &:first-child{background-color:$red;color:#fff;border-color:$red;}
}
.index /deep/ .v-modal{left:50%;transform:translateX(-50%);width:100%;max-width:15rem;}
</style>
