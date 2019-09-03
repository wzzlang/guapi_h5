<template>
  <div class="recipku pdt pbb">
    <head-title :title="title"></head-title>
    <div class="lead-ser flex-box middle">
      <input @focus="showSerBtnTap" @blur="hideSerBtnTap" class="lead-ser-inp flex" type="text" v-model="keyword" placeholder="请填写搜索内容">
      <div v-if="showSerBtn" @click="searchTap" class="lead-ser-btn">搜索</div>
      <div v-else @click="resetTap" class="lead-ser-btn">重置</div>
    </div>
    <div class="ware-cont" ref="wareCont" :style="{ height: (wareContHeight-50) + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="false" :auto-fill="false">
        <ul class="recipku-ul">
          <li v-for="(item,index) in userlist" :key="item.id" class="recipku-li white">
            <div class="recipku-li-title flex-box middle">
              <p class="flex title">{{item.realname}}</p>
              <p v-if="index<9">#0{{index+1}}</p>
              <p v-else>#{{index+1}}</p>
            </div>
            <div class="recipku-li-cont">
              <div class="flex-box">
                <p class="flex">手机：{{item.mobile}}</p>
                <p>绑定身份证：<span v-if="item.status==1">是</span><span v-else>否</span></p>
              </div>
              <p>地址：{{item.area}} {{item.address}}</p>
              <p>备注：{{item.remark}}</p>
            </div>
            <div class="recipku-li-com flex-box">
              <div @click="setDefaultTap(item.id)" v-if="item.isdefault == 0" class="recipku-li-com-a">设为默认收件人</div>
              <div v-if="item.isdefault == 1" class="recipku-li-com-a bkg">默认收件人</div>
              <div class="recipku-li-btn flex flex-box right">
                <p @click="showConfirm(item.id)">删除</p>
                <router-link :to="'/RecipientKuEdit/'+item.id" tag="p">编辑</router-link>
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
    <router-link class="submit-btn" to="/RecipientKuAdd/0" tag="div">添加</router-link>
  </div>
</template>

<script>
export default {
  name: 'WareDetails',
  data () {
    return {
      title: '收件人库',
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
  computed: {
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
    // 删除收件人
    deleteTap: function () {
      this.popupVisible = false
      this.axios.get(`${this.api.delete_receipt}?phone=${this.$store.state.isLogin}&id=${this.userId}`).then(res => {
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
    setDefaultTap: function (id) {
      this.axios.get(`${this.api.set_default}?phone=${this.$store.state.isLogin}&id=${id}`).then(res => {
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
    // 获取收件人库
    getList: function () {
      console.log(`${this.api.get_recipt_list}?phone=${this.$store.state.isLogin}&pn=${this.pn}&keyword=${this.keyword}`)
      this.axios.get(`${this.api.get_recipt_list}?phone=${this.$store.state.isLogin}&pn=${this.pn}&keyword=${this.keyword}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.recipts
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
