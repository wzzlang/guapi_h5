<template>
  <div class="lead pdt">
    <head-title :title="title"></head-title>
    <div class="lead-ser flex-box middle">
      <input @focus="showSerBtnTap" @blur="hideSerBtnTap" class="lead-ser-inp flex" placeholder="输入首字母搜索" type="text" name="" v-model="keyword">
      <div @click="searchTap" v-if="showSerBtn" class="lead-ser-btn">搜索</div>
      <div @click="resetTap" v-else class="lead-ser-btn">重置</div>
    </div>
    <ul class="lead-ul">
      <li v-for="item in pickerList" :key="item.name" v-if="item.list.length != 0" class="lead-li">
        <p class="title">{{item.name}}</p>
        <div class="lead-li-cont white">
          <div v-for="sec in item.list" :key="sec.id" @click="chooseTap(sec)" class="lead-li-item flex-box">
            <p class="flex name">{{sec.name}}</p>
            <!--澳洲进来显示澳洲手机号-->
            <p v-if="type==1">{{sec.amobile}}</p>
            <!--国内进来显示国内-->
            <p v-if="type==0">{{sec.cmobile}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeadPickerAustra',
  data () {
    return {
      title: '导入发件人',
      showSerBtn: false,
      type: null, // 0-国内 1-澳洲
      pickerList: [],
      keyword: ''
    }
  },
  computed: {
  },
  created: function () {
    this.type = this.$route.params.type
    console.log(this.type)
    this.getPickerList()
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
      this.getPickerList()
    },
    // 搜索发件人
    searchTap: function () {
      this.getPickerList()
    },
    // 选择发件人
    chooseTap: function (item) {
      this.$store.commit('picker', item)
      this.$router.go(-1)
    },
    // 获取发件人列表
    getPickerList: function () {
      console.log({
        phone: this.$store.state.isLogin,
        keyword: this.keyword
      })
      this.axios.post(`${this.api.get_sender_lists}?phone=${this.$store.state.isLogin}&keyword=${this.keyword}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.pickerList = res.data.data
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
