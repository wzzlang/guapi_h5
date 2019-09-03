<template>
  <div v-if="userInfo" class="mine pbb">
    <div class="mine-top white">
      <div v-if="userInfo.user" class="mine-pep flex-box">
        <div class="mine-pep-cont flex-box flex middle">
          <div class="mine-pep-pic">
            <img :src="userInfo.user.avatar ? userInfo.user.avatar : require('../assets/icon60.png')">
          </div>
          <div class="mine-pep-intro flex">
            <p class="name">{{userInfo.user.name}} <span>{{userInfo.user.levelname}}</span></p>
            <p class="phone">{{this.$store.state.isLogin}}</p>
          </div>
        </div>
        <div class="mine-pep-com">
          <router-link tag="div" to="/UpdateInfo" class="mine-pep-edit">修改资料</router-link>
          <div class="mine-pep-qian flex-box middle">
            <p>连续第{{userInfo.sign.sign_num}}天</p>
            <span @click="qiandaoTap" v-if="userInfo.sign.status==0">签到</span>
            <span v-else>已签到</span>
          </div>
        </div>
      </div>
      <ul v-if="userInfo.user" class="mine-pep-ul flex-box">
        <li class="mine-pep-li flex">
          <p class="num">${{userInfo.user.credit1}}</p>
          <p class="title">会员余额</p>
        </li>
        <li class="mine-pep-li flex">
          <p class="num">{{userInfo.user.credit2 | int}}分</p>
          <p class="title">会员积分</p>
        </li>
        <li class="mine-pep-li flex">
          <p class="num">{{userInfo.user.total/1000 | toFixed}}KG</p>
          <p class="title">发货重量</p>
        </li>
        <li class="mine-pep-li flex">
          <p class="num">{{userInfo.user.love}}</p>
          <p class="title">商品收藏</p>
        </li>
      </ul>
      <div class="mine-pep-nav">
        <div class="mine-top-nav-title flex-box">
          <p class="flex">商城订单 查商品</p>
          <p class="flex">云仓订单 查物流</p>
        </div>
        <ul class="mine-pep-nav-ul flex-box">
          <router-link :to="'/orderStore/0'" tag="li" class="mine-pep-nav-li flex">
            <img src="../assets/icon28.png">
            <p>商城下单</p>
          </router-link>
          <router-link :to="'/orderStore/1'" tag="li" class="mine-pep-nav-li flex">
            <img src="../assets/icon29.png">
            <p>门店自取</p>
          </router-link>
          <router-link :to="'/orderCloud/1'" tag="li" class="mine-pep-nav-li flex">
            <img src="../assets/icon30.png">
            <p>澳洲直邮</p>
          </router-link>
          <router-link :to="'/orderCloud/0'" tag="li" class="mine-pep-nav-li flex">
            <img src="../assets/icon31.png">
            <p>国内现货</p>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="mine-serv white">
      <div class="mine-title">我的服务</div>
      <ul class="mine-serv-ul clear">
        <router-link to="/MyCloud" tag="li" class="mine-serv-li">
          <img src="../assets/icon32.png">
          <p>我的云仓</p>
        </router-link>
        <router-link to="/UploadIDcard" tag="li" class="mine-serv-li">
          <img src="../assets/icon33.png">
          <p>上传身份证</p>
        </router-link>
        <router-link to="/Collect" tag="li" class="mine-serv-li">
          <img src="../assets/icon34.png">
          <p>商品收藏</p>
        </router-link>
        <router-link to="/MyIntegral" tag="li" class="mine-serv-li">
          <img src="../assets/icon35.png">
          <p>我的积分</p>
        </router-link>
        <router-link to="/RecipientKu" tag="li" class="mine-serv-li">
          <img src="../assets/icon36.png">
          <p>收件人库</p>
        </router-link>
        <router-link to="/RecipientZu" tag="li" class="mine-serv-li">
          <img src="../assets/icon37.png">
          <p>收件人组</p>
        </router-link>
        <router-link to="/AddresserKu" tag="li" class="mine-serv-li">
          <img src="../assets/icon38.png">
          <p>发件人库</p>
        </router-link>
        <router-link to="/Recharge" tag="li" class="mine-serv-li">
          <img src="../assets/icon39.png">
          <p>余额充值</p>
        </router-link>
        <router-link to="/CloudLog" tag="li" class="mine-serv-li">
          <img src="../assets/icon40.png">
          <p>云仓日志</p>
        </router-link>
        <router-link to="/BalanceLog" tag="li" class="mine-serv-li">
          <img src="../assets/icon41.png">
          <p>余额日志</p>
        </router-link>
        <router-link to="/IntegralLog" tag="li" class="mine-serv-li">
          <img src="../assets/icon42.png">
          <p>积分日志</p>
        </router-link>
        <router-link to="/Help" tag="li" class="mine-serv-li">
          <img src="../assets/icon43.png">
          <p>帮助中心</p>
        </router-link>
      </ul>
    </div>
    <div v-if="!userInfo.user.groupnum" class="mine-notice">建议您添加小助手微信（微信号：待定），组建单独为您服务的微信群，并将群号提供在“修改资料”里，以便为您呈现更好的服务，完善后此信息会被移除。</div>
    <div class="mine-pay white">
      <div class="mine-title">商城云仓未付款</div>
      <ul class="mine-pay-ul">
        <li v-for="item in userInfo.orderlist" :key="item.id" class="mine-pay-li">商城{{item.ordersn}}</li>
        <li v-for="item in userInfo.cloudlist" :key="item.id" class="mine-pay-li">云仓{{item.cloudsn}}</li>
      </ul>
    </div>
    <div class="mine-title ID white">
      <p @click="showIDIntroTap" class=" flex-box middle">自行上传身份证 <img src="../assets/icon44.png"></p>
      <div v-if="showIDIntro" class="uploadID-intro white">
        <p>若我们发货前，在身份证库中有收件人有效的身份证信息，我们发货时会将身份证信息自动提交给快递公司。如果我们发货后才提供，需要由您自行上传到快递公司网站。如果您已经上传请忽略这里的提醒。</p>
      </div>
    </div>
    <ul class="mine-id-ul white">
      <li v-for="item in userInfo.address" :key="item.id" class="mine-id-li">
        <div class="title flex-box">
          <p class="flex">{{item.realname}}</p>
          <p>{{item.mobile}}</p>
        </div>
        <p class="ems">极地快递</p>
      </li>
    </ul>
    <a class="mine-service flex-box center middle" href="">
      <img src="../assets/icon45.png">
      <p>在线客服</p>
    </a>
    <div @click="quitTap" class="mine-quit">退出</div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import FootNav from '../components/FootNav'
