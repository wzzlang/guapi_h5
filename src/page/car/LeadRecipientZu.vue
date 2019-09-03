<template>
  <div class="leadrecip pdt">
    <head-title :title="title"></head-title>
    <div class="ware-cont" ref="wareCont" :style="{ height: wareContHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="leadrecip-ul">
          <li v-for="item in recipientList" :key="item.id" class="leadrecip-li white" @click="leadTap(item.id)">
            <div class="leadrecip-li-title flex-box">
              <p class="title flex">{{item.name}}</p>
              <p class="intro">{{item.remark}}(收件人组备注)</p>
            </div>
            <p>{{item.uname}}</p>
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
  name: 'ChooseStoreChina',
  data () {
    return {
      title: '导入收件人组',
      ids: '', // 包裹id
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      pn: 0,
      recipientList: []
    }
  },
  computed: {
  },
  created: function () {
    let ids = this.$route.params.ids
    this.ids = ids
    this.getRecipientList()
  },
  mounted: function () {
    this.wareContHeight = document.documentElement.clientHeight - this.$refs.wareCont.getBoundingClientRect().top
  },
  methods: {
    // 上拉加载
    loadBottom: function (e) {
      this.$refs.loadmore.onBottomLoaded()
      this.pn++
      this.getRecipientList()
    },
    getRecipientList: function () {
      this.axios.post(this.api.receipt_group_list, {
        phone: this.$store.state.isLogin,
        pn: this.pn
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.groups
          if (this.pn === 0) {
            this.recipientList = list
          } else {
            this.recipientList = this.recipientList.concat(list)
          }
          if (list.length < 10) {
            this.bottomPullText = '没有更多了'
          }
        }
      })
    },
    // 包裹导入收件人组
    leadTap: function (id) {
      console.log({
        phone: this.$store.state.isLogin,
        ids: this.ids,
        id: id
      })
      this.axios.post(this.api.import_recipet_to_bkgs, {
        phone: this.$store.state.isLogin,
        ids: this.ids,
        id: id
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          // this.$store.commit('parces', res.data.data)
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
</style>
