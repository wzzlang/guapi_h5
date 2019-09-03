<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;width:100%;margin:0 auto;width:100%;max-width:15rem;font-size:rem(13)}
.pbb{padding-bottom:rem(45)}
.pdt{padding-top:rem(45);}
.shade{position:fixed;left:50%;top:0;z-index:4;transform:translateX(-50%);width:100%;max-width:15rem;height:100%;background:#000;opacity:.4;}
.head{position:fixed;left:50%;top:0;z-index:3;transform:translateX(-50%);width:100%;max-width:15rem;padding:rem(10);background-color:$red;
  &.sort{top:rem(45);}
}
.head-top{}
.head-logo{margin-right:rem(10);width:rem(30);}
.head-logo img{display:block;width:100%;}
.head-search{padding-left:rem(40);line-height:rem(30);border-radius:rem(17);background:#fff url(./assets/icon1.png) no-repeat rem(15) center;background-size:rem(18);}
/*登录注册*/
.login{}
.login-form{margin:rem(10) 0;padding:0 rem(15);}
.login-inp{position:relative;display:block;width:100%;height:rem(50);line-height:rem(50);font-size:rem(14);}
.border{width:100%;height:1px;background-color:#f1f1f1;-webkit-transform: scaleY(0.5); transform: scaleY(0.5);}
.login-code{padding:0 rem(10);min-width:rem(40);line-height:rem(24);border:1px solid $red;color:$red;border-radius:rem(12);text-align:center;}
.login-sel{height:rem(50);line-height:rem(50);text-align:center;outline:none;background:none;}
.login-main{padding:rem(15)}
.login-btn{margin-bottom:rem(30);width:100%;height:rem(50);border-radius:rem(22);background:$red;color:#fff;font-size:rem(15);}
.login-com{line-height:rem(24);
  p{color:#999;}
  span{display:block;width:rem(60);border-radius:rem(20);border:1px solid $red;color:$red;text-align:center;}
}
.login-wechat{margin:rem(90) auto rem(40) auto;width:rem(60);text-align:center;
  img{margin-bottom:rem(15);display:block;width:100%;}
}
.login-else{text-align:center;color:$red;}
.submit-btn{position:fixed;left:50%;bottom:0;z-index:3;transform:translateX(-50%);width:100%;max-width:15rem;line-height:rem(45);background-color:$red;color:#fff;text-align:center;font-size:rem(14);}
.submit-btn-a{
  &.bkg{background-color:#268ECA;}
  &.bkg1{background-color:#f1f1f1;color:#8F8F90;}
}
.cor-red{color:#E34A4C;}
.uploadID-intro{padding:rem(15) 0;line-height:rem(24);font-size:rem(13);color:#666;}
.imgwidth img{display:block;width:100% !important;}
/*上拉加载*/
.mint-loadmore-bottom{margin-bottom:0 !important;}
/*加载动画*/
.mint-indicator-wrapper{background-color:transparent !important;
  .mint-spinner-fading-circle-circle::before{background-color:$red !important;}
}
</style>
