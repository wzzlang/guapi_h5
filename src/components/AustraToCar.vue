<template>
  <div v-if="isShow" class="add-car white">
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
        <p class="style">澳洲直邮</p>
      </div>
    </div>
    <div class="add-car-com flex-box between middle">
      <div class="add-car-num flex-box">
        <div @click="minNumTap" class="add-car-num-a">-</div>
        <input class="add-car-num-c" type="text" name="" v-model="carNum">
        <div @click="addNumTap" class="add-car-num-a">+</div>
      </div>
      <p class="add-car-price">＄{{itemWare.price}}</p>
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
      <div @click="addToCarTap" class="add-car-a">加入直邮购物车</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AustraToCar',
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
      let price = this.itemWare.price
      let ctype = 1
      // status 0代表药房 1代表境外
      if (this.itemWare.status === 1) {
        ctype = 1
      } else {
        ctype = 2
      }
      this.axios.post(this.api.add_cart, {
        areacode: 1,
        phone: this.$store.state.isLogin,
        goodid: this.itemWare.id,
        price: price,
        num: this.carNum,
        weight: this.itemWare.weight,
        ctype: ctype // 0 国内 1 境外仓库 2 药房采购
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
.add-car{position:fixed;left:50%;bottom:0;z-index:4;transform:translateX(-50%);width:100%;max-width:15rem;padding:rem(40) rem(15) rem(45) rem(15);
  &.china{
    .add-car-prod-desc .style{color:#268ECA;}
    .add-car-a{background-color:#268ECA;}
  }
}
.add-car-close{position:absolute;right:rem(10);top:rem(10);width:rem(20);height:rem(20);background:url(../assets/icon14.png) no-repeat center;background-size:contain;}
.add-car-prod{padding-bottom:rem(15);border-bottom:1px solid #D1D1D1;}
.add-car-prod-pic{width:rem(100);height:rem(100);background-color:#f1f1f1;
  img{display:block;width:100%;height:100%;}
}
.add-car-prod-desc{padding-left:rem(10);line-height:rem(20);}
.add-car-prod-desc .title{display: -webkit-box !important;-webkit-box-orient: vertical;word-break:break-all;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;}
.add-car-prod-desc .desc{display: -webkit-box !important;-webkit-box-orient: vertical;word-break:break-all;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;}
.add-car-prod-desc .style{margin-top:rem(10);font-size:rem(16);color:#E34A4C;}
.add-car-com{padding:rem(15) 0;}
.add-car-num{}
.add-car-num-a{width:rem(40);line-height:rem(30);text-align:center;background-color:#F4F3F3;font-size:rem(20);}
.add-car-num-c{width:rem(50);height:rem(30);line-height:rem(30);text-align:center;border:none;}
.add-car-price{font-size:rem(18);color:#E34A4C;}
.add-car-bot{position:absolute;left:0;bottom:0;width:100%;}
.add-car-btn{
  a{padding-top:rem(5);display:block;height:rem(45);text-align:center;color:#8F8F90;}
  img{margin:0 auto rem(2) auto;display:block;width:rem(20);}
}
.add-car-a{width:rem(200);line-height:rem(45);text-align:center;background:#E34A4C;color:#fff;font-size:rem(16);}
.fixd-car{position:fixed;right:rem(20);top:rem(60);z-index:5;width:rem(40);height:rem(40);
  img{display:block;width:100%;height:100%;}
}
</style>
