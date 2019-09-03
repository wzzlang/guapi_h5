<template>
  <div class="pay-success white pdt">
    <head-title href="/" :title="title"></head-title>
    <div class="pay-success-tit">
      <img src="../../assets/icon24.png">
      <p>支付成功</p>
    </div>
    <div class="pay-success-btn flex-box middle center">
      <router-link to="/" tag="p">继续购物</router-link>
      <router-link to="/Mine" tag="p">查看订单</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  data () {
    return {
      title: '支付成功'
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pay-success{padding:rem(100) 0;}
.pay-success-tit{margin-bottom:rem(20);text-align:center;font-size:rem(20);color:#ff0000;
  img{margin: rem(10) auto;display:block;width:rem(40);}
}
.pay-success-btn{text-align:center;
  p{margin:rem(10);line-height:rem(35);width:rem(90);color:#fff;background-color:#ff0000;
    &:first-child{background-color:#268ECA;}
  }
}
</style>
