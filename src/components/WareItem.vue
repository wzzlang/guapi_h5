<template>
  <div class="ware-list">
    <ul :class="['ware-ul', 'clear', {'active':isList}]">
      <li class="ware-li" v-for='(item, index) in wareList' :key="index">
        <div class="ware-li-img">
          <router-link :to="'/WareDetails/'+item.id" tag="img" :src="item.images"></router-link>
          <img v-if="item.islove==0" @click="collectTap(item.id, index)" class="collect" src="../assets/icon4.png">
          <img v-else class="collect" @click="cancelCollectTap(item.id, index)" src="../assets/icon5.png">
        </div>
        <div class="ware-li-desc flex">
          <div class="ware-li-p">
            <router-link :to="'/WareDetails/'+item.id" tag="p" class="title">{{item.name}}</router-link>
            <router-link :to="'/WareDetails/'+item.id" tag="p" class="desc">{{item.ename}}</router-link>
          </div>
          <div class="ware-li-btn flex-box between">
            <div @click="showAustraToCarTap(item)" class="ware-li-btn-a">
              <p>直邮</p>
              <p>＄{{item.price}}</p>
            </div>
            <div @click="showChinaToCarTap(item)" class="ware-li-btn-a">
              <p>现货</p>
              <p>＄{{item.domesticprice}}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WareItem',
  props: {
    wareList: {
      required: true
    },
    isList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created: function () {},
  methods: {
    // 海外直邮
    showAustraToCarTap: function (item) {
      if (this.$store.state.isLogin) {
        this.$emit('show-austra', item)
      } else {
        this.$router.push({path: '/LoginPhone'})
      }
    },
    // 国内现货
    showChinaToCarTap: function (item) {
      if (this.$store.state.isLogin) {
        this.$emit('show-china', item)
      } else {
        this.$router.push({path: '/LoginPhone'})
      }
    },
    // 收藏商品
    collectTap: function (id, index) {
      if (this.$store.state.isLogin) {
        this.axios.post(this.api.join_love, {
          phone: this.$store.state.isLogin,
          id: id
        }).then(res => {
          console.log(res)
          this.util.toast(res.data.msg)
          if (res.data.code === '200') {
            this.wareList[index].islove = 1
          }
        })
      } else {
        this.$router.push({path: '/LoginPhone'})
      }
    },
    // 取消收藏商品
    cancelCollectTap: function (id, index) {
      this.axios.post(this.api.cancele_love, {
        phone: this.$store.state.isLogin,
        id: id
      }).then(res => {
        console.log(res)
        this.util.toast(res.data.msg)
        if (res.data.code === '200') {
          this.wareList[index].islove = 0
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ware-ul{padding:rem(5);
  &.active{
    .collect{display:none;}
    .ware-li{width:100%;display:flex;}
    .ware-li-img{width:rem(100);height:rem(100);}
    .ware-li-desc{flex:1;padding-top:0;}
    .ware-li-btn-a{padding:rem(8) 0;display:flex;width:rem(110);text-align:center;justify-content: center;}
  }
}
.ware-li{padding:rem(5);float:left;width:50%;}
.ware-li-img{position:relative;height:rem(178);overflow:hidden;
  img{display:block;width:100%;
    &.collect{position:absolute;right:rem(10);top:rem(10);width:rem(30);}
  }
}
.ware-li-desc{padding:rem(10) rem(5);}
.ware-li-p{line-height:rem(20);
  .title{height:rem(20);color:#333;display: -webkit-box !important;-webkit-box-orient: vertical;word-break:break-all;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;font-size:rem(14);}
  .desc{height:rem(40);color:#8F8F90;overflow:hidden;}
}
.ware-li-btn{}
.ware-li-btn-a{width:rem(78);border:1px solid #268ECA;color:#268ECA;text-align:center;border-radius:rem(5);
  &:first-child{background-color:$red;color:#fff;border-color:$red;}
}
</style>
