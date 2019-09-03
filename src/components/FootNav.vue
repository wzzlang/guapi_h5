<template>
  <div class="foot white flex-box middle">
    <router-link to="/" class="foot-a flex icon1" tag="p">首页</router-link>
    <router-link to="/Ware" class="foot-a flex icon2" tag="p">全部商品</router-link>
    <router-link :to="isLogin ? '/Car' : '/LoginPhone'" class="foot-a flex icon3" tag="p">购物车</router-link>
    <router-link :to="isLogin ? '/Mine' : '/LoginPhone'" class="foot-a flex icon4" tag="p">会员中心</router-link>
  </div>
</template>

<script>
export default {
  name: 'FootNav',
  data () {
    return {
      msg: ''
    }
  },
  created: function () {
    if (this.$store.state.isLogin) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.foot{position:fixed;left:50%;bottom:0;z-index:3;transform:translateX(-50%);width:100%;max-width:15rem;padding:rem(3) 0;box-shadow:0px 0 5px 1px rgba(233,231,231,0.5);}
.foot-a{padding-top:rem(22);text-align:center;background-repeat:no-repeat;background-position:center top;background-size:rem(20);color:#C5C5C5;
  &.icon1{background-image:url(../assets/icon6.png);}
  &.icon2{background-image:url(../assets/icon7.png);}
  &.icon3{background-image:url(../assets/icon8.png);}
  &.icon4{background-image:url(../assets/icon9.png);}
}
.router-link-exact-active{color:$red;
  &.icon1{background-image:url(../assets/icon6h.png);}
  &.icon2{background-image:url(../assets/icon7h.png);}
  &.icon3{background-image:url(../assets/icon8h.png);}
  &.icon4{background-image:url(../assets/icon9h.png);}
}
</style>
