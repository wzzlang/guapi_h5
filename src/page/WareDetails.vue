<template>
  <div class="detail pdt">
    <head-title :title="title"></head-title>
    <div class="detail-main">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in goodinfo.imagelist" :key="item"><img :src="item"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="detail-intro flex-box white">
        <div class="detail-intro-p flex">
          <p class="title">{{goodinfo.name}}</p>
          <p>{{goodinfo.ename}}</p>
          <p>销量：{{goodinfo.sales}}件/月</p>
        </div>
        <div @click="shareTap" class="detail-share">
          <img src="../assets/icon48.png">
          <p>分享</p>
        </div>
      </div>
      <div class="detail-spec white">
        <div class="detail-spec-item flex-box">
          <p class="flex">规格：{{goodinfo.specname}}</p>
          <p class="flex">重量：{{goodinfo.weight}}</p>
        </div>
        <div class="detail-spec-item flex-box">
          <p class="flex">品牌：{{goodinfo.brandname}}</p>
          <p class="flex">分类：{{goodinfo.classname}}</p>
        </div>
      </div>
      <div class="detail-desc imgwidth white">
        <p class="title">商品详情</p>
        <div v-html="goodinfo.content"></div>
      </div>
    </div>
    <div class="detail-com flex-box middle white">
      <div class="detail-com-a flex-box flex middle">
        <router-link to="/" tag="div" class="flex">
          <img src="../assets/icon11.png">
          <p>首页</p>
        </router-link>
        <div class="flex">
          <img src="../assets/icon12.png">
          <p>客服</p>
        </div>
        <div v-if="isLove==0" @click="collectTap(goodinfo.id)" class="flex">
          <img src="../assets/icon13.png">
          <p>收藏</p>
        </div>
        <div v-else @click="cancelCollectTap(goodinfo.id)" class="flex">
          <img  src="../assets/icon5.png">
          <p>取消</p>
        </div>
      </div>
      <div class="detail-com-c flex-box middle">
        <div @click="showAustraToCarTap(goodinfo)" class="flex">
          <p>海外直邮</p>
          <p class="price">${{goodinfo.overseasprice}}</p>
        </div>
        <div @click="showChinaToCarTap(goodinfo)" class="flex">
          <p>国内现货</p>
          <p class="price">${{goodinfo.domesticprice}}</p>
        </div>
      </div>
    </div>
    <!--分享提示-->
    <div v-if="shareNotice" @click="hideShareNotice" class="shade"></div>
    <div v-if="shareNotice" @click="hideShareNotice" class="share-notice">
      <img src="../assets/iconn69.png" alt="">
    </div>
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
  name: 'WareDetails',
  components: {
    ChinaToCar,
    AustraToCar
  },
  data () {
    return {
      title: '商品详情',
      environ: null, // 判断是小程序环境还是微信环境
      showAustraToCar: false,
      showChinaToCar: false,
      itemWare: [],
      goodinfo: [], // 商品详情数据
      shareNotice: false, // 显示分享提示框
      isLove: null // 商品是否已收藏
    }
  },
  computed: {
  },
  created: function () {
    this.environ = this.$store.state.environ // 判断是小程序环境还是微信环境
    console.log(this.$store.state.environ)
    if (this.environ === 0) {
      // 微信环境
      this.share()
    }
    // 获取商品详情
    this.axios.get(this.api.get_good_by_id + '?id=' + this.$route.params.id + '&phone=' + this.$store.state.isLogin).then(res => {
      console.log(res)
      if (res.data.code === '200') {
        this.goodinfo = res.data.data.goodinfo
        this.isLove = res.data.data.islove
      }
    })
  },
  methods: {
    // 收藏商品
    collectTap: function (id) {
      if (this.$store.state.isLogin) {
        this.axios.post(this.api.join_love, {
          phone: this.$store.state.isLogin,
          id: id
        }).then(res => {
          console.log(res)
          this.util.toast(res.data.msg)
          if (res.data.code === '200') {
            this.isLove = 1
          }
        })
      } else {
        this.$router.push({path: '/LoginPhone'})
      }
    },
    // 取消收藏商品
    cancelCollectTap: function (id, index) {
      this.axios.post(this.api.cancele_love, {
        phone: this.$store.state.isLogin,
        id: id
      }).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        if (res.data.code === '200') {
          this.isLove = 0
        }
      })
    },
    // 分享点击
    shareTap: function () {
      this.showShareNotice()
    },
    showShareNotice: function () {
      this.shareNotice = true
    },
    hideShareNotice: function () {
      this.shareNotice = false
    },
    // 分享
    share: function () {
      console.log('location.href', location.href)
      let that = this
      this.axios.post(this.api.getShare, {
        url: encodeURIComponent(location.href)
      }).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        if (res.data.code === '200') {
          // eslint-disable-next-line
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showOptionMenu', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
          })
          // eslint-disable-next-line
          wx.ready(function () { //需在用户可能点击分享按钮前就先调用
            let shareData = {
              title: that.goodinfo.name, // 分享标题
              desc: '', // 分享描述
              link: location.href, // 分享链接
              imgUrl: that.goodinfo.imagelist[0], // 分享图标
              success: function (res) {
                that.hideShareNotice() // 分享成功，隐藏引导用户分享的浮层
              },
              cancel: function (res) {
                // 用户取消分享后执行的回调函数
              }
            }
            // eslint-disable-next-line
           	wx.onMenuShareAppMessage(shareData) // 微信好友
            // eslint-disable-next-line
            wx.onMenuShareTimeline(shareData) // 朋友圈
            // eslint-disable-next-line
            wx.onMenuShareQQ(shareData) // QQ
            // eslint-disable-next-line
            wx.onMenuShareQZone(shareData) // QQ空间
            // eslint-disable-next-line
            wx.onMenuShareWeibo(shareData) // 腾讯微博
          })
        }
      })
    },
    // 海外直邮
    showAustraToCarTap: function (item) {
      if (this.$store.state.isLogin) {
        this.itemWare = item
        this.showAustraToCar = true
      } else {
        this.$router.push({path: '/LoginPhone'})
      }
    },
    hideAustraToCarTap: function () {
      this.showAustraToCar = false
    },
    // 国内现货
    showChinaToCarTap: function (item) {
      if (this.$store.state.isLogin) {
        this.itemWare = item
        this.showChinaToCar = true
      } else {
        this.$router.push({path: '/LoginPhone'})
      }
    },
    hideChineToCarTap: function () {
      this.showChinaToCar = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.banner{height:rem(350);
  img{display:block;width:100%;height:100%;}
}
.detail{padding-bottom:rem(50);}
.detail-intro{padding:rem(10);margin-bottom:rem(15);}
.detail-intro-p{color:#8F8F90;line-height:rem(24);
  .title{font-size:rem(14);color:#333;}
}
.detail-share{text-align:center;color:$red;
  img{width:rem(18);margin:rem(5) auto;display:block;}
}
.detail-spec{margin-bottom:rem(15);padding:rem(10);color:#8F8F90;line-height:rem(24);}
.detail-desc{
  .title{padding:rem(10);font-size:rem(14);color:#454547;}
  img{display:block;width:100% !important;}
}
.detail-com{position:fixed;left:50%;bottom:0;z-index:3;transform:translateX(-50%);width:100%;max-width:15rem;}
.detail-com-a{padding:rem(3) rem(10);text-align:center;border-top:1px solid #E9E7E7;
  img{margin:0 auto rem(3) auto;display:block;width:rem(20);height:rem(20);}
}
.share-notice{position: fixed;right: 15%;top: 0;z-index:4;width: rem(180);
  img{display: block;width: 100%;}
}
.detail-com-c{width:rem(200);background-color:#268ECA;color:#fff;text-align:center;
  .flex{padding:rem(6) 0;
    &:first-child{background-color:$red;}
  }
  .price{font-size:rem(15);}
}
</style>
