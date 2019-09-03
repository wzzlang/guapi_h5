<template>
  <div class="parcel pdt">
    <head-title :title="title"></head-title>
    <div class="parcel-main">
      <div class="parcel-cont white">
        <p class="parcel-title">勾选商品</p>
        <dl v-for="(item, index) in parces.goods" :key="item.id" class="parcel-dl flex-box">
          <dt class="parcel-dt flex">{{item.goodname}}</dt>
          <dd @click="parceChooseTap(index, item.goodid)" :class="['parcel-dd', {'active':chooseList[index]==item.goodid}]"></dd>
        </dl>
      </div>
      <div class="parcel-com flex-box middle">
        <div class="parcel-com-a flex">
          <select class="parcel-com-sel" v-model="selectIndex" @change="selectChange(selectIndex)">
            <option v-for="(item, index) in parces.bkgs" :value="index" :key="item.id">包裹{{index+1}}({{item.typename ? item.typename : "空包裹"}})</option>
          </select>
        </div>
        <div class="parcel-com-a flex">
          <div @click="moveTap" class="parcel-com-sel">移动到另一个包裹</div>
        </div>
      </div>
    </div>
    <button @click="deleteTap" class="submit-btn">删除勾选商品</button>
  </div>
</template>

<script>
export default {
  name: 'ParcelEdit',
  data () {
    return {
      title: '编辑包裹',
      id: null, // 操作的包裹id
      ids: null, // 所有包裹id
      chooseList: [],
      selectIndex: 0, // 下拉框下标
      bkg_id: null, // 下拉框选择的包裹id
      parces: []
    }
  },
  computed: {
  },
  created: function () {
    this.id = this.$route.params.id
    this.ids = this.$route.params.ids
    this.getParces()
  },
  methods: {
    // 获取编辑包裹数据
    getParces: function () {
      console.log({
        phone: this.$store.state.isLogin,
        id: this.id,
        ids: this.ids
      })
      this.axios.post(this.api.edit_bkgs_info, {
        phone: this.$store.state.isLogin,
        id: this.id,
        ids: this.ids
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.parces = res.data.data
          this.parces.goods.map((item, index) => {
            this.chooseList[index] = 0
          })
        }
      })
    },
    // 勾选商品
    parceChooseTap: function (index, id) {
      if (this.chooseList[index] === id) {
        this.$set(this.chooseList, index, 0)
      } else {
        this.$set(this.chooseList, index, id)
      }
    },
    // 下拉框选择包裹
    selectChange: function (index) {
      this.bkg_id = this.parces.bkgs[index].id
    },
    // 移动到另一个包裹
    moveTap: function () {
      let goods = []
      this.parces.goods.map(item => {
        this.chooseList.map(sec => {
          if (item.goodid === sec) {
            goods.push(item)
          }
        })
      })
      if (goods.length === 0) {
        this.util.toast('还没有选择商品')
        return
      }
      let formdata = {
        phone: this.$store.state.isLogin,
        bkg_id: this.bkg_id,
        goods: goods
      }
      console.log(JSON.stringify(formdata))
      this.axios.post(this.api.add_good_to_bkgs, {
        formdata: JSON.stringify(formdata)
      }).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        if (res.data.code === '200') {
          this.getParces()
        }
      })
    },
    // 删除勾选商品
    deleteTap: function () {
      let folders = []
      this.parces.goods.map(item => {
        this.chooseList.map(sec => {
          if (item.goodid === sec) {
            folders.push(item)
          }
        })
      })
      if (folders.length === 0) {
        this.util.toast('还没有选择商品')
        return
      }
      let formdata = {
        phone: this.$store.state.isLogin,
        folders: folders
      }
      this.util.loading()
      this.axios.post(this.api.delete_good_to_bkgs, {
        formdata: JSON.stringify(formdata)
      }).then(res => {
        console.log(res)
        this.util.close()
        if (res.data.code === '200') {
          this.util.toast('删除成功')
          this.getParces()
        } else {
          this.util.toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../static/style/addRecipient';
</style>
