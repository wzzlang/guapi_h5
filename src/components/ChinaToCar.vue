<template>
  <div v-if="isShow" class="add-car china white">
    <div @click="hideMyself" class="add-car-close"></div>
    <div class="add-car-prod flex-box">
      <div class="add-car-prod-pic">
        <img :src="itemWare.images">
      </div>
      <div class="add-car-prod-desc flex">
        <p class="title">{{itemWare.name}}</p>
        <p class="desc">{{itemWare.ename}}</p>
        <div class="add-car-stock flex-box">
          <p class="flex">库存: {{itemWare.total}}</p>
          <p class="flex">日期: {{itemWare.otime}}</p>
        </div>
        <p class="style">国内现货</p>
      </div>
    </div>
    <div class="add-car-com flex-box between middle">
      <div class="add-car-num flex-box">
        <div @click="minNumTap" class="add-car-num-a">-</div>
        <input class="add-car-num-c" type="text" name="" v-model="carNum">
        <div @click="addNumTap" class="add-car-num-a">+</div>
      </div>
      <p class="add-car-price">＄{{itemWare.domesticprice}}</p>
    </div>
    <div class="add-car-bot flex-box">
      <div class="add-car-btn flex flex-box">
        <router-link to="/" tag="a" class="flex">
          <img src="../assets/icon11.png">
          <p>首页</p>
        </router-link>
        <a class="flex" href="">
          <img src="../assets/icon12.png">
          <p>客服</p>
        </a>
        <a class="flex" href="">
          <img src="../assets/icon13.png">
          <p>收藏</p>
        </a>
      </div>
      <div @click="addToCarTap" class="add-car-a">加入现货购物车</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChinaToCar',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    itemWare: {
      required: true
    }
  },
  data () {
    return {
      carNum: 1
    }
  },
  methods: {
    hideMyself: function () {
      this.carNum = 1
      this.$emit('hideMyself')
    },
    // 输入框数量减少
    minNumTap: function () {
      let carNum = this.carNum
      if (carNum > 1) {
        this.carNum = --carNum
      }
    },
    // 输入框数量增加
    addNumTap: function () {
      this.carNum = ++this.carNum
    },
    // 加入购物车
    addToCarTap: function () {
      if (this.carNum > this.itemWare.total) {
        this.util.toast('库存不够了')
        return
      }
      this.axios.post(this.api.add_cart, {
        areacode: 0,
        phone: this.$store.state.isLogin,
        goodid: this.itemWare.id,
        price: this.itemWare.domesticprice,
        num: this.carNum,
        weight: this.itemWare.weight,
        ctype: 0 // 0 国内 1 境外仓库 2 药房采购
      }).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        this.util.close()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
