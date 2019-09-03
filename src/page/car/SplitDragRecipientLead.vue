<template>
  <div class="leadrecip pdt">
    <head-title :title="title"></head-title>
    <div class="lead-ser flex-box middle">
      <input class="lead-ser-inp flex" type="text" v-model="keyword" placeholder="请输入名称首字母搜索">
      <div @click="searchTap" v-if="showSearchBtn" class="lead-ser-btn">搜索</div>
      <div @click="resetTap" v-else class="lead-ser-btn">重置</div>
    </div>
    <ul class="lead-ul">
      <li v-for="(item, index) in recipientList" :key="index" v-if="item.list.length != 0" class="lead-li">
        <p class="title">{{item.name}}</p>
        <ul class="leadrecip-ul">
          <li v-for="sec in item.list" :key="sec.id" @click="chooseTap(sec)" class="leadrecip-li white">
            <div class="leadrecip-li-title flex-box">
              <p class="title flex">{{sec.realname}}</p>
              <p class="intro">{{sec.mobile}}</p>
            </div>
            <p>{{sec.area}} {{sec.address}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecipientLead',
  data () {
    return {
      title: '导入收件人',
      parcelId: 0, // 包裹id
      recipientList: [],
      showSearchBtn: true, // 显示搜索按钮
      keyword: ''
    }
  },
  computed: {
  },
  created: function () {
    this.getRecipientList()
    this.parcelId = this.$route.params.id
  },
  methods: {
    // 搜索
    searchTap: function () {
      if (!(this.util.isEmpty(this.keyword))) {
        return
      }
      this.getRecipientList()
      this.showSearchBtn = false
    },
    // 重置
    resetTap: function () {
      this.keyword = ''
      this.getRecipientList()
      this.showSearchBtn = false
    },
    // 获取收件人
    getRecipientList: function () {
      this.axios.get(`${this.api.get_recipt_lists}?phone=${this.$store.state.isLogin}&keyword=${this.keyword}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.recipientList = res.data.data
        }
      })
    },
    // 选择收件人
    chooseTap: function (sec) {
      console.log(this.parcelId)
      this.axios.post(this.api.replace_recipet_to_bkg, {
        phone: this.$store.state.isLogin,
        bkg_id: this.parcelId,
        id: sec.id
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.$router.go(-1)
        } else {
          this.util.toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../static/style/addRecipient';
.leadrecip-ul{margin-top:0;}
.leadrecip-li-title .title{padding:0;}
</style>
