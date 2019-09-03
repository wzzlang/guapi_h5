<template>
  <div class="store pdt pbb">
    <head-title :title="title"></head-title>
    <ul class="store-ul">
      <li v-for="(item, index) in storeList" :key="item.id" class="store-li white">
        <div class="store-li-title flex-box middle">
          <p class="flex">{{item.name}}</p>
          <div @click="chooseTap(index)" :class="['store-li-choose', {'active':index==storeIndex}]"></div>
        </div>
        <div v-if="index==storeIndex" class="store-li-intro">
          <div class="store-li-item flex-box middle">
            <p class="title">门店名称</p>
            <p class="intro flex">{{item.name}}</p>
          </div>
          <div class="store-li-item flex-box">
            <p class="title">联络电话</p>
            <p class="intro flex">{{item.mobile}}</p>
          </div>
          <div class="store-li-item flex-box">
            <p class="title">详细地址</p>
            <p class="intro flex">{{item.address}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div @click="submitTap" class="submit-btn">提交</div>
  </div>
</template>

<script>
export default {
  name: 'ChooseStoreChina',
  data () {
    return {
      title: '选择门店',
      storeList: [],
      storeIndex: null
    }
  },
  computed: {
  },
  created: function () {
    let storeList = JSON.parse(decodeURIComponent(this.$route.params.storeList))
    this.storeIndex = this.$store.state.storeIndex
    this.storeList = storeList
  },
  methods: {
    // 选择门店
    chooseTap: function (index) {
      this.storeIndex = index
    },
    // 提交
    submitTap: function () {
      this.$store.state.storeIndex = this.storeIndex
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
</style>
