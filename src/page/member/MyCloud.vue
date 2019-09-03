<template>
  <div class="order pdt pbb">
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
    <div class="ware-cont" ref="wareCont" :style="{ height: (wareContHeight-50) + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <div class="my-clode">
          <div v-for="(item, index) in wareList" :key="item.id" class="my-clode-item white flex-box">
            <div class="my-clode-pic">
              <img :src="item.images">
            </div>
            <div class="my-clode-desc flex">
              <div class="my-clode-tit flex-box">
                <p class="title flex">{{item.name}}</p>
                <p class="id" v-if="index<9">#0{{index+1}}</p>
                <p class="id" v-else>#{{index+1}}</p>
              </div>
              <p>{{item.ename}}</p>
              <div class="my-clode-bot flex-box between middle">
                <p>{{item.warehouse}}</p>
                <p class="stock">我的库存：{{item.inventory}}</p>
              </div>
            </div>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text">{{bottomPullText}}</span>
        </div>
      </mt-loadmore>
    </div>
    <div class="my-clode-com flex-box middle white">
      <p class="num flex">合计库存：{{total}}件</p>
      <router-link :to="'/MyCloudEdit/' + areacode" class="btn" tag="div">操作云仓</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCloud',
  data () {
    return {
      title: '我的云仓',
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      showSerBtn: false,
      wareList: [],
      total: 0,
      areacode: 1,
      keyword: '',
      pn: 0
    }
  },
  computed: {
  },
  created: function () {
    this.getCloudList()
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
      this.getCloudList()
    },
    searchTap: function () {
      this.pn = 0
      this.getCloudList()
    },
    // 分类点击
    sortNavTap: function (areacode) {
      this.areacode = areacode
      this.keyword = ''
      this.pn = 0
      this.getCloudList()
    },
    // 上拉加载
    loadBottom: function (e) {
      this.$refs.loadmore.onBottomLoaded()
      this.pn++
      this.getCloudList()
    },
    // 获取我的云仓列表
    getCloudList: function () {
      console.log({
        phone: this.$store.state.isLogin,
        areacode: this.areacode,
        keyword: this.keyword,
        pn: this.pn
      })
      this.axios.post(this.api.my_cloud_goods, {
        phone: this.$store.state.isLogin,
        areacode: this.areacode,
        keyword: this.keyword,
        pn: this.pn
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.goods
          this.total = res.data.data.total
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
.ware-cont{overflow: scroll;}
</style>
