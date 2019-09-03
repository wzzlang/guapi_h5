<template>
  <div class="recipku pdt">
    <head-title :title="title"></head-title>
    <div class="lead-ser flex-box middle">
      <input @focus="showSerBtnTap" @blur="hideSerBtnTap" class="lead-ser-inp flex" type="text" v-model="keyword" placeholder="请填写搜索内容">
      <div v-if="showSerBtn" @click="searchTap" class="lead-ser-btn">搜索</div>
      <div v-else @click="resetTap" class="lead-ser-btn">重置</div>
    </div>
    <div class="ware-cont" ref="wareCont" :style="{ height: (wareContHeight-50) + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="recipku-ul">
          <li v-for="(item, index) in userlist" :key="item.id" class="recipku-li white">
            <div class="recipku-li-title flex-box middle">
              <p class="flex title">{{item.name}}</p>
              <p v-if="index<9">#0{{index+1}}</p>
              <p v-else>#{{index+1}}</p>
            </div>
            <div class="recipku-li-cont">
              <p>澳洲手机：{{item.amobile}}</p>
              <p>中国手机：{{item.cmobile}}</p>
              <p>备注：{{item.remark}}</p>
            </div>
            <div class="recipku-li-com flex-box">
              <div class="recipku-li-com-c">
                <div @click="setDefaultTap(1,item.id)" v-if="item.isoverseas==0" class="recipku-li-com-a bor">设为默认海外发件人</div>
                <p v-else class="recipku-li-com-p">默认海外发件人</p>
                <div @click="setDefaultTap(0,item.id)" v-if="item.isdomestic==0" class="recipku-li-com-a">设为默认国内发件人</div>
                <p v-else class="recipku-li-com-p cor">默认国内发件人</p>
              </div>
              <div class="recipku-li-btn flex flex-box right">
                <p @click="showConfirm(item.id)">删除</p>
                <router-link :to="'/AddresserEdit/'+item.id" tag="p">编辑</router-link>
              </div>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text">{{bottomPullText}}</span>
        </div>
      </mt-loadmore>
    </div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      <div class="confirm">
        <p class="confirm-title">温馨提示</p>
        <p>是否确认删除？</p>
        <div class="confirm-btn flex-box middle center">
          <p @click="cancalTap">取消</p>
          <p @click="deleteTap" class="bkg">确定</p>
        </div>
      </div>
    </mt-popup>
    <router-link class="submit-btn" to="/AddresserAdd" tag="div">添加</router-link>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'WareDetails',
  components: {
    VDistpicker
  },
  data () {
    return {
      title: '发件人库',
      userlist: [],
      userId: null,
      pn: 0,
      bottomPullText: '↑上拉加载',
      wareContHeight: 0,
      showSerBtn: false,
      keyword: '',
      popupVisible: false
    }
  },
  created: function () {
    this.getList()
  },
  mounted: function () {
    this.wareContHeight = document.documentElement.clientHeight - this.$refs.wareCont.getBoundingClientRect().top
  },
  methods: {
    // 提示
    showConfirm: function (id) {
      this.userId = id
      this.popupVisible = true
    },
    // 取消
    cancalTap: function () {
      this.popupVisible = false
    },
    // 删除发件人
    deleteTap: function () {
      this.popupVisible = false
      this.axios.get(`${this.api.delete_sender}?phone=${this.$store.state.isLogin}&id=${this.userId}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('删除成功')
          this.pn = 0
          this.getList()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 设置为默认收件人
    setDefaultTap: function (type, id) {
      this.axios.get(`${this.api.set_default_sender}?phone=${this.$store.state.isLogin}&otype=${type}&id=${id}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('设置成功')
          this.pn = 0
          this.getList()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
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
      this.getList()
    },
    searchTap: function () {
      this.pn = 0
      this.getList()
    },
    // 上拉加载
    loadBottom: function (e) {
      this.$refs.loadmore.onBottomLoaded()
      this.pn++
      this.getList()
    },
    // 获取发件人库
    getList: function () {
      this.axios.get(`${this.api.get_sender_list}?phone=${this.$store.state.isLogin}&pn=${this.pn}&keyword=${this.keyword}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.senders
          if (this.pn === 0) {
            this.userlist = list
          } else {
            this.userlist = this.userlist.concat(list)
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
<style lang="scss">
@import '../../../static/style/addRecipient';
.recip-dt{width:rem(100);}
.ware-cont{overflow: scroll;}
</style>