export default {
  name: 'mine',
  components: {
    FootNav
  },
  data () {
    return {
      url: this.api.url,
      showIDIntro: false,
      userInfo: null // 用户信息
    }
  },
  computed: {
  },
  created: function () {
    this.util.loading()
    this.getUserInfo()
  },
  methods: {
    // 获取会员信息
    getUserInfo: function () {
      this.axios.get(`${this.api.user_info}?phone=${this.$store.state.isLogin}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.userInfo = res.data.data
        }
        this.util.close()
      })
    },
    // 会员签到
    qiandaoTap: function () {
      this.axios.get(`${this.api.members_sign}?phone=${this.$store.state.isLogin}`).then(res => {
        console.log(res)
        if (res.data.code === '200') {
          this.util.toast('签到成功')
          this.userInfo.sign.status = 1
        } else {
          this.util.toast(res.data.msg)
        }
      })
    },
    // 显示自行上传身份证介绍
    showIDIntroTap: function () {
      this.showIDIntro = !this.showIDIntro
    },
    // 退出登录
    quitTap: function () {
      localStorage.setItem('isLogin', '')
      this.$store.state.isLogin = ''
      this.util.toast('退出成功')
      setTimeout(() => {
        this.$router.push({path: '/'})
      }, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mine{}
.mine-top{margin-bottom:rem(15);padding:rem(10);}
.mine-pep{margin-bottom:rem(20);}
.mine-pep-cont{}
.mine-pep-pic{width:rem(50);height:rem(50);background-color:#f1f1f1;border-radius:50%;overflow:hidden;
  img{display:block;width:100%;height:100%;}
}
.mine-pep-intro{padding-left:rem(10);
  .name{font-size:rem(14);margin-bottom:rem(5);
    span{font-size:rem(12);color:#268ECA;}
  }
  .phone{color:#999;}
}
.mine-pep-com{text-align:right;}
.mine-pep-edit{margin-bottom:rem(10);display:inline-block;padding-left:rem(18);color:#268ECA;background:url(../assets/icon27.png) no-repeat left center;background-size:rem(15);}
.mine-pep-qian{color:#999;
  span{margin-left:rem(5);display:block;width:rem(60);text-align:center;line-height:rem(24);background-color:$red;color:#fff;border-radius:rem(5);}
}
.mine-pep-ul{padding:rem(10) 0;background-color:#F8F8F8;text-align:center;}
.mine-pep-li{position:relative;
  &:before{content:'';position:absolute;left:0;top:5%;width:1px;height:90%;background:#D1D1D1;transform:scaleX(.3);}
  &:first-child:before{display:none;}
  .num{margin-bottom:rem(5);font-size:rem(13);}
  .title{color:#999;}
}
.mine-pep-nav{}
.mine-top-nav-title{padding:rem(20) 0;text-align:center;color:#8F8F90;font-size:rem(14);}
.mine-pep-nav-ul{}
.mine-pep-nav-li{text-align:center;color:#999;
  img{margin:0 auto rem(5) auto;display:block;width:rem(30);}
}
.mine-serv{margin-bottom:rem(15);}
.mine-title{position:relative;margin-bottom:rem(15);padding:rem(10);font-size:rem(16);
  &:before{content:'';position:absolute;left:0;bottom:0;width:100%;height:1px;background-color:#D1D1D1;transform:scaleY(.5);-webkit-transform:scaleY(.5);}
  &.ID{border-bottom:none;
    img{width:rem(18);margin-left:rem(10);}
  }
}
.mine-serv-ul{padding-bottom:rem(10);}
.mine-serv-li{padding:rem(10) 0;float:left;width:25%;text-align:center;color:#8F8F90;
  img{display:block;margin:0 auto rem(5) auto;width:rem(26);height:rem(26);}
}
.mine-notice{margin-bottom:rem(15);padding:rem(10) rem(10) rem(10) rem(30);color:#8F8F90;background:#fff url(../assets/icon44.png) no-repeat rem(10) rem(10);background-size:rem(15);}
.mine-pay{margin-bottom:rem(15);}
.mine-pay-ul{padding:0 rem(10) rem(20) rem(10);}
.mine-pay-li{color:#8F8F90;}
.mine-id-ul{margin-bottom:rem(20);}
.mine-id-li{padding:rem(10) rem(60) rem(10) rem(10);border-bottom:1px solid #f1f1f1;
  .title{margin-bottom:rem(5);font-size:rem(14);}
  .ems{color:#838383;}
}
.mine-service{margin:0 auto rem(30) auto;width:rem(160);height:rem(40);border:1px solid $red;border-radius:rem(5);color:$red;font-size:rem(14);
  img{display:block;width:rem(25);margin-right:rem(10);}
}
.mine-quit{display:block;text-align:center;line-height:rem(45);color:#fff;background:$red;font-size:rem(14);}
</style>
