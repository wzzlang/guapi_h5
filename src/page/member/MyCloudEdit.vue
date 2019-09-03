<template>
  <div class="order pdt pbb">
    <head-title :title="title"></head-title>
    <div class="order-nav flex-box white">
      <p @click="sortNavTap(1)" :class="['flex', 'order-nav-a', {'active':areacode==1}]">澳洲直邮</p>
      <p @click="sortNavTap(0)" :class="['flex', 'order-nav-a', {'active':areacode==0}]">国内现货</p>
    </div>
    <div class="cloud-edit white">
      <p class="cloud-edit-title">选择商品</p>
      <div v-for="(sec, ind) in list" :key="ind" class="cloud-edit-main">
        <div class="cloud-edit-item flex-box middle">
          <p class="title flex">商品名称</p>
          <select v-model="resultList[ind].index" class="cloud-edit-sel " @change="chooseSelect(ind, resultList[ind].index)">
            <option value="null">请选择商品</option>
            <option v-for="(item, index) in sec.list" :value="index" :key="item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="cloud-edit-item flex-box middle">
          <p class="flex title">现有库存</p>
          <p>{{resultList[ind].nowStock}}</p>
        </div>
        <div class="cloud-edit-item flex-box middle">
          <p class="flex title">邮寄库存</p>
          <div class="cloud-edit-num flex-box middle">
            <p @click="minTap(ind)" class="btn">-</p>
            <input class="num" type="text" name="" v-model="resultList[ind].emsStock" readonly="readonly">
            <p @click="addTap(ind)" class="btn">+</p>
          </div>
        </div>
        <div class="cloud-edit-btn flex-box between">
          <p @click="addOneTap">添加一种商品</p>
          <p @click="delOneTap(ind)">移除这种商品</p>
        </div>
      </div>
    </div>
    <div class="my-clode-com flex-box middle white">
      <p class="num flex">合计邮寄：{{allEmsStock}}件</p>
      <div @click="submitTap" class="btn">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCloudEdit',
  data () {
    return {
      title: '操作云仓',
      areacode: 1,
      list: [],
      resultList: [{index: null, nowStock: 0, emsStock: 0}],
      allEmsStock: 0
    }
  },
  computed: {
  },
  created: function () {
    let areacode = this.$route.params.type
    this.areacode = areacode
    this.getCloudList()
    this.$store.commit('picker', null) // 更新取件人即发件人
    this.$store.commit('recipient', null) // 更新收件人
  },
  methods: {
    // 分类点击
    sortNavTap: function (areacode) {
      this.areacode = areacode
      this.resultList = [{index: null, nowStock: 0, emsStock: 0}]
      this.list = []
      this.getCloudList()
    },
    // 添加一种商品
    addOneTap: function () {
      this.resultList.push({index: null, nowStock: 0, emsStock: 0})
      this.list.push(this.list[0])
    },
    // 移除这种商品
    delOneTap: function (ind) {
      console.log(ind)
      this.resultList.splice(ind, 1)
      this.list.splice(ind, 1)
      this.getAllEmsStock()
    },
    // 下拉框改变
    chooseSelect: function (ind, index) {
      console.log(ind)
      console.log(index)
      if (index === 'null') {
        this.resultList[ind].nowStock = 0
        return
      }
      this.resultList[ind].nowStock = this.list[ind].list[index].inventory
    },
    // 邮寄库存减少
    minTap: function (ind) {
      if (this.resultList[ind].emsStock <= 0) {
        return
      }
      this.resultList[ind].emsStock--
      this.getAllEmsStock()
    },
    // 邮寄库存增加
    addTap: function (ind) {
      if (this.resultList[ind].emsStock >= this.resultList[ind].nowStock) {
        return
      }
      this.resultList[ind].emsStock++
      this.getAllEmsStock()
    },
    // 计算总的邮寄数量
    getAllEmsStock: function () {
      let allEmsStock = 0
      this.resultList.map(item => {
        allEmsStock += item.emsStock
      })
      this.allEmsStock = allEmsStock
    },
    // 获取我的云仓列表
    getCloudList: function () {
      this.axios.get(`${this.api.my_cloud_goods_list}?phone=${this.$store.state.isLogin}&areacode=${this.areacode}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let obj = {}
          obj.list = res.data.data
          this.list.push(obj)
          this.getAllEmsStock()
          console.log(this.list)
        }
      })
    },
    // 提交操作云仓
    submitTap: function () {
      let cloud = []
      this.resultList.map(item => {
        if (item.emsStock !== 0) {
          let obj = {}
          obj.id = this.list[0].list[item.index].id
          obj.num = item.emsStock
          cloud.push(obj)
        }
      })
      if (cloud.length === 0) {
        this.util.toast('请先操作云仓')
        return
      }
      let formdata = {
        phone: this.$store.state.isLogin,
        areacode: this.areacode,
        cloud: cloud
      }
      console.log(JSON.stringify(formdata))
      this.axios.post(this.api.save_opera_cloud_info, {
        formdata: JSON.stringify(formdata)
      }).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = encodeURIComponent(JSON.stringify(res.data.data))
          if (this.areacode === 1) {
            this.$router.push({path: `/MyCloudEditAustra/${list}`})
          } else {
            this.$router.push({path: `/MyCloudEditChina/${list}`})
          }
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
.cloud-edit{margin-top:rem(10);}
.cloud-edit-title{padding:rem(15);border-bottom:1px solid #ddd;}
.cloud-edit-main{padding:rem(15)}
.cloud-edit-item{margin-bottom:rem(15);line-height:rem(30);
  .title{font-size:rem(14);width:rem(100);}
}
.cloud-edit-sel{padding-right: rem(25);width: rem(250);direction: rtl;appearance:none;background: url(../../assets/icon68.png) no-repeat right center;background-size: rem(20);}
.cloud-edit-num{text-align:center;
  .btn{width:rem(30);line-height:rem(30);background-color:#F4F3F3;}
  .num{height:rem(30);line-height:rem(30);width:rem(60);text-align:center;}
}
.cloud-edit-btn{text-align:center;
  p{width:rem(150);line-height:rem(40);border:1px solid #ddd;}
}
</style>
